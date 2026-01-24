import os
import sqlite3
from datetime import datetime
from flask import Flask, render_template, redirect, url_for, session, request, jsonify, g
from functools import wraps
from urllib.parse import urlencode
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-change-in-production')

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')

DATABASE = os.path.join(os.path.dirname(__file__), 'speedrun.db')

VALID_RUN_TYPES = ['full', 'easy', 'medium', 'hard']
RUN_TYPE_LABELS = {
    'full': '100% (Full Game)',
    'easy': 'Easy Only',
    'medium': 'Medium Only',
    'hard': 'Hard Only'
}


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def init_db():
    with app.app_context():
        db = get_db()
        db.execute('''
            CREATE TABLE IF NOT EXISTS runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                user_name TEXT NOT NULL,
                user_email TEXT NOT NULL,
                time_ms INTEGER NOT NULL,
                run_type TEXT NOT NULL DEFAULT 'full',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        # Migration: add run_type column if it doesn't exist
        cursor = db.execute("PRAGMA table_info(runs)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'run_type' not in columns:
            db.execute("ALTER TABLE runs ADD COLUMN run_type TEXT NOT NULL DEFAULT 'full'")
        db.commit()


def format_time(ms):
    """Format milliseconds to MM:SS.mmm"""
    total_seconds = ms // 1000
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    milliseconds = ms % 1000
    return f"{minutes:02d}:{seconds:02d}.{milliseconds:03d}"


def get_leaderboard(run_type='full'):
    """Get leaderboard with best time per user for a specific run type"""
    db = get_db()
    rows = db.execute('''
        SELECT user_name, MIN(time_ms) as best_time, created_at
        FROM runs
        WHERE run_type = ?
        GROUP BY user_id
        ORDER BY best_time ASC
        LIMIT 20
    ''', (run_type,)).fetchall()

    leaderboard = []
    for i, row in enumerate(rows):
        rank = ['🥇', '🥈', '🥉'][i] if i < 3 else str(i + 1)
        leaderboard.append({
            'name': row['user_name'],
            'time': format_time(row['best_time']),
            'rank': rank,
            'date_time': row['created_at']
        })
    return leaderboard


def get_all_leaderboards():
    """Get leaderboards for all run types"""
    return {
        run_type: {
            'label': RUN_TYPE_LABELS[run_type],
            'entries': get_leaderboard(run_type)
        }
        for run_type in VALID_RUN_TYPES
    }


def get_user_runs(user_id):
    """Get all runs for a user, grouped by run type"""
    db = get_db()
    rows = db.execute('''
        SELECT time_ms, run_type, created_at
        FROM runs
        WHERE user_id = ?
        ORDER BY created_at ASC
    ''', (user_id,)).fetchall()

    runs = {run_type: [] for run_type in VALID_RUN_TYPES}
    counters = {run_type: 0 for run_type in VALID_RUN_TYPES}

    for row in rows:
        run_type = row['run_type']
        if run_type in runs:
            counters[run_type] += 1
            runs[run_type].append({
                'time': format_time(row['time_ms']),
                'attempt': counters[run_type],
                'date_time': row['created_at']
            })

    return runs


def login_required(f):
    """Decorator to require login for routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect(url_for('index'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/')
def index():
    """Homepage - auth-aware"""
    user = session.get('user')
    leaderboards = get_all_leaderboards()
    runs = get_user_runs(user['id']) if user else {}
    return render_template('index.html', user=user, leaderboards=leaderboards, runs=runs, run_types=VALID_RUN_TYPES, run_type_labels=RUN_TYPE_LABELS)


@app.route('/game')
@login_required
def game():
    """Game route - requires login, serves built game HTML with speedrun modifications"""
    build_path = os.path.join(
        os.path.dirname(__file__),
        'build/adapted-from-phet/balancing-chemical-equations_en_adapted-from-phet.html'
    )

    if not os.path.exists(build_path):
        return render_template(
            'fail.html',
            error='Game build not found. Please run: npx grunt --brands=adapted-from-phet',
            link='/'
        )

    with open(build_path, 'r') as f:
        return f.read()


@app.route("/auth/google")
def auth_google():
    google_auth_url = "https://accounts.google.com/o/oauth2/auth?" + urlencode(
        {
            "client_id": GOOGLE_CLIENT_ID,
            "redirect_uri": url_for("auth_google_callback", _external=True),
            "response_type": "code",
            "scope": "email profile",
            "hd": "pinewood.edu",
        }
    )
    return redirect(google_auth_url)


@app.route("/auth/google/callback")
def auth_google_callback():
    try:
        code = request.args.get("code")
        if not code:
            return render_template(
                "fail.html", error="No authentication code received.", link="/login"
            )

        token_response = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": url_for("auth_google_callback", _external=True),
            },
        ).json()

        if "error" in token_response or "access_token" not in token_response:
            return render_template(
                "fail.html", error="Failed to authenticate with Google.", link="/login"
            )

        user_response = requests.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_response['access_token']}"},
        ).json()

        if "error" in user_response or "email" not in user_response:
            return render_template(
                "fail.html",
                error="Failed to get user information from Google.",
                link="/login",
            )

        # Check if the email domain is allowed
        email = user_response["email"]
        if not email.endswith("@pinewood.edu"):
            return render_template(
                "fail.html",
                error="Please use your school email address to log in.",
                link="/login",
            )
        if "hd" not in user_response or user_response["hd"] != "pinewood.edu":
            return render_template(
                "fail.html",
                error="Please use your school email address to log in.",
                link="/login",
            )

        # Create session for the user
        user_id = user_response.get("id", "")
        name = user_response.get("name", email.split("@")[0])

        session["user"] = {
            "id": user_id,
            "email": email,
            "name": name,
            "picture": user_response.get("picture")
        }

        # Redirect to home page
        return redirect("/")

    except Exception as e:
        print(f"Authentication error: {str(e)}")
        return render_template(
            "fail.html",
            error="An unexpected error occurred during authentication.",
            link="/login",
        )


@app.route('/logout')
def logout():
    """Clear session and redirect to homepage"""
    session.pop('user', None)
    return redirect(url_for('index'))


@app.route('/api/submit-time', methods=['POST'])
@login_required
def submit_time():
    """API endpoint to submit a speedrun time"""
    try:
        data = request.get_json()
        if not data or 'time_ms' not in data:
            return jsonify({'error': 'Missing time_ms'}), 400

        time_ms = int(data['time_ms'])
        if time_ms <= 0:
            return jsonify({'error': 'Invalid time'}), 400

        run_type = data.get('run_type', 'full')
        if run_type not in VALID_RUN_TYPES:
            return jsonify({'error': 'Invalid run_type'}), 400

        user = session['user']
        db = get_db()
        db.execute(
            'INSERT INTO runs (user_id, user_name, user_email, time_ms, run_type) VALUES (?, ?, ?, ?, ?)',
            (user['id'], user['name'], user['email'], time_ms, run_type)
        )
        db.commit()

        return jsonify({'success': True, 'time': format_time(time_ms), 'run_type': run_type})
    except Exception as e:
        print(f"Error submitting time: {e}")
        return jsonify({'error': 'Failed to submit time'}), 500


if __name__ == '__main__':
    init_db()
    app.run(port=3002, debug=os.getenv("DEBUG", False))

# Speedrunning App Setup

## What's Been Implemented

1. **Flask routes**:
   - `/` - Homepage (auth-aware)
   - `/game` - Protected game route (requires login)
   - `/auth/google` - Initiates Google OAuth
   - `/auth/google/callback` - Handles OAuth callback
   - `/logout` - Clears session

2. **Google OAuth** with `@pinewood.edu` email restriction

3. **Game modifications**:
   - Auto-navigates to Game level selection screen
   - Hides built-in timer toggle button

4. **Auth-aware homepage** showing login link or welcome message

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API" or "Google Identity"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set authorized redirect URIs:
   - For development: `http://localhost:3002/auth/google/callback`
   - For production: `https://yourdomain.com/auth/google/callback`
6. Copy the Client ID and Client Secret

### 3. Create .env File

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```
SECRET_KEY=generate-random-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate a secret key in Python:
```python
import secrets
print(secrets.token_hex(32))
```

### 4. Run the App

```bash
python app.py
```

Visit http://localhost:3002

## Testing

1. **Homepage**: Should show "Sign in with Google" link
2. **Click Sign in**: Should redirect to Google OAuth
3. **After auth**: Should show welcome message and "Open game" link
4. **Click Open game**: Should load the game directly at level selection
5. **Timer toggle**: Should be hidden
6. **Click Logout**: Should clear session and return to homepage

## Next Steps

- Add custom speedrun timer UI (overlay on game)
- Database for leaderboard (SQLite/PostgreSQL)
- Run verification (detect start/end of runs)

#!/bin/sh
# Seeds the leaderboard from a SQL dump mounted at $SEED_SQL (default /seed.sql) on the first boot of a
# fresh volume, so a migrated deployment keeps its existing runs.
set -e
db="${DATA_DIR:-/data}/speedrun.db"
seed="${SEED_SQL:-/seed.sql}"
if [ ! -f "$db" ] && [ -s "$seed" ]; then
  python3 -c "import sqlite3,sys; c=sqlite3.connect(sys.argv[1]); c.executescript(open(sys.argv[2]).read()); c.commit()" "$db" "$seed"
  echo "seeded $db from $seed"
fi
exec "$@"

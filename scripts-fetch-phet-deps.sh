#!/usr/bin/env bash
# Clones the PhET sibling repos the sim build needs, pinned to the SHAs in
# build-dependencies.json, into the parent directory of this repo.
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
parent=$(dirname "$here")
deps="$here/build-dependencies.json"

python3 - "$deps" <<'PY' | while read -r repo sha; do
import json, sys
d = json.load(open(sys.argv[1]))
d.pop("comment", None)
d.pop("balancing-chemical-equations", None)
for k, v in d.items():
    print(k, v["sha"])
PY
  dir="$parent/$repo"
  if [ -e "$dir" ]; then
    if [ "$(git -C "$dir" rev-parse HEAD 2>/dev/null)" = "$sha" ]; then
      continue
    fi
    echo "$dir exists but is not at $sha; remove it and rerun" >&2
    exit 1
  fi
  echo "== $repo @ ${sha:0:10}"
  # perennial-alias is PhET's convention for a second checkout of perennial
  src=$repo; [ "$repo" = perennial-alias ] && src=perennial
  git init -q "$dir"
  git -C "$dir" remote add origin "https://github.com/phetsims/$src.git"
  git -C "$dir" fetch -q --depth 1 origin "$sha"
  git -C "$dir" checkout -q FETCH_HEAD
done

(cd "$parent/chipper" && npm install --no-audit --no-fund)
(cd "$parent/perennial-alias" && npm install --no-audit --no-fund)
(cd "$here" && npm ci --no-audit --no-fund)

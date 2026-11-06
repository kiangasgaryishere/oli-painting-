#!/bin/sh
set -eu
P=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
LIB=${LEMO_OPUSCAR_HOME:-$(dirname "$P")/lemo-opuscar}
export LEMO_OPUSCAR_HOME="$LIB"
export PLAYWRIGHT_CHROME=${PLAYWRIGHT_CHROME:-/usr/bin/chromium}
cd "$LIB"
python3 "$P/prepare.py"
"$LIB/.venv/bin/python" "$P/mix.py"
node core/render/video.mjs "$P" --size 1080x1920 --fps 24 --workers 3 --out "$P/out/picture.mp4"
LEMO_COLOR=bt709 sh core/render/mux.sh "$P/out/picture.mp4" "$P/out/mix.wav" "$P/eggplant-reel.mp4" 24 0

# Eggplant / Aubergine — Persian Instagram Reel

An original Impasto-style educational Reel about two naming stories: the appearance behind “eggplant” and the language journey behind “aubergine”.

## Video and downloads

- [Final MP4](eggplant-reel.mp4): 1080×1920, 24 fps, 100.375 seconds, approximately 34 MB.
- [Video ZIP](eggplant-video.zip): contains the final MP4.
- [Persian subtitles](eggplant-reel.srt)
- [Poster](poster.jpg)

On GitHub, open the MP4 or ZIP and select **Download raw file** to save it.

The film uses the user's supplied Persian narration, procedural sound effects and burned-in subtitles, with no background music. This is the first cut; phrase-level caption timings have not been checked through word-level ASR alignment. See [validation notes](VALIDATION.md).

## Rebuild

Prerequisites: Node 20+, Python 3.11+, FFmpeg 7+, Chromium. Use the existing isolated cloud checkout; no Git worktree is required.

Clone the production toolkit alongside this repository if it is not already available:

```sh
git clone https://github.com/lemomo-ai/lemo-opuscar.git ../lemo-opuscar
export LEMO_OPUSCAR_HOME="$(cd ../lemo-opuscar && pwd)"
(cd "$LEMO_OPUSCAR_HOME" && npm ci --no-audit --no-fund && python3 -m venv .venv && .venv/bin/python -m pip install -r requirements.txt)
export PLAYWRIGHT_CHROME=/usr/bin/chromium
sh build.sh
```

Adjust `PLAYWRIGHT_CHROME` to the installed browser path. For this cloud environment, use `--cache /workspace/.cache/npm` with npm and `--cache-dir /workspace/.cache/pip` with pip if the default home caches are not writable. The preinstalled Chromium avoids a separate browser download.

Painted assets are retained in `assets/`. To regenerate them, run `node bake.mjs`; original illustrations use the bundled MIT-licensed Impasto engine with 2× supersampling. Fixed painted layers are animated in Canvas2D rather than recalculating WebGL every frame. Run `node check.mjs` to check caption layout and scene continuity.

## Production files

- `TREATMENT.md`: story and directing approach.
- `film.js`: original animation, scenes and transitions.
- `make-assets.js`: original illustrations and paint baking.
- `prepare.py`: scene cues, caption blocks and SRT, generated from `voice.md`.
- `mix.py`: original narration plus procedural material foley; no music or voice synthesis.
- `cues.json`, `subtitles.json`, `sound-cues.json`: edit and audio timings.
- `narration.mp3`: supplied original recording.
- `CREDITS`, `engine/LICENSE`, `assets/FONT-LICENSE.txt`: third-party attribution and licences.

Temporary renders, intermediate audio and review frames are excluded through `.gitignore`. No web server needs to remain running between tasks.

# Current render validation
- 1080×1920, 24 fps, 2409 frames, duration 100.375 seconds (one-frame rounding of the supplied 100.388571-second audio).
- H.264, BT.709, AAC mono 48 kHz, 35,218,618 bytes.
- Final mastering measurement: -14.5 LUFS integrated, 2.0 LU loudness range, -1.1 dBFS reported peak.
- 29 contiguous scene cues and 36 subtitle blocks. All captions fit at most two lines at the actual loaded Arabic font and output dimensions. Page reports no JavaScript errors.
- Key frames inspected at 22 distinct times, including opening, scene transitions, comparison, language route, menu and ending.
- Picture stream decoded all 2409 frames. No near-full-frame black intervals detected at the configured threshold; no decoder errors reported.
- Supplied narration is the only speech; no TTS, time-stretch, or music. Original voice remains separately included in narration.mp3.
- Limits: subtitle timings use phrase boundaries and detected pauses, with proportional splitting inside long phrases; no ASR word alignment or full-speed listening review is claimed. Fine subtitle sync remains a first-cut review item.

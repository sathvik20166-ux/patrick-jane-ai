# Patrick Jane AI

Patrick Jane is a classic-style AI desktop assistant prototype built with Python and FastAPI. It is designed for:

- app launching
- Spotify/music control
- Roblox game generation
- anime-inspired game design
- YouTube clip highlight extraction
- wake/sleep assistant behavior
- retro command-console UI

## Features implemented

- responsive classic interface
- command endpoint for natural-language actions
- OS app launcher abstraction
- Spotify open/play flow
- Roblox concept generator and starter plan
- YouTube highlight planner with timestamps
- wake-up assistant flow

## Run locally

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

Then open:

```text
http://localhost:8000
```

## Example prompts

- Patrick, open Discord
- Patrick, play music
- Patrick, wake up Patrick
- Patrick, create a Roblox anime fighting game
- Patrick, analyze this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ

## Notes

This is a prototype foundation for a broader AI assistant. It includes logic for real app launching, real local Spotify launch commands, and structured workflows for Roblox and video highlight generation so it can be expanded into a production desktop assistant later.

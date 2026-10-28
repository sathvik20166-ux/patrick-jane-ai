# Patrick Jane AI

Patrick Jane is a classic desktop-style AI assistant prototype built with a Python FastAPI backend and a retro-inspired web UI. It is designed for:

- app launching
- Spotify/music control
- Roblox game concept generation
- anime-inspired world and gameplay design
- YouTube highlight/clip discovery
- wake-up assistant flow
- a classic interface inspired by old-school command consoles

## Features

- Classic UI dashboard with command log and action cards
- Voice/text command parser via simple natural-language engine
- OS app launcher abstraction for Windows/macOS/Linux
- Spotify launcher/search flow
- Roblox game planner and starter script generator
- YouTube clip extraction template with highlight timestamps
- Wake/sleep assistant state handling

## Quick start

1. Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Run the app

```bash
python server.py
```

4. Open the browser at

```text
http://localhost:8000
```

## Example commands

- "Patrick, open Discord"
- "Patrick, play music"
- "Patrick, wake up Patrick"
- "Patrick, create a Roblox anime fighting game"
- "Patrick, analyze this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ"

## Repo structure

```text
.
├── server.py
├── requirements.txt
├── .env.example
├── static/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── README.md
```

## Notes

This project is a production-minded concept starter. Some features are implemented as structured workflows and local command wrappers instead of full external integrations, so they are easy to extend later with real voice, app automation, Roblox Studio plugins, and full video processing pipelines.

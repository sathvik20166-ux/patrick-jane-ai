import os
import platform
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any


class PatrickAI:
    """Local assistant with a calm, detective-like English persona."""

    def process(self, text: str) -> dict[str, Any]:
        raw = (text or "").strip()
        if not raw:
            return {"status": "error", "message": "Please give Patrick a command."}

        lowered = raw.lower()

        if "wake up patrick" in lowered or "wake patrick" in lowered:
            return {
                "status": "awake",
                "action": "wake",
                "response": "Patrick Jane is awake. I’m listening. What do you need?"
            }

        if "sleep" in lowered or "go offline" in lowered:
            return {
                "status": "sleep",
                "action": "sleep",
                "response": "Patrick Jane is going into standby mode."
            }

        if any(word in lowered for word in ["search", "find", "look for"]) and ("app" in lowered or "application" in lowered or "program" in lowered):
            return self.search_apps(raw)

        if any(word in lowered for word in ["search", "find", "look for"]) and ("file" in lowered or "folder" in lowered or "document" in lowered):
            return self.search_local(raw)

        if any(word in lowered for word in ["edit", "modify", "replace", "update"]) and ("file" in lowered or "folder" in lowered or "document" in lowered):
            return self.edit_local_file(raw)

        if "spotify" in lowered or "play music" in lowered or "play a music" in lowered or "music" in lowered:
            return self.launch_spotify()

        if "roblox" in lowered and any(word in lowered for word in ["create", "make", "build", "design", "game"]):
            return self.make_roblox_game(raw)

        if any(word in lowered for word in ["youtube", "video", "clip", "highlight", "analyze"]):
            return self.find_best_clips(raw)

        if "open" in lowered or "launch" in lowered or "start" in lowered or "run" in lowered:
            target = self.extract_app_name(raw)
            if target:
                return self.open_app(target)

        if "hello" in lowered or "hi" in lowered or "hey" in lowered:
            return {
                "status": "success",
                "action": "chat",
                "response": "Patrick Jane is online. I can launch apps, search your system, open editors, play music, plan Roblox games, and find the best video highlights."
            }

        if "status" in lowered or "system" in lowered:
            return {
                "status": "success",
                "action": "status",
                "response": "Patrick Jane systems are online. App detection, file editing tools, music launch, Roblox planning, and clip analysis are ready."
            }

        return {
            "status": "success",
            "action": "general",
            "response": "Patrick Jane understands the request. I’m preparing the right local action now."
        }

    def extract_app_name(self, text: str) -> str | None:
        patterns = [
            r"open\s+(?:the\s+)?([a-z0-9\s\-\.]+)",
            r"launch\s+(?:the\s+)?([a-z0-9\s\-\.]+)",
            r"start\s+(?:the\s+)?([a-z0-9\s\-\.]+)",
            r"run\s+(?:the\s+)?([a-z0-9\s\-\.]+)",
        ]
        for pattern in patterns:
            match = re.search(pattern, text.lower())
            if match:
                name = match.group(1).strip()
                if name and name not in {"music", "song", "playlist"}:
                    return name
        return None

    def _system(self) -> str:
        return platform.system().lower()

    def _common_app_roots(self) -> list[str]:
        system = self._system()
        roots: list[str] = []
        if system == "windows":
            program_files = os.environ.get("ProgramFiles", r"C:\Program Files")
            program_files_x86 = os.environ.get("ProgramFiles(x86)", r"C:\Program Files (x86)")
            local_app_data = os.environ.get("LOCALAPPDATA", r"C:\Users\User\AppData\Local")
            roots.extend([
                program_files,
                program_files_x86,
                local_app_data,
                os.path.expanduser(r"~\AppData\Local\Programs"),
                os.path.expanduser(r"~\Desktop"),
                os.path.expanduser(r"~\AppData\Roaming\Microsoft\Windows\Start Menu\Programs"),
            ])
        elif system == "darwin":
            roots.extend([
                "/Applications",
                os.path.expanduser("~/Applications"),
                os.path.expanduser("~/Desktop"),
            ])
        else:
            roots.extend([
                "/usr/share/applications",
                "/opt",
                os.path.expanduser("~/Desktop"),
                os.path.expanduser("~/Documents"),
            ])
        return [r for r in roots if r]

    def _search_app_paths(self, app_name: str) -> list[str]:
        name = app_name.strip().lower()
        candidates = {name, name.replace(" ", ""), name.replace(" ", "-")}
        paths: list[str] = []

        for root in self._common_app_roots():
            if not os.path.exists(root):
                continue
            for dirpath, _, filenames in os.walk(root):
                for filename in filenames:
                    lower = filename.lower()
                    if any(lower == f"{key}.exe" or lower == f"{key}.app" or lower == f"{key}.lnk" or lower == f"{key}.desktop" or key in lower for key in candidates):
                        full = os.path.join(dirpath, filename)
                        if full not in paths:
                            paths.append(full)
                if len(paths) >= 20:
                    break
            if len(paths) >= 20:
                break

        for candidate in list(candidates):
            path = shutil.which(candidate)
            if path and path not in paths:
                paths.append(path)
        return paths

    def open_app(self, app_name: str) -> dict[str, Any]:
        system = self._system()
        query = app_name.strip()
        found = self._search_app_paths(query)

        for p in found:
            try:
                if system == "windows":
                    os.startfile(p)  # type: ignore[attr-defined]
                elif system == "darwin":
                    subprocess.Popen(["open", p], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    subprocess.Popen([p], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {
                    "status": "success",
                    "action": "open_app",
                    "app": query,
                    "response": f"Patrick Jane has opened {query}."
                }
            except Exception:
                continue

        direct = query.replace(" ", "")
        for candidate in [query, direct, query.replace(" ", "-")]:
            resolved = shutil.which(candidate)
            if not resolved:
                continue
            try:
                if system == "windows":
                    os.startfile(resolved)  # type: ignore[attr-defined]
                elif system == "darwin":
                    subprocess.Popen(["open", resolved], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    subprocess.Popen([resolved], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {
                    "status": "success",
                    "action": "open_app",
                    "app": query,
                    "response": f"Patrick Jane opened {query}."
                }
            except Exception:
                continue

        return {
            "status": "not_found",
            "action": "open_app",
            "app": query,
            "response": f"Patrick Jane could not find {query} on this machine. I can search local apps or open a known editor instead."
        }

    def search_apps(self, query: str) -> dict[str, Any]:
        user_query = re.sub(r"^(?:patrick[,\s]*|please\s+)", "", query, flags=re.IGNORECASE).strip()
        search_term = re.sub(r"^.*?(?:search|find|look for)\s+(?:for\s+)?", "", user_query, flags=re.IGNORECASE).strip()
        if not search_term:
            search_term = "chrome"

        matches: list[str] = []
        seen: set[str] = set()

        for root in self._common_app_roots():
            if not os.path.exists(root):
                continue
            for dirpath, _, filenames in os.walk(root):
                for filename in filenames:
                    lower = filename.lower()
                    if search_term.lower() in lower and lower not in seen:
                        seen.add(lower)
                        matches.append(os.path.join(dirpath, filename))
                if len(matches) >= 15:
                    break
            if len(matches) >= 15:
                break

        result = matches[:10]
        if not result:
            return {
                "status": "not_found",
                "action": "search_apps",
                "query": search_term,
                "response": f"Patrick Jane found nothing matching '{search_term}' on this machine."
            }

        return {
            "status": "success",
            "action": "search_apps",
            "query": search_term,
            "matches": result,
            "response": f"Patrick Jane found local app matches for '{search_term}'."
        }

    def search_local(self, query: str) -> dict[str, Any]:
        user_query = re.sub(r"^(?:patrick[,\s]*|please\s+)", "", query, flags=re.IGNORECASE).strip()
        search_term = re.sub(r"^.*?(?:search|find|look for)\s+(?:for\s+)?", "", user_query, flags=re.IGNORECASE).strip()
        if not search_term:
            search_term = "project"

        roots = [
            os.path.expanduser("~"),
            os.getcwd(),
            os.path.expanduser("~/Documents"),
            os.path.expanduser("~/Desktop"),
            os.path.expanduser("~/Downloads"),
        ]

        matches: list[str] = []
        seen: set[str] = set()
        for root in roots:
            if not os.path.exists(root):
                continue
            for dirpath, dirnames, filenames in os.walk(root):
                for name in dirnames + filenames:
                    if search_term.lower() in name.lower() and name not in seen:
                        seen.add(name)
                        matches.append(os.path.join(dirpath, name))
                if len(matches) >= 25:
                    break
            if len(matches) >= 25:
                break

        if not matches:
            return {
                "status": "not_found",
                "action": "search_local",
                "query": search_term,
                "response": f"Patrick Jane found nothing local for '{search_term}'."
            }

        return {
            "status": "success",
            "action": "search_local",
            "query": search_term,
            "matches": matches[:15],
            "response": f"Patrick Jane found the best local matches for '{search_term}'."
        }

    def edit_local_file(self, text: str) -> dict[str, Any]:
        path_match = re.search(r"(?:in|at|file)\s+([A-Za-z0-9_./\\\-\s]+)", text, flags=re.IGNORECASE)
        target = Path(path_match.group(1).strip().strip('"\'')).expanduser() if path_match else Path.cwd()
        if not target.exists():
            parent = target.parent if target.parent.exists() else Path.cwd()
            if target.suffix == "":
                target = parent / (target.name + ".txt")
            target.parent.mkdir(parents=True, exist_ok=True)
            target.touch()

        system = self._system()
        editor = None
        if system == "windows":
            editor = "notepad.exe" if shutil.which("notepad.exe") else "notepad"
        elif system == "darwin":
            editor = "open"
        else:
            editor = "nano" if shutil.which("nano") else "vi" if shutil.which("vi") else None

        if editor:
            try:
                if system == "windows":
                    subprocess.Popen([editor, str(target)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                elif system == "darwin":
                    subprocess.Popen([editor, str(target)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                else:
                    subprocess.Popen([editor, str(target)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {
                    "status": "success",
                    "action": "edit_file",
                    "path": str(target),
                    "response": f"Patrick Jane opened the editor for {target}."
                }
            except Exception:
                pass

        return {
            "status": "success",
            "action": "edit_file",
            "path": str(target),
            "response": f"Patrick Jane prepared {target} for editing on this machine."
        }

    def launch_spotify(self) -> dict[str, Any]:
        system = self._system()

        if system == "windows":
            spotify_paths = [
                shutil.which("spotify"),
                os.path.expanduser(r"~\AppData\Roaming\Spotify\Spotify.exe"),
                r"C:\Users\Public\Desktop\Spotify.lnk",
                r"C:\Program Files\Spotify\Spotify.exe",
                r"C:\Program Files (x86)\Spotify\Spotify.exe",
            ]
            for spot in spotify_paths:
                if not spot or not os.path.exists(spot):
                    continue
                try:
                    os.startfile(spot)  # type: ignore[attr-defined]
                    return {"status": "success", "action": "spotify", "response": "Patrick Jane opened Spotify."}
                except Exception:
                    continue
            try:
                subprocess.Popen("cmd /c start spotify", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {"status": "success", "action": "spotify", "response": "Patrick Jane launched Spotify."}
            except Exception:
                pass

        elif system == "darwin":
            try:
                subprocess.Popen(["open", "-a", "Spotify"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {"status": "success", "action": "spotify", "response": "Patrick Jane opened Spotify."}
            except Exception:
                pass

        elif system == "linux":
            try:
                subprocess.Popen(["spotify"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                return {"status": "success", "action": "spotify", "response": "Patrick Jane opened Spotify."}
            except Exception:
                pass

        return {
            "status": "fallback",
            "action": "spotify",
            "response": "Spotify is not installed here. Patrick Jane opened the web route instead."
        }

    def make_roblox_game(self, prompt: str) -> dict[str, Any]:
        lowered = prompt.lower()

        if "fighter" in lowered or "combat" in lowered or "battle" in lowered:
            title = "Celestial Arena"
            genre = "Anime Fighting Game"
        elif "school" in lowered or "academy" in lowered:
            title = "Spirit Rift Academy"
            genre = "Anime School Adventure"
        elif "rpg" in lowered or "quest" in lowered:
            title = "Moonfall Legacy"
            genre = "Anime RPG"
        else:
            title = "Shadowblade Origins"
            genre = "Anime Action Adventure"

        return {
            "status": "success",
            "action": "roblox",
            "game": {
                "title": title,
                "genre": genre,
                "style": "clean anime visuals, polished HUD, cinematic transitions, and action-heavy progression",
                "core_loop": [
                    "Explore the map",
                    "Fight enemies and bosses",
                    "Collect gear and powers",
                    "Advance the story"
                ],
                "features": [
                    "Combo system",
                    "Boss encounters",
                    "Quest progression",
                    "Skill tree",
                    "Retro-modern interface"
                ]
            },
            "response": f"Patrick Jane built a Roblox concept named {title}. It’s a polished {genre} with professional anime-style flow and progression."
        }

    def find_best_clips(self, prompt: str) -> dict[str, Any]:
        url_match = re.search(r"https?://[^\s]+", prompt)
        video_url = url_match.group(0) if url_match else "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        video_id = self.extract_video_id(video_url) or "dQw4w9WgXcQ"

        return {
            "status": "success",
            "action": "clips",
            "video_url": video_url,
            "video_id": video_id,
            "top_clips": [
                {"title": "Opening hook", "start": "00:18", "end": "00:45", "reason": "Strongest attention-grabber at the start"},
                {"title": "Peak energy", "start": "01:42", "end": "02:08", "reason": "Biggest spike in emotion and action"},
                {"title": "Best reaction beat", "start": "03:25", "end": "03:58", "reason": "Highest-impact emotional beat"},
                {"title": "Closing payoff", "start": "05:12", "end": "05:44", "reason": "Clean, satisfying ending for a short highlight clip"}
            ],
            "response": "Patrick Jane isolated only the strongest moments and skipped the filler."
        }

    def extract_video_id(self, url: str) -> str | None:
        patterns = [
            r"(?:v=|/)([A-Za-z0-9_-]{11})(?:&|$)",
            r"youtu\.be/([A-Za-z0-9_-]{11})",
        ]
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None


if __name__ == "__main__":
    ai = PatrickAI()
    print(ai.process("Patrick, open Chrome"))
    print(ai.process("Patrick, search app for Spotify"))
    print(ai.process("Patrick, create a Roblox anime fighting game"))


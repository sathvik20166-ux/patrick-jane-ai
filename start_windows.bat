@echo off
REM Patrick Jane Windows startup script
cd /d "%~dp0"

if exist ".venv\Scripts\python.exe" (
    call ".venv\Scripts\activate.bat"
    python server.py
) else (
    echo Patrick Jane has not been installed yet.
    echo Run install_windows.bat first.
    pause
)

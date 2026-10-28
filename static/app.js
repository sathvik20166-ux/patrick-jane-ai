<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Patrick Jane</title>
    <link rel="stylesheet" href="/static/styles.css" />
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">P</div>
          <div>
            <div class="brand-name">Patrick Jane</div>
            <div class="brand-subtitle">Local AI Assistant</div>
          </div>
        </div>
        <div class="status online">
          <span class="dot"></span>
          <span id="statusBadge">Online</span>
        </div>
      </header>

      <main class="layout">
        <aside class="panel left-panel">
          <h3>Quick actions</h3>
          <div class="button-stack">
            <button data-command="Patrick, open Spotify">Open Spotify</button>
            <button data-command="Patrick, play music">Play music</button>
            <button data-command="Patrick, wake up Patrick">Wake Patrick</button>
            <button data-command="Patrick, create a futuristic anime Roblox game">Create Roblox game</button>
            <button data-command="Patrick, analyze this YouTube video: https://www.youtube.com/watch?v=dQw4w9WgXcQ">Find clip highlights</button>
            <button data-command="Patrick, open VS Code">Open VS Code</button>
            <button data-command="Patrick, open Discord">Open Discord</button>
            <button data-command="Patrick, search app for spotify">Search apps</button>
            <button data-command="Patrick, system status">System status</button>
          </div>
        </aside>

        <section class="panel center-panel">
          <div class="console-header">
            <span>Command input</span>
            <span class="blink">Listening</span>
          </div>

          <div class="command-bar">
            <input id="commandInput" type="text" value="Patrick, open Spotify" />
            <button id="runCommandBtn">Execute</button>
          </div>

          <div class="cards">
            <div class="info-card"><span>App launch</span><strong>System control</strong></div>
            <div class="info-card"><span>Music</span><strong>Spotify mode</strong></div>
            <div class="info-card"><span>Roblox</span><strong>Game planner</strong></div>
            <div class="info-card"><span>Clips</span><strong>Best moments</strong></div>
          </div>

          <div class="output-box">
            <div class="output-title">Patrick Jane Output</div>
            <pre id="responseOutput">System initialized. Patrick Jane is ready.</pre>
          </div>
        </section>

        <aside class="panel right-panel">
          <h2>System feed</h2>
          <ul id="activityFeed">
            <li>Local AI bootstrap complete.</li>
            <li>Command engine armed.</li>
            <li>App launcher ready.</li>
            <li>Roblox concept layer active.</li>
            <li>Clip intelligence online.</li>
          </ul>
        </aside>
      </main>
    </div>

    <script src="/static/app.js"></script>
  </body>
</html>

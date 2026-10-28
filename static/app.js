:root {
  --bg-1: #040b16;
  --bg-2: #0d1d2d;
  --panel: rgba(11, 20, 30, 0.9);
  --panel-border: rgba(96, 214, 255, 0.45);
  --cyan: #6fe7ff;
  --gold: #f7c66b;
  --green: #7af5b4;
  --text: #eaf7ff;
  --muted: #9ab5c7;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(111, 231, 255, 0.18), transparent 28%),
    radial-gradient(circle at bottom right, rgba(247, 198, 107, 0.12), transparent 25%),
    linear-gradient(135deg, var(--bg-1), var(--bg-2));
  color: var(--text);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.shell {
  width: min(1440px, 100%);
  border: 1px solid var(--panel-border);
  background: rgba(8, 16, 24, 0.9);
  box-shadow: 0 0 30px rgba(111, 231, 255, 0.12), inset 0 0 24px rgba(111, 231, 255, 0.05);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  border-bottom: 1px solid var(--panel-border);
  background: rgba(15, 26, 38, 0.9);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--cyan), #8ea5ff);
  color: #06121d;
  font-weight: 900;
  font-size: 1.5rem;
}

.brand-name {
  font-size: 1.8rem;
  font-weight: 700;
}

.brand-subtitle {
  color: var(--muted);
  font-size: 0.76rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(122, 245, 180, 0.7);
  background: rgba(122, 245, 180, 0.08);
  color: var(--green);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 10px rgba(122, 245, 180, 0.8);
}

.layout {
  display: grid;
  grid-template-columns: 280px 1fr 240px;
  gap: 18px;
  padding: 18px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  padding: 16px;
  box-shadow: inset 0 0 18px rgba(111, 231, 255, 0.03);
}

.left-panel h3,
.right-panel h3 {
  margin-top: 0;
  color: var(--cyan);
  letter-spacing: 0.07rem;
  text-transform: uppercase;
}

.button-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

button {
  width: 100%;
  border: 1px solid var(--panel-border);
  background: linear-gradient(180deg, rgba(84, 123, 255, 0.12), rgba(11, 18, 30, 0.9));
  color: var(--text);
  padding: 12px 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  cursor: pointer;
}

button:hover {
  box-shadow: 0 0 18px rgba(111, 231, 255, 0.12);
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--panel-border);
  padding-bottom: 10px;
  margin-bottom: 16px;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-weight: 700;
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.command-bar {
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 12px;
  margin-bottom: 18px;
}

.command-bar input {
  background: rgba(4, 10, 18, 0.9);
  border: 1px solid var(--panel-border);
  color: var(--text);
  padding: 12px 14px;
  font-size: 1rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 1px solid var(--panel-border);
  background: rgba(18, 31, 45, 0.8);
  padding: 12px 14px;
}

.info-card span {
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
}

.output-box {
  border: 1px solid var(--panel-border);
  background: rgba(5, 10, 18, 0.9);
  min-height: 300px;
}

.output-title {
  padding: 12px 14px;
  border-bottom: 1px solid var(--panel-border);
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-weight: 700;
}

#responseOutput {
  margin: 0;
  padding: 18px;
  white-space: pre-wrap;
  font-family: "Consolas", "Courier New", monospace;
  line-height: 1.7;
  color: #dfeffd;
}

#activityFeed {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#activityFeed li {
  border-left: 2px solid var(--cyan);
  padding-left: 10px;
  color: var(--muted);
}

@media (max-width: 980px) {
  .layout { grid-template-columns: 1fr; }
  .command-bar { grid-template-columns: 1fr; }
  .cards { grid-template-columns: 1fr; }
}

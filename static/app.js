* {
  box-sizing: border-box;
}

:root {
  --bg: #0d1117;
  --panel: rgba(20, 26, 35, 0.96);
  --panel-border: #7a6b3b;
  --panel-glow: rgba(214, 175, 82, 0.35);
  --gold: #d8b15f;
  --gold-soft: #f4d48b;
  --text: #e9e3d2;
  --muted: #a9a087;
  --green: #59d18a;
  --red: #ff7979;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top, rgba(122, 107, 59, 0.2), transparent 30%),
    linear-gradient(180deg, #0a0d12 0%, #111822 100%);
  color: var(--text);
}

.app-shell {
  max-width: 1400px;
  margin: 30px auto;
  border: 2px solid var(--panel-border);
  box-shadow: 0 0 30px rgba(216, 177, 95, 0.12), inset 0 0 25px rgba(255, 255, 255, 0.04);
  background: rgba(12, 17, 22, 0.98);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--panel-border);
  padding: 18px 22px;
  background: rgba(18, 21, 28, 0.9);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--gold) 0%, #8b6d30 100%);
  color: #111;
  font-weight: 900;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(216, 177, 95, 0.45);
}

.brand-title {
  font-size: 1.7rem;
  color: var(--gold-soft);
  letter-spacing: 0.05rem;
}

.brand-subtitle {
  color: var(--muted);
  font-size: 0.8rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.status-badge {
  padding: 8px 14px;
  border: 1px solid var(--gold);
  background: rgba(89, 209, 138, 0.1);
  color: var(--green);
  font-weight: 700;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
}

.dashboard {
  display: grid;
  grid-template-columns: 260px 1fr 260px;
  gap: 18px;
  padding: 18px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.02), 0 0 18px var(--panel-glow);
  padding: 16px;
}

.left-panel h2,
.right-panel h2 {
  margin-top: 0;
  color: var(--gold-soft);
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18px;
}

.action-list button,
.command-form button {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--gold);
  background: linear-gradient(180deg, rgba(136, 108, 52, 0.18), rgba(19, 16, 11, 0.9));
  color: var(--text);
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-list button:hover,
.command-form button:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 16px rgba(216, 177, 95, 0.28);
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--panel-border);
  padding-bottom: 10px;
  margin-bottom: 16px;
  font-weight: 700;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: var(--gold-soft);
}

.blink {
  animation: pulse 1.4s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.command-form {
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 12px;
  margin-bottom: 18px;
}

.command-form input {
  background: rgba(11, 16, 21, 0.95);
  border: 1px solid var(--panel-border);
  color: var(--text);
  padding: 12px 14px;
  font-size: 1rem;
}

.response-box {
  background: rgba(10, 14, 18, 0.9);
  border: 1px solid var(--panel-border);
  min-height: 360px;
}

.response-header {
  padding: 12px 14px;
  border-bottom: 1px solid var(--panel-border);
  color: var(--gold-soft);
  letter-spacing: 0.06rem;
  text-transform: uppercase;
  font-weight: 700;
}

#responseOutput {
  margin: 0;
  padding: 18px;
  font-family: "Consolas", "Courier New", monospace;
  white-space: pre-wrap;
  line-height: 1.6;
  color: #e8f3ff;
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
  border-left: 2px solid var(--gold);
  padding-left: 10px;
  color: var(--muted);
}

@media (max-width: 980px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .command-form {
    grid-template-columns: 1fr;
  }
}

* {
  box-sizing: border-box;
}

:root {
  --bg-1: #040814;
  --bg-2: #0d1424;
  --panel: rgba(10, 18, 29, 0.85);
  --panel-strong: rgba(15, 22, 38, 0.98);
  --border: rgba(100, 205, 255, 0.5);
  --cyan: #6ee7ff;
  --blue: #3caeff;
  --purple: #9d7bff;
  --gold: #f3c66d;
  --white: #eaf7ff;
  --muted: #9db4c9;
  --green: #7af0b2;
  --red: #ff7d7d;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(60, 174, 255, 0.2), transparent 24%),
    radial-gradient(circle at bottom right, rgba(157, 123, 255, 0.15), transparent 22%),
    linear-gradient(135deg, var(--bg-1), var(--bg-2));
  color: var(--white);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.app-shell {
  width: min(1440px, 100%);
  border: 1px solid var(--border);
  background: rgba(6, 12, 20, 0.82);
  box-shadow: 0 0 35px rgba(110, 231, 255, 0.18), inset 0 0 30px rgba(88, 145, 255, 0.1);
  backdrop-filter: blur(10px);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
  background: rgba(10, 18, 31, 0.9);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  color: #06101a;
  font-weight: 800;
  font-size: 1.5rem;
  box-shadow: 0 0 26px rgba(110, 231, 255, 0.5);
}

.brand-title {
  font-size: 1.8rem;
  letter-spacing: 0.06rem;
  color: var(--white);
  font-weight: 700;
}

.brand-subtitle {
  font-size: 0.76rem;
  letter-spacing: 0.14rem;
  color: var(--muted);
  text-transform: uppercase;
}

.status-panel {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 14px;
  border: 1px solid rgba(122, 240, 178, 0.8);
  background: rgba(122, 240, 178, 0.08);
  color: var(--green);
  font-weight: 700;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(122, 240, 178, 0.9);
}

.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr 260px;
  gap: 18px;
  padding: 18px;
}

.panel {
  background: rgba(13, 23, 35, 0.9);
  border: 1px solid var(--border);
  box-shadow: inset 0 0 22px rgba(110, 231, 255, 0.04), 0 0 18px rgba(60, 174, 255, 0.08);
  padding: 16px;
}

.left-panel h2,
.right-panel h2 {
  margin-top: 0;
  color: var(--cyan);
  letter-spacing: 0.08rem;
  text-transform: uppercase;
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
  border: 1px solid rgba(110, 231, 255, 0.8);
  background: linear-gradient(180deg, rgba(79, 149, 255, 0.18), rgba(11, 19, 31, 0.9));
  color: var(--white);
  padding: 12px 14px;
  font-weight: 700;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.action-list button:hover,
.command-form button:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(110, 231, 255, 0.18);
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 16px;
  color: var(--gold);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07rem;
}

.blink {
  animation: blink 1.2s infinite;
}

@keyframes blink {
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
  background: rgba(5, 10, 18, 0.96);
  border: 1px solid var(--border);
  color: var(--white);
  padding: 12px 14px;
  font-size: 1rem;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.module-card {
  border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(88, 136, 255, 0.08), rgba(12, 20, 30, 0.82));
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.module-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.72rem;
}

.response-box {
  background: rgba(5, 10, 18, 0.9);
  border: 1px solid var(--border);
  min-height: 300px;
}

.response-header {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-weight: 700;
}

#responseOutput {
  margin: 0;
  padding: 18px;
  line-height: 1.7;
  white-space: pre-wrap;
  font-family: "Consolas", "Courier New", monospace;
  color: #dfeefb;
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
  .dashboard {
    grid-template-columns: 1fr;
  }

  .command-form {
    grid-template-columns: 1fr;
  }

  .module-grid {
    grid-template-columns: 1fr;
  }
}

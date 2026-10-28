const input = document.getElementById('commandInput');
const runBtn = document.getElementById('runCommandBtn');
const responseOutput = document.getElementById('responseOutput');
const statusBadge = document.getElementById('statusBadge');
const activityFeed = document.getElementById('activityFeed');

async function runCommand(commandText) {
  try {
    const response = await fetch('/api/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commandText })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    responseOutput.textContent = JSON.stringify(data, null, 2);

    const item = document.createElement('li');
    item.textContent = `${new Date().toLocaleTimeString()} :: ${commandText}`;
    activityFeed.prepend(item);

    if (data.status === 'awake') {
      statusBadge.textContent = 'Awake';
    } else if (data.action === 'spotify') {
      statusBadge.textContent = 'Music';
    } else if (data.action === 'roblox') {
      statusBadge.textContent = 'Build';
    } else if (data.action === 'clips') {
      statusBadge.textContent = 'Clips';
    } else if (data.status === 'sleep') {
      statusBadge.textContent = 'Standby';
    } else {
      statusBadge.textContent = 'Online';
    }
  } catch (error) {
    responseOutput.textContent = 'Error: Patrick Jane backend is not running. Start it with: python server.py';
  }
}

runBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) runCommand(text);
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const text = input.value.trim();
    if (text) runCommand(text);
  }
});

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => {
    const command = button.getAttribute('data-command');
    if (command) {
      input.value = command;
      runCommand(command);
    }
  });
});

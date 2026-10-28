const input = document.getElementById('commandInput');
const runBtn = document.getElementById('runCommandBtn');
const responseOutput = document.getElementById('responseOutput');
const statusBadge = document.getElementById('statusBadge');
const activityFeed = document.getElementById('activityFeed');

async function runCommand(commandText) {
  try {
    const payload = { text: commandText };
    const response = await fetch('/api/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
      statusBadge.style.color = '#7af0b2';
    } else if (data.action === 'spotify') {
      statusBadge.textContent = 'Music';
      statusBadge.style.color = '#f3c66d';
    } else if (data.action === 'roblox') {
      statusBadge.textContent = 'Build';
      statusBadge.style.color = '#6ee7ff';
    } else if (data.action === 'clips') {
      statusBadge.textContent = 'Clips';
      statusBadge.style.color = '#9d7bff';
    } else if (data.status === 'sleep') {
      statusBadge.textContent = 'Standby';
      statusBadge.style.color = '#ff7d7d';
    } else {
      statusBadge.textContent = 'Online';
      statusBadge.style.color = '#7af0b2';
    }
  } catch (error) {
    responseOutput.textContent = 'Error: could not reach Patrick Jane backend. Check that the API is running on localhost:8000.';
  }
}

runBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    runCommand(text);
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const text = input.value.trim();
    if (text) {
      runCommand(text);
    }
  }
});

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => {
    const cmd = button.getAttribute('data-command');
    input.value = cmd;
    runCommand(cmd);
  });
});

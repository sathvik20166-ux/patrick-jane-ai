const input = document.getElementById('commandInput');
const runBtn = document.getElementById('runCommandBtn');
const responseOutput = document.getElementById('responseOutput');
const statusBadge = document.getElementById('statusBadge');
const activityFeed = document.getElementById('activityFeed');

async function runCommand(commandText) {
  try {
    const payload = { text: commandText };

    const result = await fetch('/api/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await result.json();
    responseOutput.textContent = JSON.stringify(data, null, 2);

    const item = document.createElement('li');
    item.textContent = `${new Date().toLocaleTimeString()} :: ${commandText}`;
    activityFeed.prepend(item);

    if (data.status === 'awake') {
      statusBadge.textContent = 'Awake';
      statusBadge.style.color = '#59d18a';
    } else if (data.action === 'spotify') {
      statusBadge.textContent = 'Music';
      statusBadge.style.color = '#d8b15f';
    } else if (data.action === 'roblox') {
      statusBadge.textContent = 'Build';
      statusBadge.style.color = '#8ed2ff';
    } else if (data.action === 'clips') {
      statusBadge.textContent = 'Clips';
      statusBadge.style.color = '#ffb36b';
    } else {
      statusBadge.textContent = 'Online';
      statusBadge.style.color = '#59d18a';
    }
  } catch (error) {
    responseOutput.textContent = 'Error: could not connect to the Patrick Jane API.';
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

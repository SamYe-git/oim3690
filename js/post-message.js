(function () {
  'use strict';

  const API = 'https://oim.zhili.dev';

  const form = document.getElementById('message-form');
  const tokenInput = document.getElementById('token');
  const messageInput = document.getElementById('message');
  const status = document.getElementById('status');
  const list = document.getElementById('messages');

  async function loadMessages() {
    try {
      const response = await fetch(`${API}/messages`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const messages = await response.json();

      list.innerHTML = '';
      for (const msg of messages) {
        const item = document.createElement('li');
        const time = new Date(msg.timestamp).toLocaleString();
        item.textContent = `${msg.author}: ${msg.message} (${time})`;
        list.appendChild(item);
      }
    } catch (err) {
      list.innerHTML = '';
      const item = document.createElement('li');
      item.textContent = `Could not load messages: ${err.message}`;
      list.appendChild(item);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    const token = tokenInput.value.trim();
    if (!message || !token) return;

    status.textContent = 'Sending...';
    try {
      const response = await fetch(`${API}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Token': token },
        body: JSON.stringify({ message })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      status.textContent = 'Message sent!';
      messageInput.value = '';
      loadMessages();
    } catch (err) {
      status.textContent = `Could not send: ${err.message}`;
    }
  });

  loadMessages();
})();

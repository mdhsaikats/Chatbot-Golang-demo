const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatArea = document.getElementById('chatArea');
const chatForm = document.getElementById('chatForm');

function appendMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.className =
    sender === 'You'
      ? 'self-end max-w-[80%] bg-blue-100 text-blue-800 rounded-2xl px-4 py-2 shadow mb-1'
      : 'self-start max-w-[80%] bg-green-100 text-green-800 rounded-2xl px-4 py-2 shadow mb-1';
  msgDiv.innerHTML = `<span class="font-semibold">${sender}:</span> ${message}`;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

chatForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) {
    userInput.classList.add('border-red-400');
    userInput.placeholder = 'Please enter a message!';
    return;
  }
  userInput.classList.remove('border-red-400');
  userInput.placeholder = 'Type your message...';
  appendMessage('You', message);
  userInput.value = '';
  try {
    const response = await fetch('http://localhost:8080/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    appendMessage('Bot', data.reply);
  } catch (err) {
    appendMessage('Bot', 'Error: Unable to get response.');
  }
});
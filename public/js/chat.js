let currentConvId = null;
const username='You'

function setup() {
  fetchConversations();

    document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('compose-input');
    const text = input.value.trim();
    if(text && currentConvId) {
    sendMessage('You', text);
    input.value = '';
    }
    });
}


// const conversations = [
//   {
//     id: 'conv1',
//     name: 'Alice',
//     lastMessage: 'Hey, how are you?',
//     timestamp: '2:30 PM',
//     unread: 2,
//     messages: ['Hey, how are you?', 'Are you there?']
//   },
//   {
//     id: 'conv2',
//     name: 'Bob',
//     lastMessage: 'See you tomorrow',
//     timestamp: 'Yesterday',
//     unread: 0,
//     messages: ['See you tomorrow']
//   },
//   {
//     id: 'conv3',
//     name: 'Carol',
//     lastMessage: 'Thanks for the help!',
//     timestamp: 'Monday',
//     unread: 1,
//     messages: ['Thanks for the help!']
//   }
// ];

async function fetchConversations() {
  const res = await fetch(`/conversations?username=${username}`);
  const data = await res.json();
  renderConversations(data.conversations);
}

function renderConversations(conversations) {
  const container = document.querySelector('.messages-list');
  container.innerHTML = '';
  conversations.forEach(conv => {
      createConversationItem(container, conv);
  });
}

async function fetchMessages(convId) {
  const res = await fetch(`/messages?id=${convId}`);
  const data = await res.json();
  renderMessages(data.messages);
  currentConvId = convId; 
}

function renderMessages(messages) {
  const container = document.querySelector('.messages');
  container.innerHTML = '';

  messages.forEach(msg => {
      const message = document.createElement('div');
      message.classList.add('message');
      if(msg.from === 'You') {
          message.classList.add('outgoing');
      } else {
          message.classList.add('incoming');
      }

      message.textContent = msg.text;
      container.appendChild(message);
  });
}

async function sendMessage(from, text) {
  const res = await fetch(`/send`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ convId: currentConvId, from, text })
  });
  const data = await res.json();
  fetchMessages(currentConvId);
}


function createConversationItem(list, conv) {
    const convo = document.createElement('div');
    convo.className = 'conversation';
    convo.id = conv.id;
    const nameDiv = document.createElement('div');
    nameDiv.className = "convo-name";
    nameDiv.textContent = conv.name;
    convo.appendChild(nameDiv);
    convo.addEventListener('click', () => {
        fetchMessages(conv.id);
    });

    list.appendChild(convo);
}


export default setup;
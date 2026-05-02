function setup() {
    chat();
    setupMessaging();

}

const conversations = [
  {
    id: 'conv1',
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    timestamp: '2:30 PM',
    unread: 2,
    messages: ['Hey, how are you?', 'Are you there?']
  },
  {
    id: 'conv2',
    name: 'Bob',
    lastMessage: 'See you tomorrow',
    timestamp: 'Yesterday',
    unread: 0,
    messages: ['See you tomorrow']
  },
  {
    id: 'conv3',
    name: 'Carol',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Monday',
    unread: 1,
    messages: ['Thanks for the help!']
  }
];

function chat() {
    const list = document.querySelector('.messages-list');
    conversations.forEach(conv => {
        createConversationItem(list, conv);
    });
}

function clickOnConversation(conv) {
    const messagesContainer = document.querySelector('.messages');
    const people = document.querySelector('.names');
    if (people) {
        people.textContent = conv.name;
    }
    messagesContainer.textContent = '';
    conv.messages.forEach(msg => {
        const message = document.createElement('div');
        message.className = 'message incoming';
        message.textContent = msg;
        messagesContainer.appendChild(message);
    });
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
        clickOnConversation(conv);
    });

    list.appendChild(convo);
}


function setupMessaging() {
    const input = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const messagesContainer = document.querySelector('.messages');
    function sendMessage() {
      const text = input.value;
        if (text === ''){
          return;
        } 
        const message = document.createElement('div');
        message.className = 'message outgoing';
        message.textContent = text;
        messagesContainer.appendChild(message);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
  }


export default setup;
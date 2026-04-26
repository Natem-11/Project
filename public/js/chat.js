function setup() {
    chat();

}

const conversations = [
  {
    id: 'conv1',
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    timestamp: '2:30 PM',
    unread: 2
  },
  {
    id: 'conv2',
    name: 'Bob',
    lastMessage: 'See you tomorrow',
    timestamp: 'Yesterday',
    unread: 0
  },
  {
    id: 'conv3',
    name: 'Carol',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Monday',
    unread: 1
  }
];

function chat() {


    const convo = document.createElement('div');
    convo.className = 'conversation';
    convo.id = 'conv1';

    const avatar = document.createElement('div');
    avatar.className = "convo-avatar";
    avatar.textContent = conv.name[0];
    convo.appendChild(avatar);

    const info = document.createElement('div');
    info.className = "convo-info"

    const nameDiv = document.createElement('div');
    nameDiv.className = "convo-name";
    nameDiv.textContent = conv.name;
    info.appendChild(nameDiv);

    const previewDiv = document.createElement('div');
    previewDiv.className = "convo-preview";
    previewDiv.textContent = conv.lastMessage;
    info.appendChild(previewDiv);

    const timestampDiv = document.createElement('div');
    timestampDiv.className = "convo-timestamp";
    timestampDiv.textContent = conv.timestamp;
    info.appendChild(timestampDiv);

    if (conv.unread > 0) {
    const badge = document.createElement('div');
    badge.className = 'unread-badge';
    badge.textContent = conv.unread;
    convo.appendChild(badge);
    }

    convo.appendChild(info);
}

export default setup;

import express from 'express';
import fs from 'fs';
import credentials from './data/credentials.json' with { type: 'json' };
import messages from './data/message.json' with { type: 'json' };

const app = express();

app.use(express.json());
app.use(express.static('public'));

// handle user login by POST
app.post('/login', function(req, res){
    const username = req.body.username;
    const user = credentials[username];
    
    if(user === undefined) {
        res.json({ success: false, message: 'Username does not exist.' });
        return;
    }

    if(user.password === req.body.password){
        res.json({ 
            success: true, 
            message: 'User authentication successful.',
            firstName: user.firstName,
            lastName: user.lastName
        });
    }
    else {
        res.json({ success: false, message: 'Incorrect password.' });
    }
});

// handle user registration by POST
app.post('/register', function(req, res){
    const username = req.body.username;
    const existingUser = credentials[username];

    if(existingUser !== undefined){
        res.json({ success: false, message: 'Username is already taken.' });
        return;
    }

    // add new user to the credentials object
    credentials[username] = { 
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    // update the credentials.json file
    fs.writeFile('./data/credentials.json', JSON.stringify(credentials, null, 4), 'utf-8', function(err){
        if(err) console.log(err);
        else console.log('Credentials saved to data/credentials.json');
    });

    // send a success message
    res.json({ success: true, message: "Registration successful." });
});

// GET the conversations list for a user
app.get('/conversations', function(req, res){
    const username = req.query.username;
    
    const conversationList = [];
    
    for(let key in messages){
        let parts = key.split('_');
        let user1 = parts[0];
        let user2 = parts[1];
        
        if(user1 === username || user2 === username){
            let otherUser = (user1 === username) ? user2 : user1;
            let messageArray = messages[key];
            let lastMessage = messageArray[messageArray.length - 1];
            
            conversationList.push({
                with: otherUser,
                firstName: credentials[otherUser] ? credentials[otherUser].firstName : otherUser,
                lastName: credentials[otherUser] ? credentials[otherUser].lastName : '',
                lastMessage: lastMessage ? lastMessage.text : 'No messages yet'
            });
        }
    }
    
    res.json({ success: true, conversations: conversationList });
});

// GET messages between two users
app.get('/messages', function(req, res){
    const user1 = req.query.user1;
    const user2 = req.query.user2;
    
    let users = [user1, user2].sort();
    let key = users[0] + '_' + users[1];
    
    if(messages[key] === undefined){
        res.json({ success: true, messages: [] });
    }
    else {
        res.json({ success: true, messages: messages[key] });
    }
});

// POST send a new message
app.post('/send', function(req, res){
    const from = req.body.from;
    const to = req.body.to;
    const text = req.body.text;
    
    let users = [from, to].sort();
    let key = users[0] + '_' + users[1];
    
    let newMessage = {
        from: from,
        text: text,
        timestamp: new Date().toString()
    };
    
    if(messages[key] === undefined){
        messages[key] = [];
    }
    
    messages[key].push(newMessage);
    
    fs.writeFile('./data/messages.json', JSON.stringify(messages, null, 4), 'utf-8', function(err){
        if(err) console.log(err);
        else console.log('Message saved');
    });
    
    res.json({ success: true, message: newMessage });
});

// GET all users list
app.get('/users', function(req, res){
    let userList = [];
    
    for(let username in credentials){
        userList.push({
            username: username,
            firstName: credentials[username].firstName,
            lastName: credentials[username].lastName
        });
    }
    
    res.json({ success: true, users: userList });
});

app.listen(3000, function(err){
    if(err) console.log(err);
    else console.log('Server listening on port 3000');
});
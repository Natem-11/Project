
import express from 'express';
import fs from 'fs';
import credentials from './data/credentials.json' with { type: 'json' };
import messages from './data/message.json' with { type: 'json' };

const app = express();

app.use(express.json());
app.use(express.static('public'));


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


app.post('/register', function(req, res){
    const username = req.body.username;
    const existingUser = credentials[username];

    if(existingUser !== undefined){
        res.json({ success: false, message: 'Username is already taken.' });
        return;
    }


    credentials[username] = { 
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };


    fs.writeFile('./data/credentials.json', JSON.stringify(credentials, null, 4), 'utf-8', function(err){
        if(err) console.log(err);
        else console.log('Credentials saved to data/credentials.json');
    });


    res.json({ success: true, message: "Registration successful." });
});


app.get('/conversations', function(req, res){
    const data = JSON.parse(fs.readFileSync('./data/message.json'));
    res.json({ success: true, conversations: data.conversations });
});


app.get('/messages', function(req, res){
    const convId = req.query.id;
    const data = JSON.parse(fs.readFileSync('./data/message.json'));
    const conv = data.conversations.find(c => c.id === convId);
    
    if(conv) {
        res.json({ success: true, messages: conv.messages });
    } else {
        res.json({ success: true, messages: [] });
    }
});


app.post('/send', function(req, res){
    const convId = req.body.convId;
    const text = req.body.text;
    const from = req.body.from;
    
    const data = JSON.parse(fs.readFileSync('./data/message.json'));
    const conv = data.conversations.find(c => c.id === convId);
    
    if(conv) {
        const newMessage = {
            from: from,
            text: text,
            timestamp: new Date().toString()
        };
        conv.messages.push(newMessage);
        conv.lastMessage = text;
        
        fs.writeFile('./data/message.json', JSON.stringify(data, null, 4), 'utf-8', function(err){
            if(err) console.log(err);
            else console.log('Message saved');
        });
        
        res.json({ success: true, message: newMessage });
    } else {
        res.json({ success: false, message: 'Conversation not found' });
    }
});


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
import express from 'express';
import fs from 'fs';
import credentials from './data/credentials.json' with { type: "json"}

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});
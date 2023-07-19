const mongoose = require('mongoose');
const Content = require('./model/content');

mongoose.connect('mongodb://127.0.0.1:27017/testBlogApp')
    .then(()=>{
        console.log('MONGO Connection Open!!')
    })
    .catch(err => {
        console.log("ERROR!!@ (on mongo)");
        console(err)
    });

const seedData = [
    {
        title:"Hello I am New to this site",
        text:"I like here lorem Ipsum lolololol!!!",
        comment:['Welcome', 'lolol']
    },
    {
        title:"the most visited place in the world",
        text:"Which is my room. the world is mine lol",
        comment:['KYS please', 'lol']
    },
    {
        title:"cmon",
        text:"Let me go to the gym pleas",
        comment:['I got you gym rat', 'how mouch can you bench?']
    },
];

Content.insertMany(seedData)
    .then(res => console.log(res))
    .catch(e => console.log(e))
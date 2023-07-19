const mongoose = require('mongoose');
const contentShcema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    text:{
        type:String,
        require:true,
    },
    comment:{
        type:[String]
    }
});

const Content = mongoose.model('Content', contentShcema);
module.exports = Content;
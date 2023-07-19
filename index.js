//imports
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodoverride = require('method-override');

//DB
const mongoose = require('mongoose');
const Content = require('./model/content');
mongoose.connect('mongodb://127.0.0.1:27017/testBlogApp')
    .then(()=>{
        console.log('MONGO Connection Open!!')
    })
    .catch(err => {
        console.log("ERROR!!@ (on mongo)")
        console(err);
    });

//middle ware
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.urlencoded({urlencoded:true}))
app.use(methodoverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

//roters
app.get('/', async(req,res)=>{
    const contents = await Content.find({}); //Content.find: 데이터를 가져 오는것
    res.render('pages/index',{contents});
})

app.post('/', async(req,res)=>{
    const newContent = new Content(req.body) //new Content({k:V}){k:V}라는 데이터를 DB에 넣는 것
    await newContent.save();
    res.redirect(`/`)
})

app.get('/blog/new', (req, res)=>{
    res.render('pages/new')
})

app.get('/blog/:id', async(req,res)=>{
    const {id} = req.params;
    const content = await Content.findById(id);  //Content.findById(id)= ID값에 해당하는 데이터를 찾는 것
    res.render('pages/detail', {content});
})

app.get('/blog/:id/update', async(req, res)=>{
    const {id} = req.params;
    const content = await Content.findById(id);
    res.render('pages/update', {content})
})

app.patch('/blog/:id', async(req, res)=>{
    const {id} = req.params; //Content.findByIdAndUpdate(id, {k:v}) = ID값에 해당하는 데이터를 찾고 찾은 데이터를 {k:v} 값으로 치환하는 것
    const content = await Content.findByIdAndUpdate(id,req.body,{runValidators:true},{new:true});
    res.redirect(`/blog/${content._id}`);
})

app.delete('/blog/:id', async(req,res)=>{
    const {id} = req.params;
    await Content.findByIdAndDelete(id)//Content.findByIdAndDelete(id) = ID값을 찾고 그 데이터를 삭제하는 것
    res.redirect('/')
})


app.listen(port,()=>{
    console.log(`The app is running on http://localhost:${port}`);
})
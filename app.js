const express= require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactSinging');
const bodyparser = require("body-parser")

const port = 3000;

//Defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS Specific stuff
app.use('/static',express.static('static'))//For serving static files
app.use(express.urlencoded());

//PUG specific stuff
app.set('view-engine','pug')//Set the template engine as pug
app.set('views',path.join(__dirname,'views'))//Set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params)
})

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved successfully")
    }).catch(()=>{
        res.status(400).send("Failed to send the item")
    })
    // res.status(200).render('contact.pug')
})

//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});
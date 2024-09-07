const express = require ("express") ;
const app = express() ;
const path = require("path") ;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://prantiksanki:Sanki@2004@cluster0.ko6ig7l.mongodb.net/iamSANKI?retryWrites=true&w=majority&appName=Cluster0');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone_no : Number,
    email: String,
    message:String
  });

const Contact = mongoose.model('Contact', contactSchema);













app.use('/static' , express.static('static')) ;

app.set('views' , path.join(__dirname , "views")) ;
app.set('views engine' , 'pug') ;

app.use(express.urlencoded());


app.post('/' , (req,res) =>
{
    console.log(req.body) ;
    const params = { } ; ;
    res.status(200).render('home.pug' , params) ;
})


app.get('/', (req, res)=>{
    const params = { } ;
    res.status(200).render('home.pug', params);
})

app.get("/contact", (req, res)=>{ 
    params = { };
    res.status(200).render('contact.pug' , params);

});

app.post("/contact", (req, res)=>{ 
    console.log(req.body) ;
    params = { };
    res.status(200).render('contact.pug' , params);

    const newContact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message
    });

    newContact.save();

});


app.listen(80 , (req,res) =>
{
    console.log("Server started on the port 80") ;
}) ;
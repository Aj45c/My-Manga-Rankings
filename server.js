const express = require("express");
const Mangas = require("./models/mangas.js");
const methodOverride = require("method-override");
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
//-------------------------------------------------------------------------
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//--------------------------------------------------------------------------
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//----------------------------------------------------------------
//ROUTES-----------INDEX-----------------------
app.get('/manga', (req, res) => {
    res.render("index.ejs", {
         allManga : Mangas
    })
});

//----------------NEW------------------------
app.get('/manga/new', (req, res) => {
    res.render("new.ejs")
});

//--------------DELETE--------------------------
app.delete("/manga/:index", (req, res) => {
    Mangas(req.params.index, 1)
    res.redirect('/manga')
})

//------------- UPDATE-------------------------
app.put('/manga/:index', (req, res) =>{
    Mangas[req.params.index].Rating = req.body.Rating
    res.redirect('/manga')
})

//-------------CREATE--------------------------
app.post("/manga" , (req, res) =>{
    newEntry = {
        Name: req.body.Name,
        Arthur: req.body.Arthur,
        Genre: req.body.Genre,
        img: "https://i.imgur.com/C8ApYJV.jpg",
        Demographic: req.body.Demographic,
        Volumes: req.body.Volumes,
    }
    console.log(newEntry);
    Mangas.push(newEntry)
    res.redirect("/manga")
})

//---------------EDIT--------------------------
app.get('/Manga/:index/edit', (req, res) =>{
    res.render('edit.ejs',{
        manga: Mangas[req.params.index],
    })
})

//--------------SHOW---------------------------
app.get('/Manga/:index', (req, res) => {
    res.render('show.ejs', {
        theManga: Mangas[req.params.index],
        Name: req.params.Name
    });
})

// Listenter
app.listen(3000, () => {
    console.log(`The server is listening on port: ${3000}`)
})
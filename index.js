const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));




app.get("/", (req,res) => {
    fs.readdir(`./files`,function(err,files){
        res.render('index',{FILES : files});
    })
        
})

app.get("/file/:filename", (req,res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8", (err, filedata)=>{
        res.render('show', {fileName: req.params.filename, fileData:filedata});
    })   
})

app.get("/edit/:filename", (req,res) => {
    res.render('edit',{fileName: req.params.filename});   
})

app.post("/edit", (req,res) => {
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, function(err){
        res.redirect('/');
    })
     
})

app.post('/create', function(req, res){
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        if(err) throw err;
        else {
            res.redirect('/');
        }
    })
})

app.listen(3000);
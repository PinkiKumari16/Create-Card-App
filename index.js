const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res)=>{
    fs.readdir(`./files`,(err, files) => {
        res.render("index", {files: files});
    });
})
app.post("/create", (req, res)=>{
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details ,(err, data)=>{
        res.redirect("/");
    } ); 
})
app.get("/files/:fileName", (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`,'utf8', (err, fileData)=>{
        // console.log(fileData);
        res.render("fileContent", {title:req.params.fileName, content: fileData });
    })  
})
app.get("/edit/:fileName", (req, res) => {
    res.render("editPage", {preFileName: req.params.fileName});
})
app.post("/editfile", (req, res) => {
    console.log(req.body);
    fs.rename(`./files/${req.body.previousName}` , `./files/${req.body.newName.split(' ').join('')}.txt` , (err, data)=>{
        res.redirect("/");
    })
    
})

app.listen(3000, ()=>{
    console.log('running.............');
})
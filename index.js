const express = require('express');
const app =express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');

app.get('/',function(req,res){
  
  fs.readdir(`./files`,function(err,files){
   
    res.render("index", { files: files });
  })
});
app.post('/submit', function(req, res) {
  const filename = req.body.title.split(' ').join('') + '.txt';
  fs.writeFile(`./files/${filename}`, req.body.details, function(err) {
    if (err) {
      console.log("Error creating file:", err);
      return res.status(500).send("Error creating file");
    }
    console.log("File created:", filename);
    res.redirect("/");
  });
});

app.listen(3000,()=>{
  console.log("server is running on port 3000");
})
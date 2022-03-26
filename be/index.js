const express = require('express');
const app = express ();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
//npm run devStart
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "coinpass",
});

app.post("/register",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.query("INSERT INTO coinpass.users (username, password) VALUES (?,?)",
    [username, password],
    (err,result)=>{
      console.log(err);
    })
});

app.post("/login",(req,res)=> {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM coinpass.users WHERE username = ? AND password = ?",
        [username, password],
        (err,result) => { 
          if (err) {
              res.send({err: err});
          }
          if(result.length > 0){
              res.send(result);
          } else {
              res.send({message:"wrong username/password"});
          }
    });
});



app.listen(3001,()=>{
    console.log("running on port 3001")
});
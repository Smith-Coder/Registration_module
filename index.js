const express = require('express');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var ejs = require("ejs");
const app = express();
const path=require('path');
const port = 3000;

app.use(express.static(path.join(__dirname,'static')));

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration'
})

connection.connect(function(err){
  if(err) throw err;
  console.log("connected");
})

app.get('/', (req, res) => {
  res.render('registration')
})

app.post('/register',function(req,res){
  var mail1=req.body.email1;
  var mail2=req.body.email2;
  var discordName1=req.body.discord1;
  var discordName2=req.body.discord2;
  var teamnam= req.body.team;
  var mailck1=mail1.slice(-10,)
  var mailck2=mail2.slice(-10,)

  connection.query('SELECT teamname FROM teams', function (err,teamnames) {
    if (err) throw err
    for(var i=0;i<teamnames;i++)
    {
      var count=0;
      if(teamnames[i].teamname==teamnam){
        count++;
      }
    }
    connection.query('SELECT email_1 FROM teams', function (err,emails1) {
      if (err) throw err
    for(var i=0;i<emails1;i++)
    {
      var count1=0;
      if(emails1[i].email_1==mail1){
        count1++;
      }
    }
    connection.query('SELECT email_2 FROM teams', function (err,emails2) {
      if (err) throw err
    for(var i=0;i<emails2;i++)
    {
      var count2=0;
      if(emails2[i].email_2==mail2){
        count2++;
      }
    }
    connection.query('SELECT member_1_discord_name FROM teams', function (err,discordname1) {
      if (err) throw err
    for(var i=0;i<discordname1;i++)
    {
      var count3=0;
      if(discordname1[i].member_1_discord_name==discordName1){
        count3++;
      }
    }
    connection.query('SELECT member_2_discord_name FROM teams', function (err,discordname2) {
      if (err) throw err
    for(var i=0;i<discordname2;i++)
    {
      var count4=0;
      if(discordname2[i].member_2_discord_name==discordName2){
        count4++;
      }
    }

  if(req.body.team=="" || req.body.name1=="" || req.body.name2=="" || req.body.email1=="" || req.body.email2=="" || req.body.discord1=="" || req.body.discord2=="" ){
    const respond="Please don't submit blank fields";
    res.render('registration',{respond})
  }
  else if(mailck1!="@gmail.com" && mailck2!="@gmail.com"){
    const respond="Enter email address of the format example@gmail.com";
    res.render('registration',{respond})
  }
  else if(count>0)
  {
    const respond="This teamname already exists";
    res.render('registration',{respond})
  }
  else if(count1>0)
  {
    const respond="member 1 email is already registered to another team";
    res.render('registration',{respond})
  }
  else if(count2>0)
  {
    const respond="member 2 email is already registered to another team";
    res.render('registration',{respond})
  }
  else if(count3>0)
  {
    const respond="member 1 discord name is already registered to another team";
    res.render('registration',{respond})
  }
  else if(count4>0)
  {
    const respond="member 2 discord name is already registered to another team";
    res.render('registration',{respond})
  }
  else{
    var sql = "insert into teams values('"+ req.body.team+"','"+ req.body.name1+"','"+ req.body.name2+"','"+ req.body.email1+"','"+ req.body.email2+"','"+ req.body.discord1+"','"+ req.body.discord2+"')";
      connection.query(sql, function (err) {
      if (err) throw err
      res.send('registered')
    })
  }
})
})
    })
  })
})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
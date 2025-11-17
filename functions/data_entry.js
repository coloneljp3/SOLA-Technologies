'use strict'
var mysql = require('mysql2')
var express = require('express')
var app = express();
var router = express.Router();
var serverless = require('serverless-http')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',(req,res)=>{
res.send(`
<form method = "POST" action = "/.netlify/functions/research">
<input placeholder = "Type in data points" name = "data_points"/>
<input placeholder = "Type in x axis label" name = "x-axis-label"/>
<input placeholder = "Type in y axis label" name = "y-axis-label">

</form>

`)
  
})

app.use('/.netlify/functions/data_entry',router);
module.exports.handler = serverless(app);

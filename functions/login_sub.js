'use strict'
const mysql = require('mysql2');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const serverless = require('serverless-http');
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',(req,res)=>{
var user = req.body.username
var psw = req.body.psw
var conn = mysql.createConnection(process.env.DATABASE_URL)
   conn.query('SELECT * FROM Records',(err,results)=>{res.send(err)})

})

app.use('/.netlify/functions/login_sub',router)

module.exports.handler = serverless(app)

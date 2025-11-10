
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
conn.query(`Select COUNT(*) FROM Accounts WHERE username = ? AND pasword = ?`,[user,psw],(err,results,fields) => {
    res.send(err); 

})})

app.use('/.netlify/functions/create_account',router)

module.exports.handler = serverless(app)

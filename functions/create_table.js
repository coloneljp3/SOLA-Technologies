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
var conn = mysql.createConnection("mysql://avnadmin:AVNS_om8uYVTBL50tPl05R_4@mysql-1e9f0822-jpbreaux225-37e4.h.aivencloud.com:25589/defaultdb?ssl-mode=REQUIRED")
conn.query(`
Create Table SupervisedSurveys(
ID int AUTO_INCREMENT NOT NULL,
account_name varchar(40),
JSON_question_answers TEXT,
PRIMARY KEY (id)


);`,[user,psw],(err,results,fields) => {
    res.send(err); 

})})

app.use('/.netlify/functions/create_table',router)

module.exports.handler = serverless(app)

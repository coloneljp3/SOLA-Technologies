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

Create Table Case_Studies(
ID int AUTO_INCREMENT NOT NULL,
first_name varchar(40),
last_name varchar(40),
MI varchar(40),
previous_acl_injuries varchar(40),
previous_injuries_list varchar(255),
sport varchar(30),
athlete_bool varchar(10),
diet varchar(50),
weight varchar(10),
height varchar(10),
race varchar(40),
foot_image LONGBLOB NOT NULL, 
citation varchar(255),
PRIMARY KEY (id)



);`,[user,psw],(err,results,fields) => {
    res.send(err); 

})})

app.use('/.netlify/functions/create_table',router)

module.exports.handler = serverless(app)

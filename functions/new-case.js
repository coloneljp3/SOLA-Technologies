'use strict'
const gcloud = require('@google-cloud/language');
const mysql = require('mysql2');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const serverless = require('serverless-http');
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',(req,res)=>{
var first_name = req.body.first_name;
var last_name = req.body.last_name;
var MI = req.body["M.I."];
var prev_injuries_list = req.body.prev_injuries_list;
var sport = req.body.sport;
var diet = req.body.diet;
var height_in = req.body.height_in;
var height_ft = req.body.height_ft;
var race = req.body.race;
var sex = req.body.sex;
var foot_image = req.body.foot_image;
var knee_img = req.body.knee_img;
var citation = req.body.citation;

var conn = mysql.createConnection("mysql://avnadmin:AVNS_om8uYVTBL50tPl05R_4@mysql-1e9f0822-jpbreaux225-37e4.h.aivencloud.com:25589/defaultdb?ssl-mode=REQUIRED")
conn.query(`INSERT INTO Case_Studies(first_name, last_name, MI, previous_injuries_list, sport, diet, weight, height, race, foot_image, citation) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,[
  first_name, last_name, MI, prev_injuries_list, sport, diet, height_ft + " "+height_in, race, foot_image, citation],(err)=>{
  if(err){res.send("There was an error: " + err + Object.keys(new gcloud.Client()))}
  res.send("Submitted");
  })
  
})

app.use('/.netlify/functions/new-case',router);
module.exports.hander = serverless(app);

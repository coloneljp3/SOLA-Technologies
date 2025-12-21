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
conn.query(`Select COUNT(*) FROM Accounts WHERE username = ? AND pasword = ?`,[user,psw],(err,results,fields) => {
    res.send(`<html><head></head><body><style>
.case-inputs{display:block;border-style:none; border-bottom-style:solid;margin:30px}
  .case-inputs::placeholder{font-family:Verdana;color:grey}  
</style><h1 style="text-align:center;font-family:Calibri;color:grey">ACL Case Survey</h1><form enctype="multipart/form-data" action="/.netlify/functions/new-case" method="submit-new-case" style="margin:auto;width:50%">
<input class="case-inputs" name="first_name" placeholder="First Name">
<input class="case-inputs" name="last_name" placeholder="Last Name">
<input class="case-inputs" name="M.I." placeholder="Middle Initial">

<textarea class="case-inputs" name="prev_injuries_list" placeholder="Previous Injuries" style="border-style: solid;"></textarea>
<input class="case-inputs" name="sport" placeholder="Sport/activity">
<input class="case-inputs" name="diet" placeholder="Diet">
<input class="case-inputs" name="weight" placeholder="Weight">
<input class="case-inputs" name="height" placeholder="Height(ft)" style="display:inline-block">
    <input class="case-inputs" style="display:inline-block" name="height" placeholder="Height(in)">
<input class="case-inputs" name="race" placeholder="Race/ethnicity">
<input class="case-inputs" name="sex" placeholder="Sex">
<input class="case-inputs" name="foot_image" placeholder="" type="image">
<input class="case-inputs" name="knee_proportions" placeholder="Knee proportions"><button class="case-inputs" style="margin:auto;text-align:center;height:40px;width:100px;font-size:20px">Submit</button>




</form></body></html>`); 

})})

app.use('/.netlify/functions/ACLCaseSurvey',router)

module.exports.handler = serverless(app)

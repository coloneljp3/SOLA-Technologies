'use strict'
const mysql = require('mysql2');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const serverless = require('serverless-http');
const router = express.Router();
const gcloud = require('@google-cloud/language')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post('/',(req,res)=>{
  res.send('Yo')
})

app.use('/.netlify/functions/new_case',router);

module.exports.hander = serverless(app);

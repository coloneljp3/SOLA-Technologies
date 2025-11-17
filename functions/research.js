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
  res.send(`
  <script>
    
function convertDataToGraph(data_points, id){
    
    var parent_of_root = document.getElementById("parent_of_root");
    var pre_existing_graph = document.getElementById('root');
    parent_of_root.removeChild(pre_existing_graph);
    var root = document.createElement('div');
    let highest_x=data_points[0]["x"];let highest_y=data_points[0]["y"];
    for(let i of data_points){
        if(i["x"]>highest_x){highest_x = i["x"];}
        if(i["y"]>highest_y){highest_y = i["y"];}
    }

   
    root.style.borderBottomStyle = 'solid';
    root.style.borderBottomcolor = "black";
    root.style.borderLeftColor = "black";
    root.style.borderLeftStyle = "solid";
    root.style.height = highest_y;
    root.style.width = highest_x;
            let line = document.createElement('polyline');
let line_container = document.createElement('svg');
    for(let i of data_points){
        let point = document.createElement('div');
        
        point.style.borderRadius = "25%";
        point.style.backgroundColor ="black";
        point.style.height = "2px";
        point.style.position = "absolute";
        point.style.width = "2px";
        console.log(highest_y-i["y"]);
        let new_y = highest_y-i["y"];
        point.style.top = new_y;
        let new_x = i["x"];
        point.style.left = new_x;
        line.points += new_x + " " + new_y + " "; 
    root.appendChild(point);

}       
    line_container.position = 'absolute';
    line_container.appendChild(line);
    root.appendChild(line_container);
        parent_of_root.appendChild(root);

}

    
</script>

<div id = "root_1"><div id = "root"></div></div>
<button onclick = "convertDataToGraph([{'x':34,'y':34},{'x':50,'y':34},{'x':20,'y':45},{'x':17,'y':99},{'x':100,'y':200},{'x':36,'y':67},{'x':69,'y':12}],'root')">Click Me</button>`)})
app.use('/.netlify/functions/research',router)
module.exports.handler=serverless(app)

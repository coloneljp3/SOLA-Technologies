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
<html>
    <script>
function assignClass(elements,className){
    for(let i of elements){
        i.className = className;
    }
}

function appendChildren(root,elements){
    for(let i of elements){
        root.appendChild(i);
    }
}
    
function assignPlaceHolder(elements,placeholder){
    for(let i of elements){
        i.placeholder = placeholder;
    }
    
}


        
function addToSurvey(id){
    var root = document.getElementById(id);
    var select = document.createElement('select');
    var mc = document.createElement('option');
    var tf = document.createElement('option');
    var la = document.createElement('option');
    var sa = document.createElement('option');
    mc.value = "mc";
    tf.value = "tf";
    la.value = "la";
    sa.value = "sa";

    select.appendChild(mc);
    select.appendChild(tf);
    select.appendChild(la);
    select.appendChild(sa);
    root.appendChild(select);
}

function determineTypeOfQuestion(element){
    switch(element.value){
case "mc":
        let root = document.createElement('div');
        let question1 = document.createElement('input');
        question1.name = "question1";
        question1.placeholder = "Type a question";
        let answer1, answer2, answer3, answer4;
        answer1 = document.createElement('input');
        answer2 = document.createElement('input');
        answer3 = document.createElement('input');
        answer4 = document.createElement('input');
        let lis = [answer1, answer2, answer3, answer4];
        assignClass(lis,"answers_styles");
        assignPlaceHolder(lis,"Type in a multiple choice answer");
        root.appendChild(question1);
        appendChildren(root,lis);
case "tf":
         let root = document.createElement('div');
        let question1 = document.createElement('input');
        let TrueValue = document.createElement('input');
        let FalseValue = document.createElement('input');
        let container1 = document.createElement('div');
        let container2 = document.createElement('div');
        let truelabel = document.createElement('p');
        let falselabel = document.createElement('p');
        truelabel.innerHTML = "True";
        falselabel.innerHTML = "False";
        appendChildren(container1, [truelabel, TrueValue]);
        appendChildren(container2, [falselabel, FalseValue]);
        appendChildren(root,[container1,container2]);
        


case "la":
        let root = document.createElement('div');
        let question1 = document.createElement('input');
        question1.name = "question1";
        question1.placeholder = "Type a question";
        let answer1;
        answer1 = document.createElement('input');
       
        let lis = [answer1];
        assignClass(lis,"answers_styles");
        assignPlaceHolder(lis,"Type a long answer response");
        root.appendChild(question1);
        appendChildren(root,lis)
case "sa":
        let root = document.createElement('div');
        let question1 = document.createElement('input');
        question1.name = "question1";
        question1.placeholder = "Type a question";
        let answer1;
        answer1 = document.createElement('input');
       
        let lis = [answer1];
        assignClass(lis,"answers_styles");
        assignPlaceHolder(lis,"Type a short answer response");
        root.appendChild(question1);
        appendChildren(root,lis)
    }
    
}
    </script>
<form id = "survey">
<input placholder = "Type in your question" name = "question_name"/>
<input placholder = "Type in your answer" name = "answer_name"/>
<select onselect = "" name = "type_of_question">
    <option value = "mc">Multiple Choice</option>
    <option value = "tf">True/False</option>
    <option value = "la">Long Answer
    </option>
    <option value = "sa">Short Answer</option>

</select>

</form>
<button onclick = "addToSurvey('survey')"></button>
    
</html>


<html>
<form method = "POST" action = "/.netlify/functions/datastored">
<label class = "form-labels">What is your age?</label>
<input class = "form-inputs" name = "" placeholder = "Enter your answer"/>
<label class = "form-labels">What is your first name?</label>
<input class = "form-inputs" name = "" placeholder = "Enter your answer"/>
<label class = "form-labels">What is your last name?</label>
<input class = "form-inputs" name = "" placeholder = "Enter your answer"/>
<label class = "form-labels">What is your middle name?(optional)</label>
<input class = "form-inputs" name = "" placeholder = "Enter your answer"/>
<label class = "form-labels">What are does your diet primarily consist of?</label>
<select name = "diet" class = "form-inputs">
<option value = "null">Choose your answer</option>
<option value = "carbs">Carbohydrates</option>
<option value = "protein">Protein</option>
<option value = "fats">Fats</option>
</select>
<label class = "form-labels">Do you have a family history of ACL injury tears?</label>
<input class = "form-inputs" name = "" placeholder = "Enter your answer"/>
<label class = "form-labels">What sport(s) do you play?</label>
<li><span><label class = "form-labels"></label></span><input class = "form-inputs" name = "" type = "checkbox" placeholder = "Enter your answer"/></li>
<li><span><label class = "form-labels"></label></span><input class = "form-inputs" name = "" type = "checkbox" placeholder = "Enter your answer"/></li>
<li><span><label class = "form-labels"></label></span><input class = "form-inputs" name = "" type = "checkbox" placeholder = "Enter your answer"/></li>
<li><span><label class = "form-labels"></label></span><input class = "form-inputs" name = "" type = "checkbox" placeholder = "Enter your answer"/></li>
<li><span><label class = "form-labels"></label></span><input class = "form-inputs" name = "" type = "checkbox" placeholder = "Enter your answer"/></li>

</form>

    
</html>

`)
  
})

app.use('/.netlify/functions/data_entry',router);
module.exports.handler = serverless(app);

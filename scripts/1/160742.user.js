// ==UserScript==
// @name Cporta
// @include *cporta.iit.bme.hu*
// @author Ruzar
// ==/UserScript==

function addCss(cssString) { 
var head = document.getElementsByTagName('head')[0];
var newCss = document.createElement('style'); 
newCss.type = "text/css"; 
newCss.innerHTML = cssString; 
head.appendChild(newCss); 
}

addCss ( 
'\
div, ul, li, h1, h2, h3, h4, h5, dl {border-radius: 10px; padding: 0px 8px 0px 8px;}\
ul {padding-left:30px;}\
a {color: #000000 !important;} \
body { background-color: #8CB3A6 !important; font-family:Arial, Helvetica, sans-serif;}\
#container { background-color: #EEFFF7 !important; }\
#content { background-color: #EEFFF7 !important; }\
h2,h3,h4 { background-color: #6C8A80 !important; }\
#menubar li { margin: 5px !important; font-size: 15px;}\
#menubar li:hover { background-color: #ffffff !important;}\
#menubar a { color: #000000;}\
.exercise-solution-list ul li:first-child[class=""] a{ font-size: 25px !important; background-color: #129738; text-transform:uppercase;}\
.exercise-solution-list ul li:first-child[class=""] a:hover{background-color: #70d18c;}\
.exercise-solution-list ul li:first-child[class=""] { margin: 0px 0px 20px 0px;}\
.exercise-solution-list ul { height:250px; !important; overflow:scroll !important; border: 1px solid #6C8A80; padding:5px;}\
input {min-width:20px; min-height: 20px; font-size: 12px;}\
input[type="submit"] {height: 40px; background-color: #129738; margin-left: 45px;}\
#toc {background-color: #EEFFF7 !important; border: 1px solid #6C8A80;}\
.exercise-closed h3 {background-color:#a9b1ae !important;}\
.exercise-row, .exercise-row * {line-height:1.5em !important; height:30px !important;}\
.exercise-row h3 a {margin: 0px 5px 0px 5px !important;}\
div dl,.exercise-spec {border: 1px solid #6C8A80; padding:5px;}\
.CodeMirror, .CodeMirror * {padding:0px; border-radius: 0px;}\
.sh_sourceCode {border: 1px solid #6C8A80;}\
'
);
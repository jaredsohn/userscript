// ==UserScript==
// @name        Custom Background Color
// @namespace   http://localhost
// @include     http://www.torrentday.com/*
// @include     http://*.torrentday.*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.4
// ==/UserScript==


document = unsafeWindow.document;
var $ = unsafeWindow.jQuery;

//Set Cookie
var date = new Date();
date.setDate(date.getDate() + 10000*1000).toLocaleString();

var exp_date = new Date();
exp_date.setDate(exp_date.getDate() - 10000).toLocaleString();

var cookie = document.cookie.toString();
var color_str = /bgcolor=[a-z#0-9]*/i;
var check = color_str.exec(cookie);
if(check){
var current_bgcolor = check.toString().slice(8);
}
if(current_bgcolor){
document.body.style.background = current_bgcolor;
}

//Clear cookie
function remove(){
var current_bgcolor_str = "bgcolor="+current_bgcolor;
document.cookie = current_bgcolor_str+';expires='+exp_date;
}

//CSS Here
var css1 = "a#color_button{padding-left:10px;width:97px;color:black;background:#d8d8d8;display:block;font-size:20px;border:2px black solid;}";
var css2 = "div#main_div{cursor:pointer;}div#colors{cursor:pointer;padding-left:2px;padding-top:4px;padding-bottom:4px;}span.colors{text-align:center;display:block;border:1px solid black};";
var css = css1 + css2;
var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.insertBefore(style,head.childNodes[1]); 



//Choices of Colors
var inner_code1 = '<div id="main_div"><a id="color_button">COLOURS</a></div><br>';

//Add colors here  //'<span class="colors" id="color">COLOR</span><br>'+ //
var inner_code2 = ['<div id="colors">'+
'<span class="colors" id="red" style="background:red;">RED</span><br>'+ 
'<span class="colors" id="purple" style="background:purple;">PURPLE</span><br>'+
'<span class="colors" id="green" style="background:green;">GREEN</span><br>'+
'<span class="colors" id="orange" style="background:orange;">ORANGE</span><br>'+
'<span class="colors" id="darkblue" style="background:#001A57;">DARK BLUE</span><br>'+  //#001A57
'<span class="colors" id="pinkdeep" style="background:#FF1493;">DEEP PINK</span><br>'+ // #FF1493
'<span class="colors" id="redorange" style="background:#FF4500;">RED ORANGE</span><br>'+  //#FF4500
'<span class="colors" id="olivedrab" style="background:#6B8E23;">OLIVE DRAB</span><br>'+//#6B8E23

//End add colors
'<span class="colors" id="reset" style="background:#526169;">RESET</span><br>'+ //#526169
'</div>'].join();

var inner_code = inner_code1 + inner_code2;
var div = function(){
var a = document.getElementsByTagName('body')[0];
var b = document.createElement('div');
b.style.position = 'absolute';
b.style.top = '200px';
b.style.left = '10px';
b.innerHTML = inner_code;
a.appendChild(b);
}
div();


//Hide or Show 
if(document.cookie.toString().match(/block/)){
$("#colors").show();
}
else if(document.cookie.toString().match(/none/)){
$("#colors").hide();
}
else{
$(function(){$("#colors").hide();})
}


var disp;
$("#main_div").click(function() {  
    	$("#colors").slideToggle(function get_disp(){  //callback function
    disp = document.getElementById('colors').style.display;
    document.cookie = disp +';expires='+date;
});
    	
});



//Color executing functions
//FOR WHITE
var reset = document.getElementById('reset');
reset.onclick = function(){
remove();
window.location = "/";
}

//FOR RED
var red = document.getElementById('red');
red.onclick = function(){
remove();
document.body.style.background = "red";
var color = "bgcolor=red";
document.cookie= color+';expires='+date;
}

//FOR PURPLE
var purple = document.getElementById('purple');
purple.onclick = function(){
remove();
document.body.style.background = "purple";
var color = "bgcolor=purple";
document.cookie= color+';expires='+date;
}


//FOR GREEN
var green = document.getElementById('green');
green.onclick = function(){
remove();
document.body.style.background = "green";
var color = "bgcolor=green";
document.cookie= color+';expires='+date;
}

//FOR ORANGE
var orange = document.getElementById('orange');
orange.onclick = function(){
remove();
document.body.style.background = "orange";
var color = "bgcolor=orange";
document.cookie= color+';expires='+date;
}

//FOR DARK BLUE
var darkblue = document.getElementById('darkblue');
darkblue.onclick = function(){
remove();
document.body.style.background = "#001A57";
var color = "bgcolor=#001A57";
document.cookie= color+';expires='+date;
}

//FOR DEEP PINK
var pinkdeep = document.getElementById('pinkdeep');
pinkdeep.onclick = function(){
remove();
document.body.style.background = "#FF1493";
var color = "bgcolor=#FF1493";
document.cookie= color+';expires='+date;
}

//FOR RED ORANGE
var redorange = document.getElementById('redorange');
redorange.onclick = function(){
remove();
document.body.style.background = "#FF4500";
var color = "bgcolor=#FF4500";
document.cookie= color+';expires='+date;
}


//FOR OLIVE DRAB
var olivedrab = document.getElementById('olivedrab');
olivedrab.onclick = function(){
remove();
document.body.style.background = "#6B8E23";
var color = "bgcolor=#6B8E23";
document.cookie= color+';expires='+date;
}



//Add New Colours Below This








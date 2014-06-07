// ==UserScript==
// @name        Scroll Until Fixed
// @namespace   http://localhost
// @include     http://userscripts.org/*
// @version     1.0
// ==/UserScript==


//CSS Here
var client_width = document.documentElement.clientWidth+'px';
var style_css = "div#mydiv{height:40px;background:pink;}div#mydiv1{height:40px;background:pink;}";

var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = "text/css";
style.innerHTML = style_css;
head.insertBefore(style,head.childNodes[1]);

//Header Here
var header = function(id,pos,top,left){
var x = document.getElementsByTagName('body')[0];
var y = document.createElement('div');
y.innerHTML = '<div >THIS CAN BE SCROLLED</div>';
y.id = id;
y.style.position = pos;
y.style.width = client_width;
y.style.top = top;
y.style.left = left;
x.appendChild(y);
}

header('mydiv1','fixed','0px','0px');
header('mydiv','absolute','165px','0px');   //this is where you want your original header to be
mydiv1.style.display = 'none';

var check_pos = function(){
var mydiv_param = document.getElementById('mydiv').getBoundingClientRect();
var mydiv_top = mydiv_param.top;

if(mydiv_top <= 0){
 mydiv.style.opacity = '0';
 mydiv1.style.display = 'block';
 mydiv1.innerHTML = '<div >UNTIL HERE...</div>';
}
if(mydiv_top>=0){
 mydiv.style.opacity = '1';
 mydiv1.style.display = 'none';
}
}

window.onload = check_pos;
window.onscroll = check_pos;


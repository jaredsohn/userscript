// ==UserScript==
// @name           RoC Clock
// @namespace      Clock
// @include        http://www.ruinsofchaos.com/*
// ==/UserScript==

var s_next = document.getElementById("s_next");

var cDown = '';
var sec = '';
var min = '';
if(s_next.innerHTML != 'Now'){
sec = parseInt(s_next.innerHTML.substring(3,5), 10);
min = parseInt(s_next.innerHTML.substring(0,2), 10);
} 
else{
sec = '00';
min = '30';
}

initSec = sec;
initMin = min % 10;
var ms = 0;

window.setInterval(
function(){
cDown = '';

if(sec == 0){
sec = 59;
min -= 1;
}
else{
sec -= 1;
}

if (min < 0){
min = 29;
}

if(min == 0){
cDown = '00' + ':';
}
else if(min < 10){
cDown = '0' + min + ':';
}
else{
cDown =  min + ':';
}

if(sec < 10){
cDown = cDown + '0' + sec;
}
else{
cDown = cDown + sec;
}

if((min % 10) == initMin && sec == initSec){
document.getElementById("captcha_image").src = document.getElementById("captcha_image").src + "&rand=" + Math.round(Math.random()*100000);
}


s_next.innerHTML = cDown; 
}, 1000);
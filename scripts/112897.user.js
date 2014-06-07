// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Reload Prevent
// @description	Script prevents reload
// @include 	http://*travian.*/*
// @version     1.1
// ==/UserScript==
function replaceTimer(){
var j = 1;
while (document.getElementById('timer'+j))
{
document.getElementById('timer'+j).setAttribute('class','my_counter');
document.getElementById('timer'+j).removeAttribute('id');
j++;
}
}

function myTimer() {
var timers = [];
var timer = [];
var timeleft = 0;
var newtxt = "";
var h = 0;
var m = 0;
var s = 0;
function kl10(number){if(number<10){return "0"+number;}else{return number}};
timers = document.getElementsByClassName('my_counter');
for (var i = 0;i<timers.length;i++){
	timer = timers[i].textContent.split(":");
	timeleft = parseInt(timer[0],10) * 3600;
	timeleft += parseInt(timer[1],10) * 60;
	timeleft += parseInt(timer[2],10);
if(timeleft<1){
}else{
timeleft--;
s = timeleft%60;
m= ((timeleft-s)/60)%60;
h= ((timeleft-s)/60-m)/60;
newtxt = kl10(h)+":"+kl10(m)+":"+kl10(s);
timers[i].textContent = newtxt;
}}
window.setTimeout ( function() { 
			myTimer();	
		},
			1000 );
}
replaceTimer();
myTimer();

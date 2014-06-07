// ==UserScript==
// @name           New irctc RealTime Clock
// @namespace      http://userscripts.org/users/252956
// @description    Makes the clock change like a real digital clock
// @include        http://www.irctc.co.in/*
// @include        https://www.irctc.co.in/*
// @copyright      Ramesh Rajpurohit
// ==/UserScript==

function setTime() {
var date, hours, minutes, seconds;
date = new Date();
hours = date.getHours().toString();
minutes = date.getMinutes().toString();
seconds = date.getSeconds().toString();
if(hours.length==1) {hours="0"+hours;} // Correct the 1 digit glitch
if(minutes.length==1) {minutes="0"+minutes;} // Correct the 1 digit glitch
if(seconds.length==1) {seconds="0"+seconds;} // Correct the 1 digit glitch
document.getElementById("orngnavi").children[1].innerHTML = " ["+hours+":"+minutes+":"+seconds+" IST]";
}

setInterval(setTime, 1000);
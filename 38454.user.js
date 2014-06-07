// ==UserScript==
// @name           IRCTC RealTime Clock
// @namespace      http://userscripts.org/users/23652
// @description    Makes the clock change like a real digital clock
// @include        http://*.irctc.co.in/*
// @include        https://*.irctc.co.in/*
// @copyright      JoeSimmons
// ==/UserScript==

var time_box, site_date;
time_box = document.evaluate("//div[@title='Date and Time']", document, null, 9, null).singleNodeValue;

if(!time_box || typeof time_box != "object") {return;}

site_date = time_box.textContent.match(/\d{1,2}-\w+-200\d/);

function setTime() {
var date, hours, minutes, seconds;

date = new Date();
hours = date.getHours().toString();
minutes = date.getMinutes().toString();
seconds = date.getSeconds().toString();
if(hours.length==1) {hours="0"+hours;} // Correct the 1 digit glitch
if(minutes.length==1) {minutes="0"+minutes;} // Correct the 1 digit glitch
if(seconds.length==1) {seconds="0"+seconds;} // Correct the 1 digit glitch

if(typeof time_box == "object" && /\d+:\d+:\d+(?: IST\])/.test(time_box.textContent)) {
time_box.textContent = site_date+" ["+hours+":"+minutes+":"+seconds+" IST]";
}
}

setInterval(setTime, 1000);


// ==UserScript==
// @name           GLB Server Time
// @namespace      www.goallineblitz.com
// @description    Shows APPROXIMATE server time (is based on your local time setting)
// @include        http://goallineblitz.com/*
// ==/UserScript==

window.setTimeout( function() 
{
var timeTag = document.createElement('div');
timeTag.id='scriptServerTime';
timeTag.className = 'toolbar_item';

document.getElementById('toolbar').appendChild(timeTag);

var showTimeScript=document.createElement('script');
showTimeScript.type='text/javascript';
showTimeScript.innerHTML = 'function ShowTime(){var d = new Date(new Date().getTime() + ((new Date().getTimezoneOffset()*60000) - 21600000));var mins=d.getMinutes();mins=((mins < 10) ? "0" + mins : mins);var secs=d.getSeconds();secs=((secs < 10) ? "0" + secs : secs);document.getElementById("scriptServerTime").innerHTML="Approx. Server Time "+d.getHours()+":"+mins+":"+secs;};ShowTime(); setInterval("ShowTime()", 1000 );';

document.getElementsByTagName('head')[0].appendChild(showTimeScript);
});
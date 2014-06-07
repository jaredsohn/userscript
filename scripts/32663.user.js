// ==UserScript==
// @name           GLB Server Time 12
// @namespace      www.goallineblitz.com
// @description    Shows APPROXIMATE server time (is based on your local time setting) - 12 hour clock version
// @include        http://goallineblitz.com/*
// ==/UserScript==

window.setTimeout( function() 
{
var timeTag = document.createElement('div');
timeTag.id='scriptServerTime';
timeTag.className = 'toolbar_item';timeTag.onHover='';

document.getElementById('toolbar').appendChild(timeTag);

var showTimeScript=document.createElement('script');
showTimeScript.type='text/javascript';
showTimeScript.innerHTML = 'function ShowTime(){var d = new Date(new Date().getTime() + ((new Date().getTimezoneOffset()*60000) - 21600000));var hours=d.getHours();var ampm=((hours > 11) ? "pm" : "am");hours=((hours > 12) ? hours-12 : hours);var mins=d.getMinutes();mins=((mins < 10) ? "0" + mins : mins);var secs=d.getSeconds();secs=((secs < 10) ? "0" + secs : secs);document.getElementById("scriptServerTime").innerHTML="Approx. Server Time "+hours+":"+mins+":"+secs+" "+ampm;};ShowTime(); setInterval("ShowTime()", 1000 );';

document.getElementsByTagName('head')[0].appendChild(showTimeScript);
});
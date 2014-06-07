// ==UserScript==
// @name           GLB Clock
// @namespace      GLB
// @include        http://goallineblitz.com*
// ==/UserScript==

var header = document.getElementById('header')
var season = document.getElementById('season')
var currentTime = new Date ( );
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );
currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
currentHours = ( currentHours == 0 ) ? 12 : currentHours;
var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;
var utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
glbTime = new Date(utc + (3600000*-7));
var glbHours = glbTime.getHours ( );
var glbMinutes = glbTime.getMinutes ( );
var glbSeconds = glbTime.getSeconds ( );
glbMinutes = ( glbMinutes < 10 ? "0" : "" ) + glbMinutes;
glbSeconds = ( glbSeconds < 10 ? "0" : "" ) + glbSeconds;
var timeOfDay = ( glbHours < 12 ) ? "AM" : "PM";
glbHours = ( glbHours > 12 ) ? glbHours - 12 : glbHours;
glbHours = ( glbHours == 0 ) ? 12 : glbHours;
var glbTimeString = glbHours + ":" + glbMinutes + " " + timeOfDay;
var clock = document.createElement('div')
clock.setAttribute('style', 'float:right; color: white; font-size: 12px; font-weight: bold; font-family: arial;')
clock.innerHTML = 'Your time: ' + currentTimeString + '<br> GLB time: ' + glbTimeString;
header.appendChild(clock)
season.innerHTML = season.innerHTML + ', ' + glbTimeString
// ==UserScript==
// @name           Clock
// @namespace      
// @include        http://goallineblitz.com*
// ==/UserScript==

//To change server time to 12 hour remove "//" from the two lines: //serverHours.

var toolbar = document.getElementById('toolbar')
var currentTime = new Date ()
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );
currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
currentHours = ( currentHours == 0 ) ? 12 : currentHours;
var currentTimeString = currentHours + ":" + currentMinutes + " "+ timeOfDay; 
var utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
serverTime = new Date(utc + (3600000*-7));
var serverHours = serverTime.getHours ( );
var serverMinutes = serverTime.getMinutes ( );
var serverSeconds = serverTime.getSeconds ( );
serverMinutes = ( serverMinutes < 10 ? "0" : "" ) + serverMinutes;
serverSeconds = ( serverSeconds < 10 ? "0" : "" ) + serverSeconds;


//serverHours = ( serverHours > 12 ) ? serverHours - 12 : serverHours;
//serverHours = ( serverHours == 0 ) ? 12 : serverHours;

var timeOfDay = ( serverHours < 12 ) ? "AM" : "PM";
var serverTimeString = serverHours + ":" + serverMinutes + " "+ timeOfDay;
var clock = document.createElement('div')

clock.setAttribute('style', 'float:right; color: white; font-size: 10px; font-family: arial;')
clock.innerHTML = 'Cur:&nbsp; ' + currentTimeString + '&nbsp;'+ '<br>Ser:&nbsp;&nbsp;' + serverTimeString;
toolbar.appendChild(clock)



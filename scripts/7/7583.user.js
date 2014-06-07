// Made by Woofcat
// Thanks again to Yegs and irc.dal.net #javascript
// ==UserScript==
// @name            DNSstuff splash killer
// @namespace       www.dnsstuff.com
// @description     Remove huge splash page
// @include         http://www.dnsstuff.com/
// @include         http://dnsstuff.com/
// ==/UserScript== 
var splash = document.getElementById('right-col');
if (splash) {

    splash.parentNode.removeChild(splash);
}
var admiddle = document.getElementById('AdMiddle');
if (admiddle) {

    admiddle.parentNode.removeChild(admiddle);
}
var left = document.getElementById('left-col');
if (left) {

    left.parentNode.removeChild(left);
}
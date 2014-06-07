// ==UserScript==
// @name           Lord of Ages Farming Calculator
// @namespace      http://laughdonor.com/loa
// @description    Allows user to enter scouted information and determine minimum number of units to send to obtain full resources.
// @include        *.kongregate.com/games/LordOfAges/lord-of-ages*
// @include        *.lordofages.com/main.php*
// @include        *apps.facebook.com/lordofages*
// ==/UserScript==

var loacalc = document.createElement("iframe");
loacalc.style.width = "100%";
loacalc.style.border = "none";
loacalc.style.position = "fixed";
loacalc.style.bottom = "0";
loacalc.style.left = "0";
loacalc.style.zIndex = "100000";
loacalc.style.height = "100px";
loacalc.style.overflow = "hidden";
loacalc.name = '1.0'; //Version number of the Script
loacalc.setAttribute('id', 'iframe');
loacalc.setAttribute('src', 'http://laughdonor.com/loa/');
console.log( document.getElementById('play').id );
document.body.appendChild(loacalc);
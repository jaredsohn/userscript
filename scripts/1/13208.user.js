// CBC.ca: Remove Weather Box
// Version 0.1
// 2007-10-22
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CBC.ca Remove Weather Box
// @description   Remove the weather box from the header on cbc.ca.  Useful when you are blocking ads and you want to regain some of the real estate on the CBC site.
// @include       http://*cbc.ca/*
// ==/UserScript==


var weatherBox = document.getElementById('gn-adww');
if (weatherBox) {
    weatherBox.parentNode.removeChild(weatherBox);
}

var weatherBox = document.getElementById('gn-mycbc');
if (weatherBox) {
    weatherBox.parentNode.removeChild(weatherBox);
}

var weatherBox = document.getElementById('masthead-ad');
if (weatherBox) {
    weatherBox.parentNode.removeChild(weatherBox);
}




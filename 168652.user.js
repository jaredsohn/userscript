// ==UserScript==
// @grant metadata
// @name Datacom Cavas Shutter Upper Alpha
// @description Allows for Notifications and the silencing of Canvas calls waiting
// @version 1.5
// @include http://canvas.datacom.com.au/home/vic
// @include http://canvas.datacom.com.au/home/vicaccca
// @include http://canvas.datacom.com.au/home/vicah
// @include http://canvasuat.datacom.com.au/home/vic
// @include http://canvasuat.datacom.com.au/home/vicaccc
// @include http://canvasuat.datacom.com.au/home/vicah
// ==/UserScript==
//Requires https://addons.mozilla.org/en-us/firefox/addon/tab-notifier/
/****************************************************************************************
TODO 
    - Set users name to ignore popups

BUGS-
	Sometimes, the first 'call waiting will be blank due to canvas not updating fast enough

****************************************************************************************/

var a;
a = document.createElement("script");
a.setAttribute("src", "https://dl.dropboxusercontent.com/u/6969921/CanvasShh/canvasShh_Alpha.js");
document.head.appendChild(a);
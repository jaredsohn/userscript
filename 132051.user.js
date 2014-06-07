// ==UserScript==
// @name Facebook Loves It
// @description Replaces likes with loves on Facebook to accurately determine the amount of loving it one may experience.
// @namespace http://qoln.org/
// @include http://*.facebook.com/*
// @include http://*.facebook.com/*#*
// @exclude http://apps.facebook.com/*
// @exclude http://www.facebook.com/*viewas*
// @include https://*.facebook.com/*
// @include https://*.facebook.com/*#*
// @exclude https://apps.facebook.com/*
// @creator Miles Meloro [milemeloro@yahoo.com], with help from anon
// @version 0.1.11
// @date 2012-04-29
// ==/UserScript==

var loveItButton = document.createElement('button');
var loveItStyle = document.createElement('style');

loveItButton.id = 'loveItButton';
loveItButton.textContent = 'Love It';

loveItStyle.innerHTML = "#loveItButton { display: inline-block; font-size: 11px; color: rgb(128,128,128); background-color: rgb(255,255,255); border: 1px solid rgba(255,255,255,0.5); margin: 5px 6px 6px 6px; padding: 2px 6px 3px 6px; border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; -ms-border-radius: 3px; -o-border-radius: 6px; } #loveItButton:hover { color: rgb(0,0,0); background-color: rgba(255,255,255,0.75); border: 1px solid rgb(255,255,255); }";

loveItButton.addEventListener( 'click', function () {
	document.body.innerHTML =
	document.body.innerHTML.replace(/([lL])ike/g, '$1ove');
});

document.getElementById('jewelContainer').appendChild(loveItButton);
document.body.appendChild(loveItStyle);
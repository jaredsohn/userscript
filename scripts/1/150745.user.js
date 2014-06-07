// ==UserScript==
// @name        Google Pinkie and Jeffey
// @namespace   Equestria
// @description Replace google logo with Pinkie! (original Google RD by Tracerneo: http://userscripts.org/scripts/show/123147)
// @include     google.*/*
// @include     *.google.*/*
// @include     http*://google.*/*
// @include     http*://*.google.*/
// @version     1
// ==/UserScript==

document.getElementById('lga').innerHTML = '<img width="800" height="360" style="padding-top: 10px" src="http://dl.dropbox.com/u/85356643/New%20logo.png" id="hplogo" alt="Google">';
document.getElementById('logocont').innerHTML = '<div style="margin-top: -20px; margin-left: -30px;"><img width="200" height="90" style="padding-top: 10px" src="http://dl.dropbox.com/u/85356643/New%20logo.png" alt="Google"></div>';
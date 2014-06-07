// ==UserScript==
// @name           Google Fluttershy
// @namespace      Equestria
// @description    Replace google logo with Fluttershy! (original Google RD by Tracerneo: http://userscripts.org/scripts/show/123147)
// @include       google.*/*
// @include       *.google.*/*
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// ==/UserScript==

document.getElementById('lga').innerHTML = '<img width="800" height="360" style="padding-top: 10px" src="http://dl.dropbox.com/u/63705480/GreaseMonkey/flutterlogo-800px.png" id="hplogo" alt="Google">';
document.getElementById('logocont').innerHTML = '<div style="margin-top: -20px; margin-left: -30px;"><img width="200" height="90" style="padding-top: 10px" src="http://dl.dropbox.com/u/63705480/GreaseMonkey/flutterlogo-200px.png" alt="Google"></div>';


// ==UserScript==
// @name           Google Twilight Sparkle
// @namespace      Equestria
// @description    Replace google logo with Twilight Sparkle! (original Google RD by Tracerneo: http://userscripts.org/scripts/show/123147)
// @include       google.*/*
// @include       *.google.*/*
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// ==/UserScript==

document.getElementById('lga').innerHTML = '<img width="800" height="360" style="padding-top: 10px" src="https://dl.dropbox.com/u/85356643/McHoofin%20google%20logo.jpg" id="hplogo" alt="Google">';
document.getElementById('logocont').innerHTML = '<div style="margin-top: -20px; margin-left: -30px;"><img width="200" height="90" style="padding-top: 10px" src="https://dl.dropbox.com/u/85356643/McHoofin%20google%20logo.jpg" alt="Google"></div>';


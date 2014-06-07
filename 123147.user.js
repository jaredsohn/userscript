// ==UserScript==
// @name           Google Rainbow Dash
// @namespace      Equestria
// @description    Podmienia logo Google na wersję z RD.
// @include       google.*/*
// @include       *.google.*/*
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// ==/UserScript==

document.getElementById('lga').innerHTML = '<img width="800" height="360" style="padding-top: 10px" src="http://dl.dropbox.com/u/16696755/Greasemonkey/Google%20Rainbow%20Dash/logo-800px.png" id="hplogo" alt="Google">';
document.getElementById('logocont').innerHTML = '<div style="margin-top: -20px; margin-left: -30px;"><img width="200" height="90" style="padding-top: 10px" src="http://dl.dropbox.com/u/16696755/Greasemonkey/Google%20Rainbow%20Dash/logo-200px.png" alt="Google"></div>';

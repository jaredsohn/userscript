// ==UserScript==
// @name          Yahoo!360 Adremover
// @description   Yahoo!360 Adremover
// @include       http://*360.yahoo.com/*
// @include       http://*mail.yahoo.com/*
// ==/UserScript==

if(document.getElementById('ymgl-north-wrapper'))
    document.getElementById('ymgl-north-wrapper').innerHTML = '';

if(document.getElementById('northbanner'))
    document.getElementById('northbanner').innerHTML = '';

if(document.getElementById('north_ad'))
    document.getElementById('north_ad').innerHTML = '';
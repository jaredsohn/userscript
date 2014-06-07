// ==UserScript==
// @name        ddizi
// @namespace   ddizi_reklam_gec
// @include     http://ddizi.org/*
// @include     http://www.ddizi.org/*
// @version     1
// @grant       none
// ==/UserScript==
// nilux , 2014-01-19


var div = document.getElementById("reklami");
var   reklam = div.querySelector("div a");    


var clickEvent = document.createEvent ('MouseEvents');
clickEvent.initEvent ('click', true, true);
reklam.dispatchEvent (clickEvent);

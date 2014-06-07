// ==UserScript==
// @name                Waze Alexa Booster
// @namespace           http://www.limonblog.com/
// @description         Alexa rank booster for webpages
// @version             1.0
// @include             http://*
// ==/UserScript==

var url = prompt("Website URL: ", "http://limonblog.com/");
var interval = prompt("Interval: ", "15000");
setInterval("window.location='" + url + "';", interval);
// ==UserScript==
// @name Google Search Page Results Cleaner
// @namespace http://vivi-web.blogspot.com
// @description This script remove the sponsored banners for google search results.
// @include http://www.google.*
// ==/UserScript==
//
// author:  Steve Van
// version: 1.0.0 


var spl = document.getElementById("spl");
if (spl) spl.parentNode.removeChild(spl);
var tpa1 = document.getElementById("tpa1");
if (tpa1) tpa1.parentNode.removeChild(tpa1);
var tpa2 = document.getElementById("tpa2");
if (tpa2) tpa2.parentNode.removeChild(tpa2);
var mbEnd = document.getElementById("mbEnd");
if (mbEnd) mbEnd.parentNode.removeChild(mbEnd);

// ==UserScript==
// @name yesh removes links
// @namespace http://www.yahoo.com
// @description yesh removes unwanted adds which u dont see !
// @include http://www.google.*
// ==/UserScript==
//
// author:  M.Yehswanth Nag
// for ASTRA,world 


var spl = document.getElementById("spl");
if (spl) spl.parentNode.removeChild(spl);
var tpa1 = document.getElementById("tpa1");
if (tpa1) tpa1.parentNode.removeChild(tpa1);
var tpa2 = document.getElementById("tpa2");
if (tpa2) tpa2.parentNode.removeChild(tpa2);
var mbEnd = document.getElementById("mbEnd");
if (mbEnd) mbEnd.parentNode.removeChild(mbEnd);

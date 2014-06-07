// ==UserScript==
// @name           Ikariam Easy-Login
// @description    Ikariam Easy-Login
// @include        http://*.ikariam.*/
// @exclude        http://*.ikariam.*/index.php*
// @exclude        http://board.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// @exclude        http://support.ikariam.*/*

// ==/UserScript==

document.getElementById("loginWrapper").style.display="block";

var URL = location.href;

var ParseURL = URL.split('?');
var sX = ParseURL[ParseURL.length-1];
var serverUrl = URL.replace("http://","");
var parseURL2 = "/?"+sX;
serverUrl = sX + "." + serverUrl;
serverUrl = serverUrl.replace(parseURL2,"");
document.getElementById("logServer").value = serverUrl;




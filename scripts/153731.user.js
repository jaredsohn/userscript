// ==UserScript==
// @name        Changes YouTube home to subscriptions
// @namespace   http://userscripts.org
// @description Changes YT home to subscriptions and edits other improvements
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.1
// ==/UserScript==
/*! ####################
=====made by caleom=====
######################*/

//create variables
var logo = document.getElementById("logo-container")

logo.href="http://www.youtube.com/feed/subscriptions/u";
document.body.style.background = "#D4D4D4 url('http://subtlepatterns.subtlepatterns.netdna-cdn.com/patterns/cream_dust.png') repeat";


//detects you are on the what to watch page and redirects you
if (window.location.href == "http://www.youtube.com/") {
	window.location = "http://www.youtube.com/feed/subscriptions/u";
}

if (window.location.href == "https://www.youtube.com/") {
	window.location = "http://www.youtube.com/feed/subscriptions/u";
}


// ==UserScript==
// @name        What's New Default Posts
// @namespace   Tao
// @description Change URL of "What's New?" Button
// @include     http://bleachasylum.com/*
// @version     1
// ==/UserScript==

var newURL = "http://bleachasylum.com/search.php?do=getnew&contenttype=vBForum_Post"; // Input URL Here That you want the link to direct you to
var whatsNew = document.getElementsByClassName("navtab")[1];
whatsNew.href = newURL;
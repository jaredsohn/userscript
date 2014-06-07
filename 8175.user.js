// ==UserScript==
// @name           Userscripts Source Highlighter
// @namespace      http://codr.us
// @description    Provides a link to a syntax highlighted version of the script
// @include        http://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/show/*
// ==/UserScript==

var s = window.location.href.split("/");
var url = 'http://codr.us/userscripts.php?id=' + s[5];
var n = document.getElementsByTagName('ul');
var h6 = document.getElementsByTagName('h6');

/* Thanks to znerp for the bug fix */
if ((h6.length > 3) && (h6[h6.length - 4].innerHTML == "Admin for script")) {
n[n.length - 2].innerHTML += '<li><a href="'+url+'">View highlighted script source</a></li>';
} else {
n[n.length - 1].innerHTML += '<li><a href="'+url+'">View highlighted script source</a></li>';
}
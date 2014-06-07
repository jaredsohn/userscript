// ==UserScript==
// @name        h16free.com show comment time
// @namespace   fwh.h16free
// @description Show comments' time in h16free.com
// @include     http://h16free.com/*
// @version     1
// ==/UserScript==

var links = document.getElementsByClassName("comment-permalink");
var times = document.getElementsByClassName("comment-time");

for (var i = 0; i < links.length; i++)
{
	times[i].innerHTML += ' ' + links[i].title;
}

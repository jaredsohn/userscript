// ==UserScript==
// @name YouTube "USER_HERE" Skip Intro
// @description Skips the first seconds/minutes intro of any "USER_HERE" videos.
// @description Just change the exclude, and variables for it to work for you.
// @version 1.1
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @include https://www.youtube.com/watch*
// @exclude http://www.youtube.com/*&t=0m10s*
// @exclude https://www.youtube.com/*&t=0m10s*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @author Arnold123
// ==/UserScript==
var theurl = document.URL;
var ytuser = $.trim($("a[href$='/user/USER_HERE?feature=watch']").text());
//console.log(ytuser);
var vicuser ="USER_HERE";
if(ytuser == vicuser) {
	window.location.href = (theurl + "&t=0m10s");
}
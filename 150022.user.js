// ==UserScript==
// @name       Dont wait for 20secs #3
// @namespace  http://ahaverty.com
// @version    0.1
// @description  meh meh
// @match      http://www.video2mp3.net/view/YouTube/*
// @copyright  2012+, You
// ==/UserScript==


var str = window.location.href;
str = str.replace("/view/", "/load/");

window.location.href = str;
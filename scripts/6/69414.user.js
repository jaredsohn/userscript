// ==UserScript==
// @name           youtube.com
// @namespace      Youtube Full HD
// @description    all the best resolution videos or Full HD, clean link
// @include        http://*.youtube.com/*
// ==/UserScript==

var link = document.getElementsByName('video_link')[0].value; 
var mod = "&hd=1"
var flink = link+mod;
var lcheck = location.href;
if(lcheck != flink){window.location = flink;}

// ==UserScript==
// @name		Video2Mp3 Quick Switcher
// @description		switches to the download, so no waiting 20 secs
// @include		*video2mp3.net/view/YouTube/*
// ==/UserScript==

function jSwitchin(){
curUrl = document.location.href.split("YouTube/");
		 document.location = 'http://www.video2mp3.net/load/YouTube/'+curUrl[1];
}
window.onload = jSwitchin();

// ==UserScript==
// @name        New YouTube Centered
// @namespace   ytCentered
// @description Switched to the new YouTube layout but didn't like it all the way in the left? This script centers it.
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.5
// ==/UserScript==
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss('.exp-new-site-width #page {margin: 0 auto !important;}');
var video = document.getElementById("watch7-video");
var main = document.getElementById("watch7-main");
video.setAttribute("style", "margin: 0px auto !important; padding-right: 300px !important;");
main.setAttribute("style", "margin: 0px auto !important; padding-right: 300px !important;");
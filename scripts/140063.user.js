// ==UserScript==
// @description Trying to fix the link colors on FFn
// @include http://www.fanfiction.net/*
// @name FFn Fix
// ==/UserScript==



function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) {return;}
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

addCss (
	'a:visited { color: #800080 ; }' // obviously you can change the colour to your liking
);
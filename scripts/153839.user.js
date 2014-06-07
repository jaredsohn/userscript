// ==UserScript==
// @name        Gmail Adblock
// @namespace   gmailAd
// @description Removes the tagline adverts around the email lists
// @include     https://mail.google.com/*
// @version     1
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss('.mq {display: none;}');
addCss('.UJ {margin-top: 6px;}');
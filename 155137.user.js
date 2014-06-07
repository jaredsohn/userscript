// ==UserScript==
// @name        Change YouTube Logo
// @author       Frank.Barry
// @namespace   http://www.appnuke.com
// @version     1.0
// @description Change YouTube Logo
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*

// ==/UserScript==

function rm(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
document.getElementById('logo').id = 'logox';
document.getElementById("logox").src = "PLACE YOU IMAGE LOCATION HERE";

rm('#logo{display:none;}.content-region{display:none;}');
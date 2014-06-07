// ==UserScript==
// @name        Test Script
// @namespace   http://localhost
// @description Liberation Sans font replace
// @include     http://what.cd/*
// @include     https://what.cd/*
// @include     http://*.what.cd/*
// @include     https://*.what.cd/*
// @version     1
// @grant       none
// ==/UserScript==
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (!head) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss (
	'* { font-family: "Liberation Sans" ! important; }'
);
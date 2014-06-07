// ==UserScript==
// @name       MCF Css Fix
// @namespace  http://syfaro.net
// @version    1.0
// @description  MCF Css fix
// @match      http://www.minecraftforum.net/*
// @copyright  2012+
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

addCss (
	'.title { background-image: none !important; }'
);
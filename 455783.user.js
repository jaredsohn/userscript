// ==UserScript==
// @name Old design of Zefirchik
// @namespace zefirchik
// @description Заменяет смайлик зефирчика на старый
// @version 1.0.0
// @include http://vk.com*
// @include https://vk.com*
// @author Ilya Gorohov
// ==/UserScript==

function addCss(cssString) { 
var head = document.getElementsByTagName('head')[0]; 
if (head) {
	var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
}
} 


if (/vk.com/.test(window.location.href)) {
addCss ( 
'.emoji_css { background-image: url("http://i.imgur.com/XMOlFw2.png") ! important; }' 
);
}
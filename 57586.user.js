// ==UserScript==
// @name f-1.lt without ads
// @description Removes ads from f-1.lt website.
// @include        http://*f-1.lt/*
// ==/UserScript==

window.addEventListener("load", function(e) {
	var styles = document.createElement('style');
	styles.innerHTML = 'body center div div:first-child, #container div:first-child, #rightcontent div:last-child, #leftcontent div:nth-child(3) { display: none !important; } ';
	document.getElementsByTagName("body")[0].appendChild(styles);
}, false);
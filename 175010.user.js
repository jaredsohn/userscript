// ==UserScript==
// @name        Remove Blue From Reddit Favicon
// @namespace   http://localhost
// @include     http*://www.reddit.com/*
// @version     1
// ==/UserScript==

(function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'shortcut icon');
	link.setAttribute('href', 'http://i.imgur.com/t5151HE.png');
	link.setAttribute('height', '16px');
	link.setAttribute('width', '16px');
	var head = document.getElementsByTagName('head')[0]; 
	head.appendChild(link);
})();
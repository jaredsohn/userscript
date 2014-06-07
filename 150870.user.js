// ==UserScript==
// @name        Tweetdeck Width Resizing
// @namespace   http://www.desmonding.com
// @description Automatically resize the column width in tweetdeck
// @include     https://web.tweetdeck.com/
// @version     1
// @grant       none
// ==/UserScript==


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.column { width:30% ! important;}');
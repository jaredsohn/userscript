// ==UserScript==
// @name           PushOff
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Hides the annoying picture of the bloke doing press ups on twitpic
// @include        http://twitpic.com/*
// ==/UserScript==
(function() {
	// adds the CSS rules contained in css to
	// the head of the current document
	addStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	addStyle('a[href="http://www.twitfitter.com/"] { position:absolute; display:block; top:-9999px;');
})();
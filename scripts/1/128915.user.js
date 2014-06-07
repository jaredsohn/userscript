// ==UserScript==
// @name           Restore Downvote Arrows
// @namespace      c3Zwcnj85t
// @description    Restores all arrows for those annoying sub-reddits that insist on having them hidden.
// @lastupdated    2012-06-24
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 10.0
// @include        http://reddit.com/r/*
// @include        http://www.reddit.com/r/*
// @include        https://pay.reddit.com/r/*
// ==/UserScript==

// addGlobalStyle borrowed from http://diveintogreasemonkey.org/ - Thanks Mark
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.arrow.down { display: block !important; visibility: visible !important; }');
addGlobalStyle('.arrow.downmod { display: block !important; visibility: visible !important; }');
addGlobalStyle('.arrow.up { display: block !important; visibility: visible !important; }');
addGlobalStyle('.arrow.upmod { display: block !important; visibility: visible !important; }');

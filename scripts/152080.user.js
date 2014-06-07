// ==UserScript==
// @name           Remove 'Give Gold'
// @namespace      1NDejBoAla
// @description    Removes the annoying 'give gold' links under comments on Reddit.
// @lastupdated    2013-07-22
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 15.0.1
// @include        http://www.reddit.com/r/*
// @include        http://www.reddit.com/user/*
// @include        http://np.reddit.com/r/*
// @include        http://np.reddit.com/user/*
// @include        https://pay.reddit.com/r/*
// @include        https://pay.reddit.com/user/*
// ==/UserScript==

// Borrowed from http://diveintogreasemonkey.org/ - Thanks Mark
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('a.give-gold {display:none}');

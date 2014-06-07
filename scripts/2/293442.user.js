// ==UserScript==
// @name        Disable Bing Translator on Twitter
// @namespace   http://userscripts.org/users/sknepal
// @description Hides "view translation" link as well as the translation on Twitter.
// @include        http://*.twitter.com/*
// @include        http://twitter.com/*
// @include        https://*.twitter.com/*
// @include        https://twitter.com/*
// @grant       none
// @version     1.0
// @downloadURL http://userscripts.org/scripts/source/293442.user.js
// @updateURL   http://userscripts.org/scripts/source/293442.meta.js
// ==/UserScript==

/* CHANGE LOG

1.0 (01/27/2014) : created.

*/

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('.btn-link.js-translate-tweet  { display: none !important; }');
addStyle('.tweet-translation { display: none !important;}' );
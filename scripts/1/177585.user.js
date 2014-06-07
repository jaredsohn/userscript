// ==UserScript==
// @name       Hide Recommendations & Books on Google Play (in 1 word hides 'sex')
// @include    https://play.google.com/store*
// @description As Google Play becomes a sex-shop bookstore, this script hides recommendations & books on Google Play homepage ; in one word, this script hides 'sex' on Google Play.
// @version 0.1
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

addGlobalStyle('div.cluster-container div.books {display:none;}');
addGlobalStyle('div.cluster-container div.multi-corpus-short {display:none;}');
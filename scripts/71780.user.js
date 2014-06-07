// ==UserScript==
// @name           LAST.FM Color Visited Links
// @namespace      http://userscripts.org/users/121410
// @description    LAST.FM Color Visited Links with grey
// @include        http://www.last.fm*
// @include        http://www.lastfm.*
// @include        http://cn.last.fm*
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.innerHTML = css;
    } catch(err) {
        style.innerText = css;
    }
    head.appendChild(style);
}

addStyle('#content a:visited {color: #7b7b7b !important}');
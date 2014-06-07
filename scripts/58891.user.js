// ==UserScript==
// @name           grooveshark No Ads
// @namespace      http://userscripts.org/users/93595
// @description    Makes grooveshark fullscreen.
// @include        http://listen.grooveshark.com/
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

addGlobalStyle('#adBar { width: 0 ! important; }');
addGlobalStyle('#mainContentWrapper { margin-right: 0 ! important; }');
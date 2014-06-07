// ==UserScript==
// @name           SJ Visited Links
// @namespace      SJ
// @description    Markiert die Links der bereits gesehenen Folgen
// @include        http://serienjunkies.org*
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

addGlobalStyle('div.post-content p a:visited {color:blue !important;}');


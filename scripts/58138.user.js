// ==UserScript==
// @name           Remove Google Width Limitation
// @namespace      http://userscripts.org/users/109171
// @description    Remove width limitations of Google Search
// @include        http://www.google.tld/webhp?*
// @include        http://www.google.tld/search?*
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

addGlobalStyle('#cnt { max-width:800em ! important; }');
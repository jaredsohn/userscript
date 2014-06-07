// ==UserScript==
// @name           LM visited
// @namespace      http://userscripts.org/users/65879
// @description    change link color if already visited
// @include        http://www.linkomanija.net/browse.php*
// @include        http://linkomanija.net/browse.php*
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

addGlobalStyle('#content a:link { color:#24486C !important; } #content a:visited { color:#84888C !important; }');
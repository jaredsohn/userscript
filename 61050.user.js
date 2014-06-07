// ==UserScript==
// @name           Crymod 900px
// @namespace      http://userscripts.org/users/ins
// @include        http://crymod.com/thread.php?*
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
document.getElementsByTagName("table")[0].childNodes[1].firstChild.childNodes[1].childNodes[8].id ="resizemeplease";

addGlobalStyle('#resizemeplease { width: 900px; }');
// ==UserScript==
// @name           Yahoosearch
// @namespace      yahoo search redesign
// @description    Makes the yahoo searchresults more like google
// @version	0.01
// @include        http://*search.yahoo.com*
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    head.appendChild(style);
}

addGlobalStyle("#doc { width: 100% !important; }");
addGlobalStyle("#doc { margin: 0 !important; }");
addGlobalStyle("#results { margin-left: 0 !important; }");



var sideBar= document.getElementById('sidebar');
if (sideBar) {
    sideBar.parentNode.removeChild(sideBar);
}
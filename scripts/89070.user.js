// ==UserScript==
// @name           Trukz CB Radio & Maps
// @namespace      http://userscripts.org/users/241878
// @include        http://trukz.com/route_map.asp*
// @include        http://trukz.com/cb_radio.asp
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

addGlobalStyle('#scroll3 { height: 456px !important; }');
addGlobalStyle('#map{width:600px; height:350px;}');
// ==UserScript==
// @name           osu! Quote Fix
// @namespace      http://userscripts.org/users/loginer
// @description    Adds borders to the quote boxes.
// @include        http://osu.ppy.sh/forum/*
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

addGlobalStyle(
'.quotecontent {'+
'	border: 1px;'+
'	border-style: solid;'+
'}');
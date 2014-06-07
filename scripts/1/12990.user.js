// ==UserScript==
// @name           Giga @ center (extended)
// @namespace      http://www.dalthed.com/giga-centerer
// @description    Dieses Script setzt GIGA.de in die mitte um es leichter bedienen zu lassen. Die Extended Edition beeinflusst NICHT den Textfluss
// @include        http://*.giga.de/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { alert('error');return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#G07 { position:relative;left:50%;margin-left:-410px;width:820px;background-repeat:repeat-x;}');
addGlobalStyle('#G07_2 { position:relative;left:50%;margin-left:-410px;width:820px; }');
addGlobalStyle('.urlbar { display:none; }');
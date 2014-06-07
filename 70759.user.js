// ==UserScript==
// @name           Wykop.pl - białe tło
// @namespace      wykop.pl
// @description    Wyłącza graficzne tło na wykop.pl
// @include        http://*.wykop.pl/*
// @include        http://wykop.pl/*
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


addGlobalStyle('body { background: #FFF !important; }');
addGlobalStyle('.illustration { background: #FFF !important; }');
addGlobalStyle('#content { padding-left: 0 !important; width: 640px !important; }');
addGlobalStyle('#sidebar { padding-right: 0 !important; }');

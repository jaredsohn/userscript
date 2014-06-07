// ==UserScript==
// @name          Minify Google Reader
// @namespace      StevesStuff
// @description    Delete the search item in Reader, and use smaller fonts
// @include        http://www.google.com/reader/*
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

addGlobalStyle('#logo-container { height: 1px; ! important;}');
addGlobalStyle('#logo { display: none; ! important;}');
addGlobalStyle('#search { display: none ! important; }');
addGlobalStyle('#gbar, #guser, #global-info { font-size:10px; ! important; }');
addGlobalStyle('#entry { font-size:11px; ! important; }');
addGlobalStyle('body { font-size:80%; ! important; }');
addGlobalStyle('.entry .entry-title { font-size: 110%; ! important; }');
// ==UserScript==
// @name          Archwiki Floating Toc
// @include       http://wiki.archlinux.org/index.php/*
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

addGlobalStyle('#toc { position: fixed; }');

toc = document.getElementById('toc');
col = document.getElementById('column-one');
nav = document.getElementById('p-navigation');
col.insertBefore(toc, nav);

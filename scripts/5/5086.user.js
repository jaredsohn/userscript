// ==UserScript==
// @name          Last.fm to old-style
// @version       0.1
// @description	  Removes journals and album art and expands artist bio and tags instead
// @include       http://www.last.fm/music/*
// @exclude	  http://www.last.fm/music/*/*
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

addGlobalStyle('.crightCol {  ! important;  visibility: hidden; }');
addGlobalStyle('.cleftCol { width: 100% ! important; height: 10px ! important }');

GM_log('this line is always printed2');
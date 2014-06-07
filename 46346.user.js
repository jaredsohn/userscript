// ==UserScript==
// @name           Wikipedia with Light Colors
// @namespace      www.wikipedia.com
// @description    Changes the background of Wikipedia articles to read long pages of Wiki on CRT/LCT monitors.
// @include        http://en.wikipedia.org/wiki/*
// @exclude	   http://en.wikipedia.org/wiki/Main_Page
// @exclude	   http://en.wikipedia.org/wiki/*:*
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

addGlobalStyle('#bodyContent {background: GREY none repeat scroll 0 0 !important}');

addGlobalStyle('#bodyContent table {background: GREY none repeat scroll 0 0 !important}');

addGlobalStyle('#bodyContent .catlinks {background: GREY none repeat scroll 0 0 !important}');

addGlobalStyle('#bodyContent {color: white !important}');

addGlobalStyle('#bodyContent a {color: yellow}');

addGlobalStyle('.navbox a {color: blue !important}');

addGlobalStyle('#bodyContent #toc {background: black !important}');

addGlobalStyle('#bodyContent #toc h2 {color: white !important}');

//addGlobalStyle('.pBody {background: black !important}');

//addGlobalStyle('#p-cactions li {background: black !important}');

//addGlobalStyle('.ns-0 #p-cactions li a:hover, .ns-0 #p-cactions li a { background: black !important }');

//addGlobalStyle('.navbox-even, .navbox-odd { background: grey !important }');


// ==UserScript==
// @name	Slashdot Lite: Colorize Visited Links
// @namespace	http://oolong.com/software/greasemonkey
// @description	Changes the color for visited links in Slashdot's "Lite" mode from black to violet
// @include	http://*.slashdot.org/*
// @include	http://slashdot.org/*
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

addGlobalStyle('a:visited { color: rgb( 120, 0, 120 ) ! important; }');
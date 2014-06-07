// ==UserScript==
// @name           Xbox Forum Fix
// @namespace      http://userscripts.org/
// @description    Fixes forum width
// @include        http://forums.xbox.com/*
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

addGlobalStyle('.container {margin: 0 auto;width: 760px!important;}');
addGlobalStyle('div#bodycolumn {background-image:url("http://209.85.62.24/326/148/0/p371641/bodycolumn.png")!important;}');
addGlobalStyle('a.lnk3:visited {color:#a49d7e!important;}');
addGlobalStyle('div#ShellNavigationBar ul.NavigationElements li a {padding: 0 10px!important;}');




// ==UserScript==
// @name           hacknoblack
// @namespace      http://www.pureandapplied.com.au/greasemonkey/hacknoblack
// @include        http://hackaday.com/*
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

addGlobalStyle('body { background-color:whiteSmoke; color:black');

addGlobalStyle('.entry,.statsclass1 { background-color:lightGray; color:black');
addGlobalStyle('.entry,.statsclass2 { background-color:silver; color:black');
addGlobalStyle('a {color:DarkSlateGray');
addGlobalStyle('h3 {color:black');



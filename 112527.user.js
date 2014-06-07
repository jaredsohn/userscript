// ==UserScript==
// @name	iGoogleBackGround
// @namespace	http://www.unclefight.com/
// @description Change le fond de iGoogle
// @version	0.1
// @include	http://www.google.com/ig*
// ==/UserScript==

// Change backgroud color here / Changer le fond ici
color="#F0F8FF";

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.G-JS { background-color:'+color+'; ! important; }');
addGlobalStyle('td.kdSidebarHolder { background-color:'+color+'; ! important; }');

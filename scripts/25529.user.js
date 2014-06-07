// ==UserScript==
// @version        1.0
// @name           BBBA 2008 Forum Tweaks
// @author         bonneh 	
// @namespace      com.behindbigbrother.forum.greasemonkey.userscript
// @description    Tweaks for BBBA 2008 Forums
// @include        http://forum.behindbigbrother.com/*
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

addGlobalStyle('td, th, p, li { line-height: 1.0 ! important; }');
addGlobalStyle('#page{ overflow: visible !important; }');
addGlobalStyle('.page{ overflow: visible !important; }');
addGlobalStyle('.bigusername { font-size: 13pt !important; line-height: 1.0 !important; }');

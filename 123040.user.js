// ==UserScript==
// @name           grcade flip undo
// @namespace      http://userscripts.org/users/430206
// @description    fix for dumb joke
// @include        *grcade.com*
// @include        grcade.com

// ==/UserScript==

var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode('html body { -moz-transform: none !important; -webkit-transform: none !important; }');

style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);

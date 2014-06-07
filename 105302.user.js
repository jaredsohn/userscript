// ==UserScript==
// @name           Debian Manual Formater
// @namespace      loke
// @include        http://www.debian.org/doc/manuals/*
// ==/UserScript==
var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(
        'body { padding: 50px; margin: 0 50px; font-size: 15px; font-family: Arial, sans-serif; border: 1px solid gray; }' +
        'h1 { font-size: 1.1em; color: #007CA5; }' + 
        'h2 { font-size: 1em; color: #007CA5; }' + 
        'h3 { font-size: 0.9em; color: #007CA5; }' + 
        'p { font-size: 0.85em; line-height: 1.4em; }' +
        'pre { font-size: 0.85em }'
    );

style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);

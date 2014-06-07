// ==UserScript==
// @name           4chan sopa blackout fix
// @namespace      http://userscripts.org/users/430206
// @include        *4chan.org*
// ==/UserScript==
var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode('.spoiler {background: 0 !important; color: black !important; }');

style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);

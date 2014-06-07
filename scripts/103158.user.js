// ==UserScript==
// @name           Skip bre.ad interstitials
// @namespace      http://userscripts.org/users/33837
// @description    Skip over the bre.ad interstitials
// @include        http://bre.ad/*
// ==/UserScript==

/* 
Skip bre.ad interstitials
(c) 2011 Jon Randy
*/

var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode('body { display:none !important; }');

style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);

var loc = document.getElementById('continue').href;
location.href = loc;

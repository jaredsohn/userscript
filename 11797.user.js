// ==UserScript==
// @name           Wikipedia Link Colors
// @namespace      http://www.pstoever.de
// @description    Distinct colors for normal and visited links
// @include        http://*.wikipedia.org/*
// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "a{color:blue;} a:visited{color:lightblue;}";
head.appendChild(style);

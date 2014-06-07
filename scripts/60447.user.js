// ==UserScript==
// @name           Okayplayer Back to Black
// @namespace      http://www.okayplayer.com
// @description    Distinct colors for normal and visited links
// @include        http://board.okayplayer.com/*
// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = "a{color:black;} a:visited{color:gray;}";
head.appendChild(style);

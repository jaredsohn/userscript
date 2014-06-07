// ==UserScript==
// @name           The Daily WTF reply button hider
// @namespace      http://jenpollock.ca
// @description    Hides the "Reply" button, because I keep clicking it when I mean to click "Quote"
// @include        http://thedailywtf.com/Comments/*
// ==/UserScript==
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = ".CommentButtons A:first-child {display: none;}";
head.appendChild(style);

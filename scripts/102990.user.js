// ==UserScript==
// @name        Less Wrong karma fix
// @namespace   http://www.mccaughan.org.uk/g/
// @description Make LW karma display more readably
// @version     0.11
// @include     http://lesswrong.com/*
// ==/UserScript==

var ss = document.styleSheets[0]; // main.css
ss.insertRule('#side-status div.userinfo span.score { background: #538d4d; width: 44px; }', ss.cssRules.length);

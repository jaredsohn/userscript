// ==UserScript==
// @name        Enable Focus (by Darknit)
// @namespace   http://userscripts.org:8080/users/670670
// @include     http://www.YOURSITE.com/*
// @version     1
// @run-at   document-start
// @grant       none
// ==/UserScript==
setInterval(function() { window.focus() }, 1000)
document.hasFocus = function () {return true;};


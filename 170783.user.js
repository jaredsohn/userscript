// ==UserScript==
// @name Cat image width limiter
// @version 1.01
// @namespace http://www.justmyimagination.com
// @description Limits image width on Catblogs to 100% of post width
// @include http://user.adme.in/blog/browse/u/*
// @copyright © JustMyImagination 2013
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.review img { max-width: 100%; } ';
headID.appendChild(cssNode);
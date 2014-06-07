// ==UserScript==
// @name           Dynamic Favicons
// @namespace      
// @description    A javascript library for dynamically controlling favicons.
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      Simpsons225 & Michael Mahemoff
// @version        1.0
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'http://www.ajaxify.com/run/favicon/scroll/favicon.js';
headID.appendChild(newScript);
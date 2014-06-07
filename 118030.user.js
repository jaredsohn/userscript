// ==UserScript==
// @name   Alert Test 
// @namespace  http://userscripts.org/
// @description Test alert box
// ==/UserScript==

var URL = window.location.protocol + "://" + window.location.host + window.location.pathname;

alert(URL);
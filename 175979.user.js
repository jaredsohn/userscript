// ==UserScript==
// @name       TheDissolve top bar blocker
// @version    1.0
// @namespace  http://www.google.com
// @description  Block the top bar on thedissolve.com
// @match      http://*.thedissolve.com/*
// @copyright  2013+, Howard Moon
// ==/UserScript==

var elmDeleted = document.getElementById("locking-header");
	elmDeleted.parentNode.removeChild(elmDeleted);
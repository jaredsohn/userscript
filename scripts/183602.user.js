// ==UserScript==
// @name       The AV Club top bar blocker
// @version    1.0
// @description  Block the top bar on avclub.com
// @match      http://*.avclub.com/*
// @copyright  2013+, Howard Moon
// ==/UserScript==


var elmDeleted = document.getElementsByClassName("header-container").item(0);
	elmDeleted.parentNode.removeChild(elmDeleted);
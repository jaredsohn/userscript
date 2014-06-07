// ==UserScript==
// @name           Gigapedia.com: Hide "Dear Adblock User" Message
// @namespace      userscripts.org
// @description    hide the message that admonishes Adblock users
// @include        http://gigapedia.com/*
// @include        http://*.gigapedia.com/*
// ==/UserScript==

var elmDeleted = document.getElementById("banner");
elmDeleted.parentNode.removeChild(elmDeleted);

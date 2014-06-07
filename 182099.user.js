// ==UserScript==
// @name           yahoo ad remove
// @namespace      yasingedik
// @include        *.mail.yahoo.com/neo/*
// @downloadURL	   https://userscripts.org/scripts/source/182099.user.js
// @updateURL	   https://userscripts.org/scripts/source/182099.meta.js
// @version        1.0
// @run-at         document-end
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle("#main {max-width: 100% !important; #shellcontent { right: 0px !important; } ");
GM_addStyle(".wide-right-rail #shellcontent { right: 0px !important; } ");
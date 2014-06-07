// ==UserScript==
// @name Facebook De-ticker-er
// @version 1.3
// @description Removes the ticker from the Facebook chat sidebar.
// @match *://*.facebook.com/*
// @updateURL http://userscripts.org/scripts/source/119518.meta.js
// @downloadURL https://userscripts.org/scripts/source/119518.user.js
// ==/UserScript==

GM_addStyle(".fbSidebarGripper, #pagelet_ticker {display: none !important;}");

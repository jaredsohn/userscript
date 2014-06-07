// ==UserScript==
// @name           Replace Chrome New Tab
// @version        1.1
// @namespace      replacechromenewtab
// @run-at         document-start
// @grant          GM_openInTab
// @match          https://www.google.com/_/chrome/newtab*
// ==/UserScript==

GM_openInTab("chrome://apps/");
window.close();
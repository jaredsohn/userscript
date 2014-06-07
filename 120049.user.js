// ==UserScript==
// @name Facebook De-ticker-er Beta by Faridzhuan Firdaus
// @version 1.2
// @description Removes the ticker from the Facebook chat sidebar.
// @match *://*.facebook.com/*
// ==/UserScript==

var sheet = document.createElement('style')
sheet.innerHTML = ".fbSidebarGripper, #pagelet_ticker {display: none;}";
document.body.appendChild(sheet);
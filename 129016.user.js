// ==UserScript==
// @name       Google Reader Compact
// @version    0.2
// @description  Google Reader Compact
// @match      http*://www.google.*/reader/*
// @copyright  2012+, You
// ==/UserScript==

GM_addStyle('#gb, .gbh, #top-bar { display: none; } ');
GM_addStyle('#viewer-view-options, #mark-all-as-read-split-button, #viewer-top-controls .goog-button, #viewer-refresh, { margin-right: 0.5em; }');
GM_addStyle('#gbqff, #gbqfbw { padding: 0 0 0 20px; float: right; min-width: 400px; }');
GM_addStyle('#chrome-title { padding-top: 4px; }');
 
document.getElementById('title-and-status-holder').insertBefore(document.getElementById('gbqfbw'), document.getElementById('title-and-status-holder').lastChild);
document.getElementById('title-and-status-holder').insertBefore(document.getElementById('gbqff'), document.getElementById('title-and-status-holder').lastChild);
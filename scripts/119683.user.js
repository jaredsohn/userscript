// ==UserScript==
// @name          Google Reader Compact
// @namespace     jlongGRM
// @description	  Minimal changes to Google Reader to maximize screen space.
// @include       http*://www.google.com/reader/view/*
// ==/UserScript==

GM_addStyle("#top-bar { height: 35px; }");
GM_addStyle("#search { padding: 3px 0; }");
GM_addStyle("#viewer-top-controls-container { margin-top: -11px; }");
GM_addStyle("#viewer-header { height: 26px }");

GM_addStyle("#lhn-add-subscription-section { height: 28px; margin-top: -2px; }");

GM_addStyle("#gb { display: none; }");

GM_addStyle("#entries { padding-right: 0; }");


GM_addStyle(".folder .folder .icon { margin-left: 0; }");

//Selected feed in navigation.
GM_addStyle(".folder .folder > ul .icon { margin-left: 34px; }");
// Non-selected feeds in navigation.
GM_addStyle(".folder .folder .sub-icon { margin-left: 34px; } ");
GM_addStyle(".folder .sub-icon { margin-left: 13px; } ");

GM_addStyle(".folder .folder > a > .icon { margin-left: 13px; }");
GM_addStyle(".folder .folder .folder-toggle { margin-left: 0; }");
GM_addStyle(".folder .collapsed.folder .folder-toggle { margin-left: -1px; margin-top:1px; }");
GM_addStyle(".folder .expanded.folder .folder-toggle { margin-left: 0; }");
GM_addStyle("#nav { width: 240px; }");
GM_addStyle("#chrome { margin-left: 240px; }");
GM_addStyle("#lhn-recommendations { display: none; }");

GM_addStyle(".section-minimize { left: 0px; }");
GM_addStyle(".section-minimized .section-minimize { margin-left: -2px; }");

GM_addStyle("#home-section { padding: 0; }");

GM_addStyle("#overview-selector{ padding: 7px 0 7px 15px; }");

GM_addStyle("#lhn-selectors .selector, #sub-tree-header { padding-left: 15px; }");

GM_addStyle(".scroll-tree-container { padding-top: 5px; }");

GM_addStyle("#top-bar { display: none; }");

GM_addStyle("#lhn-add-subscription { margin-top: -10px; } ");

GM_addStyle(".jfk-button { line-height: 20px; height: 20px; }");
GM_addStyle("#lhn-add-subscription { height: 20px; }");
GM_addStyle(".goog-flat-menu-button { line-height: 20px; }");
GM_addStyle(".goog-flat-menu-button-dropdown { top: 9px; }");
GM_addStyle(".goog-button-base-inner-box { height: 20px; }");
GM_addStyle(".goog-button-tight .goog-button-base-content { line-height: 20px; }");
GM_addStyle(".goog-button-base-content { padding-top: 0; }");

GM_addStyle("#entries.cards .entry { margin: 5px 0 0; }");
GM_addStyle("#entries.cards .card-content { padding: 10px 20px; }");

GM_addStyle("#current-entry .card { border-color: #4D90F0; border-left: solid 10px #4D90F0; }");
GM_addStyle("#entries.cards #current-entry .card-content { padding-left: 11px; }");

GM_addStyle("#current-entry .card-common .card-actions { padding-left:0px; }");
GM_addStyle(".card-common .card-actions { padding-left:9px; }");

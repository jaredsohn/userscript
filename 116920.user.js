// ==UserScript==
// @name           Google Reader Delete Top Bar White Space
// @namespace      sami_scripts
// @description    Fixes white spaces in the top bar of the new Google Reader layout
// @include        http*://www.google.*/reader/*
// ==/UserScript==

GM_addStyle("#viewer-header {height: 45px;}");
GM_addStyle("#lhn-add-subscription-section {height: 45px;}");
GM_addStyle("#lhn-add-subscription {margin-left: 70px;}");
GM_addStyle(".entry-title {position: relative; padding: 0 5px 5px 5px;}");
GM_addStyle("#viewer-refresh, #viewer-view-options, #mark-all-as-read-split-button, #settings-button {min-width: 11px; margin-right: 5px}");
GM_addStyle(".jfk-button-narrow {min-width: 28px;}");
GM_addStyle(".jfk-button-collapse-left {margin-right: 5px;}");
GM_addStyle(".jfk-button-collapse-right {margin-right: 0;}");
GM_addStyle(".cards .entry, .cards .card-content {padding-top: 3px;}");
GM_addStyle(".card-content {padding-top: 3px; padding-bottom: 2px;}");
GM_addStyle(".lhn-section-primary {line-height: 15px;}");
GM_addStyle("#reading-list-unread-count {margin-top: 1px;line-height: 15px;}");
GM_addStyle(".section-minimize {top: 0}");

GM_addStyle("#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }");
GM_addStyle("#search {padding: 10px 0;}");
GM_addStyle("#top-bar {height: 45px;}");
// ==UserScript==
// @name           Fix New Google Reader Layout
// @namespace      FuckingNewReader
// @description    Fixes some shits new Google Reader layout
// @include        http*://www.google.*/reader/*
// ==/UserScript==

GM_addStyle(".card { background: #EFF5FF;}");
GM_addStyle(".read .card { border: #CBCBCB solid 1px; background: transparent;}");
GM_addStyle("#current-entry .card, .card {border: 1px solid #004BC4; ");
GM_addStyle(".card { margin-left: 10px; padding-right: 8px; }");
GM_addStyle("#viewer-header {height: 45px;}");
GM_addStyle("#lhn-add-subscription-section {height: 45px;}");
GM_addStyle("#current-entry .entry-container .entry-title a, .entry-container .entry-title a, .entry-container .entry-body a {color: #004BC4}");
GM_addStyle(".read .entry-container .entry-title a, .read .entry-container .entry-body a {color: #444}");
GM_addStyle(".entry-title {position: relative; padding: 0 5px 5px 20px;}");
GM_addStyle(".entry-title .entry-icons-placeholder {position: absolute; left: 0; width: 20px; top: 3px;}");
GM_addStyle(".entry-title .entry-icons {margin-left: 0}");
GM_addStyle(".entry .entry-author {color: #888; font-size: 11px; margin-bottom: 7px;}");
GM_addStyle(".cards .entry {padding-top: 10px;}");
GM_addStyle(".lhn-section-primary {line-height: 15px;}");
GM_addStyle("#reading-list-unread-count {margin-top: 1px;line-height: 15px;}");
GM_addStyle(".section-minimize {top: 0}");

GM_addStyle("#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }");
GM_addStyle("#search {padding: 10px 0;}");
GM_addStyle("#top-bar {height: 45px;}");

GM_addStyle(".card-bottom { margin-left: -14px; margin-right: -9px; }");
GM_addStyle(".entry .star { height: 12px; margin-right: -3px; }");

GM_addStyle(".item-plusone { display: none !important; }");



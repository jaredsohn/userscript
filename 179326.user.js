// ==UserScript==
// @name        Feedly Tweaks
// @namespace   http://feedly.com/
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @version     1.4.1
// @grant       GM_addStyle
// ==/UserScript==


GM_addStyle(".feedIndexTitleHolder.nonEmpty.emptyAware {font-weight: bold !important; }");
GM_addStyle("#feedlyTabsHolder .nonEmpty {color: black !important; }");
GM_addStyle(".feedIndex.target.selected {border-left: 4px solid #DD4B39 !important;}");
GM_addStyle("#feedlyTabs {overflow-y: auto;padding-left: 0 !important;padding-right: 27px;width: 240px !important;}");
GM_addStyle("#feedlyProBar {display: none !important;}");
GM_addStyle("#feedlyTabs > div:first-child {display: none !important;}");
GM_addStyle("#aboutArea {display: none !important;}");
GM_addStyle("#feedlyPart0.area {padding: 0 0 0 33px !important;}");

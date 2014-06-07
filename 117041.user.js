// ==UserScript==
// @name           Slaver's Google Reader
// @namespace      http://slaver.info
// @description    Fixes UI flaws in the new Google Reader layout
// @include        http*://www.google.*/reader/*
// ==/UserScript==

var css = "\
.card { border: #CBCBCB solid 1px; }\
#scrollable-sections-holder { border-right: #EBEBEB solid 1px; }\
.card { margin-left: 10px; margin-right: 9px; padding-right: 8px; }\
.card-bottom { margin-left: -14px; margin-right: -9px; margin-bottom: -1px; }\
.entry .star { height: 12px; margin-right: -3px; }\
#entries.list .entry .collapsed { padding: 3px 0 5px}\
#topbar { height: 40px; }\
#search { padding 5px 0; }\
#lhn-add-subscription-section, #viewer-header { height: 35px; }\
#lhn-add-subscription, #viewer-top-controls-container { margin-top: -14px; }\
";

GM_addStyle(css);

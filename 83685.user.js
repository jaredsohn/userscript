// ==UserScript==
// @name           SDA suppress
// @namespace      ad_suppression
// @description    hides the bar above post input textbox
// @include        http://forum.speeddemosarchive.com/*
// ==/UserScript==

GM_addStyle("#threadfuncs {display:none;} #threadfuncsarea {margin-bottom:10px;} #posttextarea.largepostbox_hide {height:115px;min-height:115px;max-height:115px;}");
// ==UserScript==
// @name           Facebook FullWidth / NoSidebar
// @description    Y U NO
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://facebook.com/*
// @include        https://www.facebook.com/*
// @author         c41
// @namespace      http://twitter.com/_c41
// @version        1.0
// ==/UserScript==

// Message View
GM_addStyle("#rightCol {display: none !important;}");
GM_addStyle("#contentArea {width: 753px !important;}");

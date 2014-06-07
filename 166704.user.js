// ==UserScript==
// @name           MaxWidth for WikiPedia
// @author         h.zhuang
// @version        2013.05.05
// @description    It will set a max width of wikipedia for better readibility.
// @lastchanges    Initial release
// @namespace      wikipedia.org
// @include       http://wikipedia.org/*
// @include       https://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// @include       https://*.wikipedia.org/*
// ==/UserScript==

GM_addStyle("#content,#bodyContent {max-width:760px;} #mw-content-text {max-width:680px;}");
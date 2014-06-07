// Wikipedia Browse
// Sometimes you just want to RTFA
// Copyright (c) 2009, David Barr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 
// Changelog:
// Started with awful minified script.
// Cleaner implementation dependent on querySelectorAll().
// Removed non-content. Set maximum width of body content.
// Rewrote with GM_addStyle().
//
// ==UserScript==
// @name          Wikipedia Browse
// @namespace     http://cordelta.com/david.barr/
// @description	  Remove metadata and edit links from Wikipedia articles
// @include       http://en.wikipedia.org/wiki/*
// ==/UserScript==

GM_addStyle(
  "span.editsection, table.metadata, sup.noprint," +
  "#column-one, .siteNoticeBig {display:none;}" +
  "#bodyContent {max-width:960px;}");
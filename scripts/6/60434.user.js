// ==UserScript==
// @name           MarkMail Fixed Width Font
// @namespace      esri.com
// @description    Makes messages appear with fixed width font on MarkMail
// @include        http://markmail.org/*
// @include        http://*.markmail.org/*
// ==/UserScript==

var css = "div.pws { font-family: monospace !important; white-space: pre !important; font-size: 1.0em; }";
var quote_css = "div.quote { padding-left: 10px !important; font-family: monospace !important; }";

if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
  GM_addStyle(quote_css);
}
// ==UserScript==
// @name           text selection
// @namespace      aa
// @include        http://www.aa.com.tr/*
// @include        http://www.aa.com.tr/tr/*
// ==/UserScript==

var oleg = document.getElementById("oleg");
if (window.frameElement && oleg) {
  oleg.style.MozUserSelect = "text";
  oleg.style.cursor = "text";
}
// ==UserScript==
// @name Reunion
// @namespace http://www.greasespot.net/
// @include http://www.reunion.com/
// ==/UserScript==

location.href = "javascript:(" + function() {
  window.onbeforeunload = null;
  window.onunload = null;
} + ")()";
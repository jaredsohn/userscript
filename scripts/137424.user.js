// ==UserScript==
// @name RealClearWorld Redirect
// @version 1.0.1
// @description Immediately skip to the full article
// @include http://www.realclearworld.com/*.html
// ==/UserScript==

(function () {
"use strict";

function cc(c) { // contains class
  return "contains(concat(' ', normalize-space(@class), ' '), " + "' " +
      c + " ')";
}
function xp1(q, context) { // first node that matches xpath
  var r = document.evaluate(q, context || document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return (r && r.singleNodeValue);
}

var a = xp1(".//div[" + cc('article-source') + "]/a[@href]",
    document.body);
if (a) { window.location.replace(a.getAttribute('href')); }

})();

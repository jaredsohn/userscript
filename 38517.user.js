// ==UserScript==
// @name           Arlington Library automatic login
// @namespace      http://www.acornweb.org/
// @description    The Arlington Library website repeatedly requires you to log in, assuming you're using one of their shared computers in the library. If you're using the site from home, this is kind of frustrating, so this script just logs you in to the site automatically.
// @include        http://www.acornweb.org/carlweb/en/piplogin.jsp
// @include        http://www.acornweb.org/carlweb/en/pphlogin.jsp
// ==/UserScript==

// http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

// Page has an onload to delete form content because it expects to be at
// a shared terminal. This was a gigantic pain in the ass to debug.
$x("//body")[0].setAttribute("onLoad", "");
$x("//input[@name='pid']")[0].value = "2020..."; // Enter your library card number, starting with 2020
$x("//input[@name='name']")[0].value = ""; // Enter your last name
$x("//input[@name='cache']")[0].checked = true;
$x("//input[@type='submit']")[0].click();
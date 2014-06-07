// ==UserScript==
// @name          Chess.com - Start New Game Fix
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/80216
// @description    Manually sets the values of the form fields for starting new games
// @include        http://www.chess.com/echess/myhome.html
// ==/UserScript==

// Set the time per move to 2 days
$x("//select[@id='c28']/option[@value='1']").forEach(function(ctype) { ctype.selected='selected'; });

// Set the minimum rating
$x("//input[@id='c29']").forEach(function(ctype) { ctype.value="1400"; });

// Set the maximum rating
$x("//input[@id='c30']").forEach(function(ctype) { ctype.value="1500"; });

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
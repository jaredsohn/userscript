// ==UserScript==
// @name           Arlington Library automatically pick hold branch
// @namespace      http://www.acornweb.org/
// @description    When you're holding books at the Arlington Library website, you probably always want them sent to the same branch. Edit to choose your branch and it will be automatically chosen for you.
// @include        http://www.acornweb.org/carlweb/en/pickupbranches.jsp
// ==/UserScript==


// http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

// Remove the // from in front of the line following the name of your branch.

// Aurora Hills
// $x("//input[@name='pickup'][@value='AURORA']")[0].checked = true;

// Central
// $x("//input[@name='pickup'][@value='CENTRL']")[0].checked = true;

// Cherrydale
// $x("//input[@name='pickup'][@value='CHERRY']")[0].checked = true;

// Columbia Pike
// $x("//input[@name='pickup'][@value='COLPKE']")[0].checked = true;

// Glencarlyn
// $x("//input[@name='pickup'][@value='GCARLN']")[0].checked = true;

// Plaza
// $x("//input[@name='pickup'][@value='69']")[0].checked = true;

// Shirlington
// $x("//input[@name='pickup'][@value='SHRLTN']")[0].checked = true;

// Westover
// $x("//input[@name='pickup'][@value='WESTOV']")[0].checked = true;

// automatically click submit:
$x("//input[@type='submit']")[0].click();
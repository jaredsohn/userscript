// This is a Greasemonkey user script.
// To install, you need Greasemonkey:
//   http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to
// "Install User Script".
// Accept the default configuration and install.
// To uninstall, go to Tools/Manage User Scripts,
// select "CoolerRunning", and click Uninstall.
// -------------------------------------------------
// ==UserScript==
// @name          CoolerRunning
// @namespace     SDC
// @description   remove wack fuckas
// @include       http://chrunners.net/forum/*
// @exclude
// @exclude
// ==/UserScript==
// actual entries are these.... id('quickModForm')/table[1]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody - the tr index is the msg index
// list of miscreants
var jerkoffs = new Array("Kenny Banya");
var xpathMatch;
var allEle = document.evaluate(
"id('quickModForm')/table[1]/tbody/tr/td/table/tbody/tr/td/table/tbody",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
//GM_log("Got " + allEle.snapshotLength + " messages");
xpathMatch = "id('quickModForm')/table[1]/tbody/tr["
wipeJerky(allEle, xpathMatch);

function wipeJerky(theElements,xpathMatch) {
  for (var idex = 0; idex < theElements.snapshotLength;
   idex++) {
   var miniMatch = xpathMatch + (idex + 1) + "]/td/table/tbody/tr/td/table/tbody/tr[1]/td[1]/b/a";
   var nameEle = document.evaluate(miniMatch,
     document, 
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null)
   if (nameEle.snapshotLength > 0) {
     element = nameEle.snapshotItem(0);
     if (contains(jerkoffs, element.innerHTML)) { 
       var thisEntry = theElements.snapshotItem(idex);
	   remove(thisEntry);
	   } 
   }
  } // elements
}

// Remove DOM node
function remove(element) {
    back = element.parentNode.removeChild(element);
}
// does array contain val?
function contains(array, val) {
  for (var i = 0; i< array.length; i++) {
    if (array[i] == val)
	  return true;
  }
  return false;
}
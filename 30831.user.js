/* 
 * No Wordpress Links
 * Author: Serguei Trouchelle (http://trouchelle.com/)
 * Version: 1.4
 */

// ==UserScript==
// @name        No Wordpress Links
// @namespace   trouchelle.com
// @description Remove Wordpress's "Originally published" crap
// @version     1.4
// @include     http://*.livejournal.com/*
// @exclude     http://pics.livejournal.com/*
// ==/UserScript==

function RemoveWPcrap () {
  var allLinks, thisLink;
  allLinks = document.evaluate(
//      "//p[@style='border: 1px solid black; padding: 3px;']",
      "//p",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

  for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.style.cssText == "border: 1px solid black; padding: 3px;") {
      if (thisLink.firstChild.nodeName == "B" ||
          thisLink.firstChild.nodeName == "STRONG" ) { 
        // Most likely, this is it.
        if (thisLink.firstChild.firstChild.nodeValue == "Originally published at " ||
            thisLink.firstChild.firstChild.nodeValue == "Запись опубликована ") {
          // Yes, this is definitely
          thisLink.style.display = 'none';
        } else {
           alert(i + " Text mismatch " + thisLink.firstChild.firstChild.nodeValue);
        }
      } else {
         alert(i + " Child mismatch " + thisLink.firstChild.nodeName);
      }
    } else {
      // alert(i + " Style mismatch " + thisLink.style.cssText);
    }
  }
}

RemoveWPcrap();

/* What's new:
    1.4    2008/08/21 Now it understands "<strong>" instead of "<b>" and Russian text.
    1.0    2008/07/30 Initial revision
*/
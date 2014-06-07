// ==UserScript==
// @name          Troll Blocker 3
// @namespace     http://justoneminute.typepad.com/
// @description   blocks out annoying troll posts
// @include       http://justoneminute.typepad.com/*
// ==/UserScript==

/*
 * Troll Blocker 3  -  trollblocker3.user.js version 1.2
 * Author: Mittineague <N/A> (N/A) http://www.mittineague.com
 * JOM changes by bgates
 * script hosted at http://www.mittineague.com/dev/trollblocker3.user.js
 * and can be found at http://userscripts.org/scripts/show/6334
 */

(function(){

  /* add known trolls beneath the following array
   * names added here will be filtered from all threads
   * names must be removed from array to see posts again
   * Names are Case sensitive
   */
  var knownTrolls = new Array();
  knownTrolls[0] = /eightnine/;
  knownTrolls[1] = /James Thompson/;
  knownTrolls[2] = /getagrip/;

  var dataItems, thisDataItem, userName;
  var newItems, thisNewItem;

  dataItems = document.evaluate("//p[@class='comment-footer']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < dataItems.snapshotLength; i++) {
    thisDataItem = dataItems.snapshotItem(i);
    userName = thisDataItem.innerHTML;
    for (var m = 0; m < knownTrolls.length; m++) { 
      if ( userName.search(knownTrolls[m]) != -1 ) {
        var replacement = document.createElement('p');
        var upperNode = thisDataItem.parentNode; // P
	  upperNode.parentNode.replaceChild(replacement, upperNode);
	}
    }
    userName = "";
  }
})();
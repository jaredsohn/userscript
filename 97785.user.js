// ==UserScript==
// @name           School Vandals Treasure Collector
// @namespace      School Vandals
// @description    Collect treasure without even clicking on Claim
// @include        http://apps.facebook.com/schoolvandals*

// ==/UserScript==

var appID = 'app65748335077_';

var coins = parseInt(document.getElementById(appID + 'coins').innerHTML);

var spotTagged = xpath("//a[contains(@title,'Claim')]/..");

if ( spotTagged.snapshotLength > 0 ) {
  document.location = document.location + '&slot_id=' + spotTagged.snapshotItem(0).id.split('slot_')[1];
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
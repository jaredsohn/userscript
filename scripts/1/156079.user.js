
// ==UserScript==
// @name           Tapuz Communa Remove Left Panel
// @namespace      Tapuz
// @version        1.0
// @description    Hide the Tapuz partners panel in tapuz communa. leaving more space for messages (revert the display to the way it was before the te admin added this panel)
// @include        http://www.tapuz.co.il/Communa/userCommuna.asp?*
// ==/UserScript==

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main () {

   var findPattern = "/html/body/div[4]/table[4]/tbody/tr[2]/td[6]";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var unwanted1 = resultLinks.snapshotItem(0)
unwanted1.style.display='none';

}


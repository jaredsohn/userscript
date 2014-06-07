/*
############################################################
##SCRIPT#####################################################
Purpose: To remove the Xbox Live GamerTags service from vBulletin forums

Comments by author: First ever GreaseMonkey script, and it actually does something useful :x

Known Bugs: Also removes the 'My System' system. May affect other bits and pieces using the info class.

Version: 1.1 "Escher"

##CONTACT####################################################
You can get in touch with me at jamesharrison [at] blackicehosting .dot. com

############################################################
##END OF README################################################
*/
// ==UserScript==
// @name          PHWOnline Gamertag Remover
// @namespace     http://www.talkunafraid.co.uk/scripts/
// @description   Removes Xcircle Gamertags from forums
// @include       http://*
// ==/UserScript==

var allDivs, thisDiv;
// Define all the divisions as an evaluation of the page
allDivs = document.evaluate(
// Where class="info" in an element
    "//div[@class='info']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	// For every div where class IS set to info, we nuke it.
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // Nuke here- appeal to parent of thisDiv to kill its child element thisDiv.
	thisDiv.parentNode.removeChild(thisDiv);
	GM_log('Removed GamerTags.');
}
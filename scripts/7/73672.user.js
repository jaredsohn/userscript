// ==UserScript==
// @name           SOC Toggle CheckBoxes
// @namespace      http://www.sendasmile.net
// @description    Provides a "Toggle" option on SOC pages w/checkboxes to swap whether it is checked or not.

// @include        https://www.sendoutcards.com/*

// @author        Blaine Moore #74039
// @homepage      http://www.SendASmile.net/ 
// @version       1.1

// ==/UserScript==

GM_registerMenuCommand( "Toggle All Visible Checkboxes (ESC)", CheckAllBoxes);

//Generic lookup fuction for scraping a site
function xpath(query) {
 return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function CheckAllBoxes() {
	var cbs = xpath("//input[@type='checkbox']");
	for (var i=0 ; i<cbs.snapshotLength; i++) {
		var nodeToToggle = cbs.snapshotItem(i);
		nodeToToggle.checked = !nodeToToggle.checked;
	} // for (var i=0 ; i<cbs.snapshotLength; i++)
} // CheckAllBoxes

document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if ( key == 27 ) {
	    CheckAllBoxes();
    }
  }, true);
// ==UserScript==
// @name          Apple Downloads Nav Enhance
// @namespace     http://userscripts.readypress.com
// @description	  Adds a missing navigation bar to the bottom of the long download pages.
// @author        Jeff
// @homepage      http://readypress.com
// @include       http://www.apple.com/downloads/macosx/*/*
// ==/UserScript==
var thisContent;
var thisControl;
var insControl;
var dupControl;
var allP, thisP;

thisContent = document.getElementById("content");
thisControl = document.getElementById("controls");

if (thisContent && thisControl){
	dupControl = thisControl.cloneNode(true);

	allP = document.evaluate(
	    "/html/body/div[2]/div/div/div[2]/p[@class='sosumi']",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allP.snapshotLength; i++) {
	    thisP = allP.snapshotItem(i);
	    // do something with thisLink
		insControl = thisContent.insertBefore(dupControl, thisP);
	}
}


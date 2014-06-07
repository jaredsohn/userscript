// LimitProof's Despoiler Script
// 
// ==UserScript==
// @name           Despoiler
// @namespace      http://www.freewebs.com/limitproof/
// @include	   *forums.televisionwithoutpity.com*
// @description    Version 1.0
// ==/UserScript==

// ---------------------------------------------------------------------------
// This script replaces the black spoiler bars with smaller text---------------------------------------------------------------------------

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//span[@class='spoiler']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if (thisDiv.className="spoiler")
	{
		thisDiv.className = "postdetails";
	}
}
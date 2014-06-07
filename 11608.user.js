// Condense tables on Ameritrade pages
// ==UserScript==
// @name           Ameritrade - Fix Table Widths
// @description Condense tables on Ameritrade pages - Get rid of all (hundreds) of the ridiculous spacer <div> tags.
// @namespace      Quickdraw6906
// @include   https://wwws.ameritrade.com/*
// ==/UserScript==

(function ()	{
	function deleteSpacerColumns() {
		section = document.getElementById("sectionS01");
		if (section) {
			var allDivs, thisDiv;
			allDivs = document.evaluate("//div[@class='spacer']", document,
			    null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (allDivs.snapshotLength > 0) GM_log("Removing " + allDivs.snapshotLength.toString() + " elements");
			for (var i = 0; i < allDivs.snapshotLength; i++) {
			    thisDiv = allDivs.snapshotItem(i);
			    // do something with thisDiv
			    //thisDiv.parentNode.removeChild(thisDiv);
			    thisDiv.parentNode.parentNode.removeChild(thisDiv.parentNode);
			}
		}
	}
	document.addEventListener("onload", deleteSpacerColumns(), true);
})();

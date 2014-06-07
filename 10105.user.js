//
// Let the Results Speak For Themselves
// Sanitizes Google's search results to point directly to their URLs.
// Removes link redirection to Google's click tracker.
//
// Version 02 (21 June 2007)
// ZingoTech Labs
//
// Notes:
//
// * 
//
// Changelog:
//
// 01:  - Initial release.
//
// 02: 	- Updated to use more efficient XPath instead of iterative search.
//
// ==UserScript==
// @name            Let the Results Speak For Themselves
// @namespace       tag:zingospace-003
// @description     Sanitizes Google's search results to point directly to their URLs.  Removes link redirection to Google's click tracker.
// @include         http://www.google.com/search?*
// ==/UserScript==
//

(function()
{

	// for all <A> anchors with a CLASS of "l", remove the onMouseDown
	// attribute, leaving only the HREF for the user to click on
    anchors = document.evaluate(
    	"//a[@class='l']",
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	length = anchors.snapshotLength;
	for(ctr = 0; ctr < length; ctr++)
	{
		anchors.snapshotItem(ctr).removeAttribute("onMouseDown");
	}

})();


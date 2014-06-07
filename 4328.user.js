/* Remove Keyboard Short-Cuts
Created : 06/26/06
Modified: 06/26/06 Initial Version



Change log:
1.0.0 06/26/06 Initial Version
*/

// ==UserScript==
// @name          Remove Keyboard Short-Cuts
// @namespace     http://userscripts.org/people/2042
// @description	Removes keyboard short-cuts from web pages.  For instance, Wikipedia.org uses (Alt-F) for their search short-cut key.  This was created so that I can more easily use the key combination (Alt-F-C) to close firefox tabs. Note: The (Alt) will be different on alternate systems.
// @include       *
// ==/UserScript==

removeShortCuts();

function removeShortCuts() {
	var allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; ++i) {
		if (allElements[i].hasAttribute("accesskey")) allElements[i].removeAttribute("accesskey");
	}
}


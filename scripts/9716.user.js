// ==UserScript==
// @name           Restore New Google Search Links
// @namespace      http://www.splintor.com/userscripts
// @description    Brings back Google search links out of the "more" link popup
//                 This is based on the original script (http://userscripts.org/scripts/show/5364), but aims at the new design with the links
//                 at the top of the page (http://www.google.com/intl/en/press/pressrel/universalsearch_20070516.html)
// @include        http://*.google.com/*
// ==/UserScript==

(function() {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Restore New Google Search Links",
				namespace: "http://www.splintor.com/userscripts",
				description: "Brings back google search links out of the \"more\" link popup. This is based on the original script (http://userscripts.org/scripts/show/5364), but aims at the new design with the links at the top of the page (http://www.google.com/intl/en/press/pressrel/universalsearch_20070516.html)",
				source: "http://userscripts.org/scripts/show/9716",
				identifier: "http://userscripts.org/scripts/source/9716.user.js",
				version: "0.3",
				date: (new Date(2007, 6 - 1, 12)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	var gbar = document.getElementById("gbar");

	// Convenience function for a simple single node xpath query
	function xpathFirst(xpath, context)
	{
	    var result = document.evaluate(xpath, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	    return result && result.singleNodeValue;
	}

	// Convenience functions for dom insertion
	function nodePutAfter(nodInsert, nodRef)
	{
		nodRef.parentNode.insertBefore(nodInsert, nodRef.nextSibling);
	}

	function getLink(name)
	{
		return xpathFirst('//a[.="' + name + '"]', gbar);
	}

	function getDiv(name)
	{
		return xpathFirst('//div[.="' + name + '"]', gbar);
	}

	////////////////////////////
	// Main functionality below
	////////////////////////////

	// This function does the actual work of moving the nodes around in the dom.
	// PARAMETERS:
	//  name: The text of the link you want to restore
	//  insertAfter: The text of the link you want the restored link to be placed after.
	//               If this parameter is missing, the link will precede the "more" link.
	function restoreGoogleSearchLink(name, insertAfter)
	{
		if(location.host.match(new RegExp(name + "\\.", "i"))) // this is currently selected - no need to do anything
			return;

		// Determine the node to insert the link after
		var nodInsAfter;
		if(insertAfter)
			nodInsAfter = getLink(insertAfter);

		if(nodInsAfter)
			nodInsAfter = nodInsAfter.parentNode;
		else {
			nodInsAfter = getDiv(insertAfter);

			if(!nodInsAfter) {
				var nodMore = xpathFirst('//a[starts-with(., "more")]');
				nodInsAfter = nodMore && nodMore.parentNode && nodMore.parentNode.previousSibling;
			}
		}

		if(nodInsAfter) {
			var clone = nodInsAfter.cloneNode(false);
			clone.appendChild(getLink(name));
			nodePutAfter(clone, nodInsAfter);
		}
	}

	// Modify the code below to customize this script's behavior.
	// The first parameter is the name of the link you want to restore.
	// The second parameter is the the name of the link the restored link will be placed after.
	// If the second parameter is missing, the link will precede the "more" link.
	restoreGoogleSearchLink("Groups", "Images");
	//restoreGoogleSearchLink("Froogle");
	//restoreGoogleSearchLink("Books");
})();



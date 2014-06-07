// ==UserScript==
// @name           Set Target
// @description    Open links in the current tab or window.
// @include        *
// ==/UserScript==

/*	Home:      http://userscripts.org/scripts/show/8227
 *	ChangeLog: http://set-target-userscript.blogspot.com/
 */

function main()
{
	var elements = document.evaluate(".//a[@target] | .//area[@target] | .//base[@target] | .//form[@target] | .//link[@target]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elements) for (var i = 0; i < elements.snapshotLength; i++) setTarget(elements.snapshotItem(i));
}

function setTarget(element)
{
	var attribute = element.getAttribute("target");
	switch (attribute)
	{
		// These are the good targets.
		case "_parent":
		case "_self":
		case "_top":
			break;

		case "_blank": // Change _blank to _top (same window).
			element.setAttribute("target", "_top");
			break;

		default: // Change unknown others to _top (same window).
			var elements = parent.document.getElementsByName(attribute);
			if (elements.length == 0) element.setAttribute("target", "_top");
	}
}

main();
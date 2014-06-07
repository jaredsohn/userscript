// diediedead.user.js
//
// Written by: Michael Devore
// Released to the public domain
//
// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          Diediedead
// @namespace     http://www.devoresoftware.com/gm/dddead
// @description	  stripped-down killfile script, reboot
// @include       http://*.metafilter.com/*
// ==/UserScript==
//

// list of people to killfile
//  follow all quoted names except last with a comma
var killThisLoserList = [
	"mdevore",
	"mathowie"
];

function diediedeadMain()
{
	var xpath = "//DIV/SPAN[starts-with(text(),'posted by') and @class='smallcopy']";
	var postNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var total = postNodes.snapshotLength;
	for (var i = 0; i < total; i++)
	{
		var candidate = postNodes.snapshotItem(i);
		var currentNode = candidate.firstChild;
		var found = false;
		var poster;
		while (currentNode && !found)
		{
			if (currentNode.nodeName === "A")
			{
				var href_value = currentNode.getAttribute('href');
				if (href_value.match(/\/user\/\d/))
				{
					var childNode = currentNode.firstChild;
					while (childNode)
					{
						if (childNode.nodeName === '#text')
						{
							poster = childNode.nodeValue;
							found = true;
							break;
						}
						childNode = childNode.nextSibling;
					}
				}
			}
			currentNode = currentNode.nextSibling;
		}
		if (found)
		{
			// have a poster name
			for (var loop = 0; loop < killThisLoserList.length; loop++)
			{
				if (poster === killThisLoserList[loop])
				{
					var parentNode = candidate.parentNode;
					if (parentNode)
					{
						parentNode.style.display = "none";
					}
					var followNode = parentNode.nextSibling;
					while (followNode && followNode.nodeName !== "DIV" && followNode.nodeName !== "BR")
					{
						followNode = followNode.nextSibling;
					}
					if (followNode && followNode.nodeName === "BR")
					{
						var pNode = followNode.parentNode;
						if (pNode)
						{
							pNode.removeChild(followNode);
						}
					}
					break;
				}
			}
		}
	}
}

diediedeadMain();

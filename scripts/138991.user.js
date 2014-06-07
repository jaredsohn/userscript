// elancekiller.user.js
//
// Written by: Michael Devore
//
// This is a Greasemonkey script.
//
// ==UserScript==
// @name          Elance Killer
// @namespace     http://www.devoresoftware.com/gm/elk
// @description	killfile script for Elance
// @include       http://*.elance.com/*
// @include       https://*.elance.com/*
// @version			1.1
// ==/UserScript==
//

// list of people to killfile
// follow all quoted names except last with a comma
var killThisIDList = [
	"e_rajk",
	"Elance_Victor",
	"devoresoftware"
];

function elanceKillerMain()
{
	var xpath = "//div[@class='comment-outer']//div[@class='comment-auth ']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	var count = divNodes.snapshotLength;
	for (var i = 0; i < count; i++)
	{
		var candidate = divNodes.snapshotItem(i);
 		if (!candidate)
 		{
	 		break;
 		}
		var childNode = candidate.firstChild;
		while (childNode)
		{
//			GM_log(childNode);
			if (childNode.nodeName != "#text" && childNode.getAttribute('class') == 'submitted')
			{
				// potential parent div of anchor which holds Elance user ID
				if (childNode.firstChild && childNode.firstChild.nodeName == "A")
				{
					var aNode = childNode.firstChild;
					var title = aNode.getAttribute('title');
//					GM_log(title);
					if (title && title == 'View Elance user profile.')
					{
						var tNode = aNode.firstChild;
						if (tNode && tNode.nodeName =="#text" && tNode.nodeValue.length)
						{
							filter(tNode, candidate);
							break;
						}
					}
				}
			}
			childNode = childNode.nextSibling;
		}
	}
}

function filter(tNode, pNode)
{
//	GM_log(tNode.nodeValue);
	for (var loop = 0; loop < killThisIDList.length; loop++)
	{
		if (tNode.nodeValue == killThisIDList[loop])
		{
			while (pNode && pNode != pNode.parentNode)
			{
				if (pNode.getAttribute('class') == 'comment-outer')
				{
					pNode.style.display = "none";
					break;
				}
				pNode = pNode.parentNode;
			}
			break;
		}
	}
}

elanceKillerMain();

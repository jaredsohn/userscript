// showCertainLinks.user.js
//
// ==UserScript==
// @name          showCertainLinks - Rapidshare-Links on SerienJunkies
// @namespace     http://www.devoresoftware.com/gm/showCertainLinks
// @description	  Show links of matching pages as text following the link
// @include       http://serienjunkies.org/*
// @include       *.serienjunkies.org/*
// ==/UserScript==
//


// list of text strings to match in a link to show the link
// each quoted entry should end the line with a comma, except the final line
var showMatchingLinkTextList = [
	"rc_"
];


function main()
{
	var anchors = document.getElementsByTagName('A');
	var len = anchors.length;
	for (var i = 0; i < len; i++)
	{
		var anchor = anchors[i];
		var hrefValue = anchor.getAttribute('href');
		var bFound = false;
		for (var loop = 0; loop < showMatchingLinkTextList.length && hrefValue != null; loop++)
		{
			if (hrefValue.indexOf(showMatchingLinkTextList[loop]) >=0)
			{
				bFound = true;
				break;
			}
		}
		if (bFound)
		{
			var expansion = " " + hrefValue + " ";
			anchor.appendChild(document.createTextNode(expansion));

		}
	}
}

main();

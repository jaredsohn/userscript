// showlinks.user.js
//
// ==UserScript==
// @name          showlinks at serienjunkies.org
// @namespace     http://www.devoresoftware.com/gm/showlinks
// @description	  Show links on serienjunkies.org as text following the link
// @include       http://serienjunkies.org/*
// @include       http://*.serienjunkies.org/*
// ==/UserScript==
//

function main()
{
	var anchors = document.getElementsByTagName('A');
	var len = anchors.length;
	for (var i = 0; i < len; i++)
	{
		var anchor = anchors[i];
		var hrefValue = anchor.getAttribute('href');
		var expansion = " [" + hrefValue + "] ";
		anchor.appendChild(document.createTextNode(expansion));
	}
}

main();

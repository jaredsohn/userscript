// showlinks.user.js
//
// ==UserScript==
// @name          showlinks
// @namespace     http://www.devoresoftware.com/gm/showlinks
// @description	  Show links of page as text following the link
// @include       http://*
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

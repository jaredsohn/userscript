// ==UserScript==
// @name           Customize MetaFilter sign out text
// @namespace      FishBike
// @description    Changes the sign out link on MetaFilter pages to logout
// @include        http://*.metafilter.com/*
// ==/UserScript==

var anchorList = document.getElementsByTagName('a');
for (var i=0; i<anchorList.length; i++)
{
	if (anchorList[i].innerHTML.toLowerCase()=='sign out')
	{
		anchorList[i].innerHTML='logout';
	}
}
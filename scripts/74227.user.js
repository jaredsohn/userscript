// ==UserScript==
// @name           Hotspot Shield ad remove
// @namespace      
// @description    Removes Hotspot Shield's Ad banner from every page.
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      Winter Faulk
// @version        1.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// Thanks to Leo Janeway (http://userscripts.org/users/64553) for some changes/fixes

function remove_ad()
{
	var allDIVTags = new Array();
	var allDIVTags=document.getElementsByTagName("div");
	
	var pattern1 = new RegExp("(^[a-zA-Z]{1,4}[0-9]{1,3}$)");
	var pattern2 = new RegExp("(^[a-zA-Z]{1,3}_\a\l\l[0-9]{1,3}$)");
	for (i=0; i<allDIVTags.length; i++)
	{
		if (pattern1.test(allDIVTags[i].id) && allDIVTags[i].style.display != "none" && pattern2.test(allDIVTags[i].className))
		{
			allDIVTags[i].parentNode.removeChild(allDIVTags[i]);
			document.getElementsByTagName('html')[0].style.marginTop='';
			i = allDIVTags.length+1
			return true;
		}
	}
	return false;
}

remove_ad();
// ==UserScript==
// @name           Tapuz Ads Page Skip
// @namespace      Tapuz.co.il
// @version        1.3
// @description    Skips the Tapuz Maavaron page in the new forums system
// @include        http://www.tapuz.co.il/Forums2008/ForumPage.aspx?*
// @include        http://www.tapuz.co.il/Forums2008/ForumMaavaron.aspx?*
// ==/UserScript==

// Avoiding displaying the ad page located in the forum page (ForumPage.aspx)
// The "123" value for the cookie "tapuzMavaron" is the value Tapuz programmers set. Setting
// the year to be 2050...
document.cookie = "tapuzMavaron=123;expires=Tue 01 Sep 2050 08:31:05 PM IDT;path=/;domain=.tapuz.co.il";

if (document.location.href.toLowerCase().indexOf("forumpage.aspx") >= 0)
{
	// The forum page. Adding "r=1" to avoid the maavron (ForumMaavaron.aspx) in the first place
	
	// Gets all the links to other pages, and adds the r=1 to every
	// link, which orders the server to skip the ad
	var links = document.getElementsByClassName("pagesLink");
	for (var i = 0; i < links.length; i++)
	{
		links[i].href += "&r=1";
	}	
	
	// "Fixs" the function what displays the external link maavron (outMaavaron.aspx)
	if (unsafeWindow.Tapuz != null)
	{
		unsafeWindow.Tapuz.LinkMaavaron.prototype.replaceLink = function() { };
	}
}
else
{
	// The maavron page: auto clicking the skip link
	// Occures when getting links from somewhere else, with no "r=1" in their url
	document.getElementById("ctl00_ContentPlaceHolderMain_SkipLink").click();
}
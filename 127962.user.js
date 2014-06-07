// ==UserScript==
// @name           Tapuz Forum View Fix
// @namespace      Tapuz
// @version        1.2
// @description    Hides the left panel in Tapuz forums, so more space is available for posts
// @include        http://www.tapuz.co.il/Forums2008/ForumPage.aspx?*
// @include        http://www.tapuz.co.il/Forums2008/ViewMsg.aspx?*
// ==/UserScript==

// For the forum page (ForumPage.aspx)
var forumContent = document.getElementsByClassName("forumContentInner");
if (forumContent != null)
{
	forumContent[0].style.marginLeft = "0px";
	
	var side = document.getElementsByClassName("forum-side-bar");
	if ((side != null) && (side.length >= 1))
	{
		side[0].style.display = "none";
	}
}

// For the message view page (ViewMsg.aspx)
var side = document.getElementsByClassName("sideBarForum");
if (side != null)
{
	side[0].style.display = "none";
	side[0].style.margin = "0px";
}
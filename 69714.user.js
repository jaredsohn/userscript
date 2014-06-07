// ==UserScript==
// @name           NoUselessV2Threads
// @namespace      http://s1.zetaboards.com/Flood_V2/forum/1032942/
// @description    Removes stickies and announcements from v2.
// @include        http://s1.zetaboards.com/Flood_V2/forum/1032942/
// ==/UserScript==

var newhtml;

var RemoveStickies 	= true;
var RemoveAnnouncements = true;

if (RemoveStickies)
{
if (document.body.innerHTML.indexOf("<th id=\"pinned_head\" colspan=\"6\">Pinned Topics</th>") != -1)
{
	newhtml = document.body.innerHTML.substr(0,document.body.innerHTML.indexOf("<th id=\"pinned_head\" colspan=\"6\">Pinned Topics</th>"));
	newhtml = newhtml + document.body.innerHTML.substr(document.body.innerHTML.indexOf("<th class=\"c_cat-mark\">&nbsp;</th>"));
	document.body.innerHTML = newhtml;
}
}
if (RemoveAnnouncements)
{
if (document.body.innerHTML.indexOf("<table class=\"posts\" id=\"announcement_list\" cellspacing=\"0\">") != -1)
{
	newhtml = document.body.innerHTML.substr(0,document.body.innerHTML.indexOf("<table class=\"posts\" id=\"announcement_list\" cellspacing=\"0\">"));
	newhtml = newhtml + document.body.innerHTML.substr(document.body.innerHTML.indexOf("<form action="));
	document.body.innerHTML = newhtml;
}
}
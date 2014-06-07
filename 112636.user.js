// ==UserScript==
// @name           Auto-view spoiler boxes
// @namespace      http://userscripts.org/users/75549
// @description    Lets you skip clicking the Show button to view spoilers
// @include        http://forums.kingdomofloathing.com/vb/showthread.php*
// ==/UserScript==

stuff = document.getElementsByTagName("div");
for(i=0;i<stuff.length;i++)
{
	if (stuff[i].style.display == "none" && stuff[i].id == "")
	{
		stuff[i].style.display = "";
	}
}
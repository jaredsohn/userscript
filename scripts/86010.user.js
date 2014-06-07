// ==UserScript==
// @name			Link Report Queue Fixed TCF Link
// @author			shaldengeki
// @namespace		shaldengeki
// @description		Fixes the link report queue TCF link to point to the right place, even when there's 0 links in queue.
// @include			http://endoftheinter.net/admin.php
// @include			https://endoftheinter.net/admin.php
// ==/UserScript==

var as = document.getElementsByTagName("a");
for(var x = 0; x < as.length; x++)
{
	if(as[x].innerHTML == "Secret moderator board")
	{
		as[x].href = 'showtopics.php?board=-84';
		break;
	}
}
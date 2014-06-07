// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name           Redirect facebook permalinks
// @namespace      splintor.wordpress.com
// @include        http://www.facebook.com/permalink.php?story_fbid=*
// ==/UserScript==

for(i in document.links)
{
	var link = document.links[i];
	if(link.parentNode.className == "UIStoryAttachment_Title" || link.parentNode.parentNode.className == "uiAttachmentTitle")
	{
		location.replace(link.href);
	}
}
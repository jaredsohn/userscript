// ==UserScript==
// @name           Remove Tom's Friend Subscription Updates
// @author         http://www.tehposse.org/brandon
// @version        1.0
// @namespace      RemoveTom
// @description    Removes Tom's friend subscription updates
// @include        *myspace.com*
// ==/UserScript==

window.addEventListener("load", function(e)
{
	var elements = document.evaluate("//a[contains(@href, 'http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=6221')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elements.snapshotLength > 0)
	{
		var temp = null;
		for (var i = 0; i < elements.snapshotLength; i++)
		{
			var thisElement = elements.snapshotItem(i);
			if(thisElement.parentNode.parentNode.parentNode.className == 'aggregatedActivities')
			{
				temp = thisElement.parentNode.parentNode.parentNode;
				temp.removeChild(thisElement.parentNode.parentNode);
			}
		}
    
		if (temp != null)
		{
			var children = temp.childNodes
			for (var i = 0; i < children.length; i++)
			{
				if(children[i].className == 'dateHdr' && children[i].className == children[i].nextSibling.className)
				{
					children[i].parentNode.removeChild(children[i]);
				}
			}
		}
	}	
}, false);
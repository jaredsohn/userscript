// ==UserScript==
// @name           phpBB sort topic list
// @namespace      http://www.pberndt.com/
// @description    phpBB sort read topics to the bottom of a search/forum
// @include        */search.php?search_id=newposts
// @include        */viewforum-f*.html
// @include        */viewforum.php?f=*
// ==/UserScript==

objects = document.evaluate("//table[@class='forumline']//tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i=0; i<objects.snapshotLength; i++)
{
	tr = objects.snapshotItem(i);
	if(typeof heading == "undefined")
		heading = tr;
	td = tr.childNodes[0].nodeName == "TD" ? tr.childNodes[0] : tr.childNodes[1];
	
	if(td.getAttribute("colspan") == 6)
		heading = tr;
	if(td.firstChild.nodeName != "IMG")
		continue;

	if(td.firstChild.src.match(/_new/))
	{
		heading.parentNode.insertBefore(tr, heading.nextSibling);
		heading = tr;
	}
}

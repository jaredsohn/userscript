// ==UserScript==
// @name           youtubelinks
// @namespace      ytl
// @description    display all video playlink IDs found on a youtube page, in an easy to copy/paste box at the bottom of the page.
// @include        http://*.youtube.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var vidid,lastid;



var plopup = document.createElement('div');
	plopup.setAttribute('style', 'width: 100%;background:#000000;color:#00ff00;');
	plopup.innerHTML = '';
document.body.insertBefore(plopup, document.body.lastChild);

	
	
for (var i = 0; i < allLinks.snapshotLength; i++)
{
    thisLink = allLinks.snapshotItem(i);
	
    // do something with thisLink
	
	
	var aa=thisLink.href.split("youtube.com/watch?v=");
	
	if(aa[1])
	{
		vidid=aa[1].substr(0,11);
		
		if( ( vidid != lastid) && thisLink.title )
		{
			lastid=vidid;
			
			plopup.innerHTML = plopup.innerHTML+vidid + " " + thisLink.title+"<br/>";

		}
		else
		if( ( vidid != lastid) && thisLink.firstChild.title )
		{
			lastid=vidid;
			
			plopup.innerHTML = plopup.innerHTML+vidid + " " + thisLink.firstChild.title+"<br/>";

		}
	}
}

plopup.innerHTML = "<code><br/><br/>"+plopup.innerHTML+"<br/><br/></code>";




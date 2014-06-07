// ==UserScript==
// @name Blackboard Link Fixer 2.0
// @description Fix all of the stupid links on CCISD e4
// @include https://e4.ccisd.net/*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++)
{
	thisLink = allLinks.snapshotItem(i);

	if (thisLink.getAttribute("onclick") != null)
	   thisLink.removeAttribute("onclick");

	if ((thisLink.href.indexOf('contentWrapper.jsp') == -1) || (thisLink.href.indexOf('href=') == -1))
	{
		continue;
	}
	//GM_log(thisLink.href + '\n' + thisLink.href.indexOf('contentWrapper.jsp') + '\n' + thisLink.href.indexOf('href='));
	var url = thisLink.href.substring(thisLink.href.indexOf('href=')+5);
	url = decodeURI(url);
	url = unescape(url);
	var ext = ((url.indexOf('http://') != -1) || (url.indexOf('https://') != -1));
	thisLink.href = (ext ? "" : 'https://e4.ccisd.net') + url;
	if (url.indexOf(".pdf") != -1)
	{
		thisLink.target = "_blank";
	}
}
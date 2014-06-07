// ==UserScript==
// @name          John Callaham Filter
// @description   Removes articles by John Callaham on NeoWin
// @match http://www.neowin.net/
// @match http://www.neowin.net/news/*
// ==/UserScript==

var newsElements = document.getElementsByTagName("address");
if(newsElements.length>0)
{
	var newsContainer = newsElements[0].parentNode.parentNode.parentNode;
	var removeQueue = new Array();
	var rq = 0;
	for (var i = 0; i < newsElements.length; i++)
	{
		children = newsElements[i].getElementsByTagName("a");
		if(children[0].getAttribute("href") == "/profile/john_callaham")
		{
			removeQueue[rq++] = newsElements[i].parentNode.parentNode;
		}
	}
	for (var i = 0; i < removeQueue.length; i++)
	{
		newsContainer.removeChild(removeQueue[i]);
	}
}

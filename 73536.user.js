// ==UserScript==
// @name EVE Search Thread Linker
// @namespace http://localhost
// @include   http://www.eveonline.com/*
// @description Adds a link to an Eve-search mirror of the thread.
// ==/UserScript==

(function makeEveSearchLink() {
	
	var threadID = location.search.match(/threadID=(\d*)/);
	if(threadID == null || threadID.length < 2)
		return;
	else
		threadID = threadID[1];
	var page = location.search.match(/page=(\d*)/);
	
	//Create the new link
	var link = document.createElement("a");
	var url = "http://eve-search.com/thread/" + threadID;
	if(page != null && page.length >= 2)
		url += "/page/" + page[1];
	link.setAttribute("href", url);
	//link.setAttribute("target", "_blank");	//Uncomment this line to make the link always open in a new window/tab
	link.textContent = "View on EVE Search";
	
	//Fetch the elements where the link should be inserted
	var iterator = document.evaluate("//td/nobr", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var nodes = new Array();

		for(var node = iterator.iterateNext(); node; node = iterator.iterateNext())
			nodes.push(node);
	//Insert the link
	for(var i = 0; i < nodes.length; i++)
	{
		nodes[i].insertBefore(document.createTextNode("\u00a0\u00a0\u00a0\u00a0| \u00a0\u00a0\u00a0\u00a0"), nodes[i].childNodes[0]);
		nodes[i].insertBefore(link.cloneNode(true), nodes[i].childNodes[0]);
	}
})();

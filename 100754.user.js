// ==UserScript==
// @name          Remove HFBoards Ad Bar
// @description	  This little script removes the right ad bar from our favorite hockey-centric cesspool, Hfboards.com, giving you 160px of space back.
// @include       http://www.hfboards.com/*
// @include       http://hfboards.com/*
// ==/UserScript==

(function()
{
	var nodes = document.getElementsByTagName("td"),
		box;
	for(var i=0;i<nodes.length;i++)
	{
		if(nodes[i].getAttribute("align") === "left" && nodes[i].getAttribute("width") === "160" && nodes[i].getAttribute("valign") === "top")
		{
			box = nodes[i];
			box.parentNode.removeChild(box);
			break;
		}
	}
}());
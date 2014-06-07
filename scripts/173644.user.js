// ==UserScript==
// @name        Newgrounds Art Download Links Reveal
// @namespace   scripts.namdx1987.org
// @description Reveal the links of arts on Newgrounds
// @include     http://www.newgrounds.com/art/*
// @version     1
// ==/UserScript==

function revealLinks()
{
	var thumbs=document.querySelectorAll("div#portal_item_list>a[class^='rated']>img");
	
	for(var i=0;i<thumbs.length;i++)
	{
		var th=thumbs[i];
		var parentAnchor=th.parentNode;
		if(parentAnchor.getAttribute("linkrevealed")=="done")
			continue;
		var imgsrc=th.src.replace("/thumbnails","/images");
		parentAnchor.href=imgsrc;
		parentAnchor.setAttribute("linkrevealed", "done");
	}
}

document.addEventListener("DOMNodeInserted", revealLinks);
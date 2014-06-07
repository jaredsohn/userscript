// ==UserScript==
// @name           XKCD comic alt
// @namespace      AKX
// @include        http://xkcd.com/*
// ==/UserScript==

(function()
{
	var imgs=document.images;
	for(i=0;i<imgs.length;i++)
	{
		var img=imgs[i];
		if(img.src.indexOf("comics/")>-1&&img.title)
		{
			var divEl=document.createElement("div");
			divEl.innerHTML="\""+img.title+"\"";
			img.parentNode.insertBefore(divEl,img.nextSibling);
		}
	}
})();
// ==UserScript==
// @name           projectplaylist download
// @namespace      http://userscripts.org/scripts/show/19730
// @description    download from projectplaylist! (:
// @include        *playlist.com/musicsearch*
// @include        *search.playlist.com*
// ==/UserScript==

var down = {
	init : function()
	{
		var xpath = document.evaluate("//a[@class='visitsite']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		down.change(xpath);
	},
	
	change : function(x)
	{
		for(i=0; i<x.snapshotLength; i++)
		{
			var elem = x.snapshotItem(i);
			if((/&originallink=/).test(elem.href))
			{
				var link = decodeURIComponent(elem.href.split("&originallink=")[1].split("&")[0]);
				if(link.substr(link.length-4,link.length) == ".mp3")
				{
					elem.innerHTML = "(download song)";
					elem.href = link;
				}
			}
		}
	}
}

down.init();
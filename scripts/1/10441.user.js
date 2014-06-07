// ==UserScript==

// @name           Newzbin redirect remover

// @namespace      newzbin

// @description    removes redirect from URL links (makes it a direct link)

// @include        http://v3.newzbin.com/*

// ==/UserScript==

(function() 
{
	var links = document.getElementsByTagName("a");
	for (var i=0;i<links.length;i++) {
		var href=links[i].href;
		if (href.length >= 26 && href.indexOf("http://v3.newzbin.com/r/?") == 0)
		{
			links[i].href = href.substring(25)
		}
	}
})();
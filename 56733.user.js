// ==UserScript==
// @name           Muelsfell Wiki Search
// @description    Search the Muelsfell Wiki on doubleclick.
// @include        http://muelsfell.com/*
// @include        http://www.muelsfell.com/*
// ==/UserScript==

	function launch(search_text)
	{
		var url='http://daryoon.hopto.org/mediawiki/index.php/'+
			'Special:Search?go=Go&search='+encodeURIComponent(search_text)
		GM_openInTab(url);
	}
	document.body.addEventListener("dblclick", function(e) 
	{ 
		var text=e.target.textContent.split('b>')
		//if (e.target.tagName==='b')
			launch(e.target.textContent);
	}, false);

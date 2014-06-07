// ==UserScript==
// @name           LLAdvancedSearch
// @namespace      bane427
// @description    Advanced search on LL
// @include        http://*.endoftheinter.net/*
// @include        http://endoftheinter.net/*
// @include        https://*.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// ==/UserScript==

var links = document.links;
//alert(links[3].href);
for(var i = 0; i < links.length; i++){
	
	if(links[i].href == "http://links.endoftheinter.net/links.php?mode=search"){
		//alert("search for links");
		links[i].href = "http://links.endoftheinter.net/lsearch.php?a";
	}else if(links[i].href.substring(0, 49) == "http://boards.endoftheinter.net/search.php?board="){
		//alert("search for topics");
		links[i].href = "http://boards.endoftheinter.net/search.php?as&board=" + links[i].href.substring(49);
	}
		
}
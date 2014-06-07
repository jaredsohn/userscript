// ==UserScript==
// @name           Digg Google search
// @namespace      http://www.userscripts.org
// @description    Searches Digg using Google
// @include        *digg.com*
// ==/UserScript==

	
	var oldSearch;
oldSearch = document.getElementById('search');
if (oldSearch) {

    //altText = document.createTextNode(theImage.alt);
    //theImage.parentNode.replaceChild(altText, theImage);
	
	oldSearch.innerHTML = '<form id="search" action="www.google.com/search"> ' +
    '<label class="inside" accesskey="2" for="top-keywords">Search the News...</label> ' +
    '<input type="hidden" name="q" value="site:digg.com">' +
    '<input id="top-submit" type="image" alt="Submit" src="/img/search.gif"/>' +
    '</form>';	
	
}
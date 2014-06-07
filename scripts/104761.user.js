// ==UserScript==
// @name           WhiteWolf Forum - Improved ( Google ) Search
// @namespace      forums.white-wolf.com
// @description    Improves whitewolf forums by replacing the search bar with a google sitesearch, its not perfect but it helps.
// @include        http://forums.white-wolf.com/*
// ==/UserScript==

function GoogleSearch()
{
	window.open("http://www.google.com/search?q=site:forums.white-wolf.com+" + document.getElementById("searchBox_txtInput").value)
}

function FixSearch()
{

	var SearchButton;
	SearchButton = document.getElementById("searchBox_btnSearch");
   
    
	
	var NewSearchButton = document.createElement('input');  
    NewSearchButton.name = 'GoogleSearchButton';  
    NewSearchButton.type = 'button';  
    NewSearchButton.value = 'Google Search';        
	NewSearchButton.addEventListener('click', GoogleSearch, true);
	
	SearchButton.parentNode.insertBefore(NewSearchButton, SearchButton.nextSibling);
	
	SearchButton.parentNode.removeChild(SearchButton);
	
	
}

FixSearch();


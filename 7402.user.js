// ==UserScript==
// @name           Digg Search replaced by a Google CSE with Hierarchies
// @namespace      http://digg.firoogle.com
// @description    Search digg.com using a cool custom Google search engine with hierarchical categories. The textbox will turn yellow to indicate that the google search is active. Double click the textbox to alternate between the default digg search and the advanced google search. Thanks to tagor for the basis of this script.
// @include        http://*digg.com/*
// ==/UserScript==

var oSearchForm = document.getElementById("search");
var oSearchInput, oSearchElement;
var bDiggSearch = false;

if (oSearchForm)
{
	oSearchInput = oSearchForm.getElementsByTagName("input");

	function SearchReplace()
	{

		for (i=0; i<oSearchInput.length; i++)
			if (oSearchInput[i].name && oSearchInput[i].name == "section")
			{
				oSearchForm.removeChild(oSearchInput[i]);
				oSearchInput[i] = null;
				break;
			}
		
		oSearchForm.method = "post";
		oSearchForm.action = "http://digg.firoogle.com/?cx=002718399818052009926%3Avbp6pxzdxhk&q=" + oSearchElement.value + "&sa=Search&cof=FORID%3A10#1229";
	  	
		return 0;
	};
	
	function DoubleClick()
	{
		if (bDiggSearch)
		{
			oSearchForm.addEventListener("submit", SearchReplace, false);
			oSearchElement.style.backgroundColor = "yellow";
		}
		else
		{
			oSearchForm.removeEventListener("submit", SearchReplace, false);
			oSearchElement.style.backgroundColor = null;

		}
		
		bDiggSearch = !bDiggSearch;
	}
	
	for (i=0; i<oSearchInput.length; i++)
		if (oSearchInput[i].name && oSearchInput[i].name == "s")
		{
			oSearchElement = oSearchInput[i];
			oSearchElement.style.backgroundColor = "yellow";			
			break;
		}

	oSearchElement.addEventListener('dblclick', DoubleClick, false);
	oSearchForm.addEventListener('submit', SearchReplace, false);
}
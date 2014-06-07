// ==UserScript==
// @name           Digg Search Replace
// @namespace      http://www.userscripts.org
// @description    Search digg.com with google instead of digg
// @include        http://digg.com/*
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
		
		oSearchElement.value = "site:digg.com " + oSearchElement.value;
		oSearchElement.name = "q";
		oSearchForm.action = "http://www.google.com/search";
		
		return 0;
	};
	
	function DoubleClick()
	{
		if (bDiggSearch)
		{
			oSearchForm.addEventListener("submit", SearchReplace, false);
			oSearchElement.style.color = null;
			oSearchElement.style.fontWeight = null;
		}
		else
		{
			oSearchForm.removeEventListener("submit", SearchReplace, false);
			oSearchElement.style.color = "#105CB6";
			oSearchElement.style.fontWeight = "bold";
		}
		
		bDiggSearch = !bDiggSearch;
	}
	
	for (i=0; i<oSearchInput.length; i++)
		if (oSearchInput[i].name && oSearchInput[i].name == "s")
		{
			oSearchElement = oSearchInput[i];
			break;
		}

	oSearchElement.addEventListener('dblclick', DoubleClick, false);
	oSearchForm.addEventListener('submit', SearchReplace, false);
}
// ==UserScript==
// @name       Grooveshark Ads Remover
// @namespace  http://nibbles.mx/
// @version    0.2
// @description  Removes Ads from Grooveshark :D
// @include    http://*grooveshark.com/*
// @copyright  2012, Rodrigo Garcia (nibblesmx)
// ==/UserScript==

function DeleteAds()
{
	var nastyDivs = ["capitalSidebar", "searchCapitalWrapper_728", "searchCapitalWrapper_300",  "musicCapitalWrapper_160"];
	for(var i = 0; i < nastyDivs.length; i++)
	{            
		var nastyDiv = document.getElementById(nastyDivs[i]);
		if(nastyDiv != null)
		{
			nastyDiv.parentNode.removeChild(nastyDiv);
		}
	}
}

document.addEventListener("DOMSubtreeModified", DeleteAds, false);

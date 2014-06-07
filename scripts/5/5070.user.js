// ==UserScript==
// @name           Depopupify
// @namespace      tag:kuno.meyer
// @description    Provides for links that explicitly open a popup window a second link without the popup code.
// @include        *
// ==/UserScript==

// Author: 
//	Kuno Meyer <kuno.meyer@gmx.ch>
//
// Version: 
//	0.7 (2006-11-01)	scan both href="" and onclick=""
//	0.6 (2006-10-17)	criteria for the common "openWin" handler
//	0.5 (2006-10-05)	make comparision whitespace-resistant, single&double quotes
//	0.4 (2006-09-25)	less restrictions on javascript: criteria (takes full strings)
//	0.3 (2006-08-12)	window.open() criteria handles relative paths
//	0.2 (2006-08-09)


var criteria = [
	/(?:javascript:.*['"])((https?:|[/.])[^'"]+)/i ,
	/(?:window\.open\(['"])([^'"]+)/i ,
	/(?:javascript:open(?:win)?\(['"])([^'"]+)/i ,
	];
	

var links = document.getElementsByTagName("a");

for (var i=0; i<links.length; ++i)
{
	var link = links[i];
	var url = 0;
	
	if (!url && link.href)
	{
		var linkhref = link.href.replace(" ", "", "g");	
	
		for (var j=0; j<criteria.length && !url; j++)
			url = criteria[j].exec(linkhref);
	}
	if (!url && link.hasAttribute("onclick"))
	{
		var linkhref = link.getAttribute("onclick").replace(" ", "", "g");	
	
		for (var j=0; j<criteria.length && !url; j++)
			url = criteria[j].exec(linkhref);
	}
	
	if (url)
	{
		var noPopupNode = document.createElement("a");
		noPopupNode.href = url[1];
		noPopupNode.innerHTML = "[&gt;]";
		noPopupNode.title = "open link without popup window";
		
		noPopupNode.style.fontSize = "70%";
		noPopupNode.style.marginLeft = "5px";
		noPopupNode.style.marginRight = "5px";
		
		link.parentNode.insertBefore(noPopupNode, link.nextSibling);
	}
}
// ==UserScript==
// @name           Delete eBay duplicate Results
// @namespace      ebay.de
// @description    Deletes all duplicate results on Ebay.
// @include        http://*search.ebay.de/*
// @include        http://*shop.ebay.de/*
// ==/UserScript==

var ergebnisse = getElementsByClass("nol", document, null);
var nichtDoppelte = new Array();

for(var n = 0; n < ergebnisse.length; n++)
{
	var element = ergebnisse[n];
	var beschreibungElement = getElementsByClass("details ttl", element, null)[0];
	try
	{
		var beschreibungString = beschreibungElement.lastChild.firstChild.nodeValue;
		var anzahlGefunden = 0;
		for(var z = 0; z < nichtDoppelte.length; z++)
		{
			if(beschreibungString == nichtDoppelte[z])
			{
				anzahlGefunden++;
			}
		}
		if(anzahlGefunden > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					gesucht = d;
					d = nodes.length;
				}
			}
			
			if(gesucht-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(gesucht-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			nichtDoppelte.push(beschreibungString);
		}
	}
	catch(e)
	{	
	}
}

var ergebnisse = getElementsByClass("nol litem2WithBorder", document, null);
for(var n = 0; n < ergebnisse.length; n++)
{
	var element = ergebnisse[n];
	var beschreibungElement = getElementsByClass("details", element, null)[0];
	try
	{
		var beschreibungString = beschreibungElement.firstChild.lastChild.firstChild.nodeValue;
		var anzahlGefunden = 0;
		for(var z = 0; z < nichtDoppelte.length; z++)
		{
			if(beschreibungString == nichtDoppelte[z])
			{
				anzahlGefunden++;
			}
		}
		if(anzahlGefunden > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					gesucht = d;
					d = nodes.length;
				}
			}
			
			if(gesucht-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(gesucht-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			nichtDoppelte.push(beschreibungString);
		}
	}
	catch(e)
	{	
	}
}


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
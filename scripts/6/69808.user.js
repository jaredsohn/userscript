// ==UserScript==
// @name           Delete eBay duplicate Results
// @namespace      ebay.com
// @description    Deletes all duplicate results on Ebay.
// @include        http://*search.ebay.com/*
// @include        http://*shop.ebay.com/*
// @include        http://desc.shop.ebay.com/*
// ==/UserScript==

var Results = getElementsByClass("li n", document, null);
var NotDuplicate = new Array();

for(var n = 0; n < Results.length; n++)
{
	var element = Results[n];
	var DescriptionElement = getElementsByClass("dtl ttl", element, null)[0];
	try
	{
		var DescriptionString = DescriptionElement.lastChild.firstChild.nodeValue;
		var NumberFound = 0;
		for(var z = 0; z < NotDuplicate.length; z++)
		{
			if(DescriptionString == NotDuplicate[z])
			{
				NumberFound++;
			}
		}
		if(NumberFound > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					Wanted = d;
					d = nodes.length;
				}
			}
			
			if(Wanted-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(Wanted-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			NotDuplicate.push(DescriptionString);
		}
	}
	catch(e)
	{	
	}
}

var Results = getElementsByClass("lview nol", document, null);
var NotDuplicate = new Array();

for(var n = 0; n < Results.length; n++)
{
	var element = Results[n];
	var DescriptionElement = getElementsByClass("ttl", element, null)[0];
	try
	{
		var DescriptionString = DescriptionElement.lastChild.firstChild.nodeValue;
		var NumberFound = 0;
		for(var z = 0; z < NotDuplicate.length; z++)
		{
			if(DescriptionString == NotDuplicate[z])
			{
				NumberFound++;
			}
		}
		if(NumberFound > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					Wanted = d;
					d = nodes.length;
				}
			}
			
			if(Wanted-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(Wanted-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			NotDuplicate.push(DescriptionString);
		}
	}
	catch(e)
	{	
	}
}


var Results = getElementsByClass("li n", document, null);
var NotDuplicate = new Array();

for(var n = 0; n < Results.length; n++)
{
	var element = Results[n];
	var DescriptionElement = getElementsByClass("ttl", element, null)[0];
	try
	{
		var DescriptionString = DescriptionElement.lastChild.firstChild.nodeValue;
		var NumberFound = 0;
		for(var z = 0; z < NotDuplicate.length; z++)
		{
			if(DescriptionString == NotDuplicate[z])
			{
				NumberFound++;
			}
		}
		if(NumberFound > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					Wanted = d;
					d = nodes.length;
				}
			}
			
			if(Wanted-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(Wanted-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			NotDuplicate.push(DescriptionString);
		}
	}
	catch(e)
	{	
	}
}

var Results = getElementsByClass("li n rh", document, null);
var NotDuplicate = new Array();

for(var n = 0; n < Results.length; n++)
{
	var element = Results[n];
	var DescriptionElement = getElementsByClass("ttl", element, null)[0];
	try
	{
		var DescriptionString = DescriptionElement.lastChild.firstChild.nodeValue;
		var NumberFound = 0;
		for(var z = 0; z < NotDuplicate.length; z++)
		{
			if(DescriptionString == NotDuplicate[z])
			{
				NumberFound++;
			}
		}
		if(NumberFound > 0)
		{			
			var nodes = element.parentNode.childNodes;
			for(var d = 0; d < nodes.length; d++)
			{
				if(nodes.item(d) == element)
				{
					Wanted = d;
					d = nodes.length;
				}
			}
			
			if(Wanted-2 >= 0)
			{
				element.parentNode.removeChild(nodes.item(Wanted-2));
			}
			element.parentNode.removeChild(element);
		}
		else
		{
			NotDuplicate.push(DescriptionString);
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
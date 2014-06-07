// ==UserScript==
// @name           Fjerner sport og bloggrelaterte artikler fra bt.no
// @namespace      RRB
// @include        http://www.bt.no/*
// ==/UserScript==


var hrefRegEx = /fotball|sport|blogg/i;


remove("fpItem");

remove("blockContainer");




function remove(className)
{
	var saker = document.getElementsByClassName(className);

	if (saker.length == 0) return;

	for (var i=0 ; i<saker.length ; i++)
	{
		var links = saker[i].getElementsByTagName("A");

		for (var q=0 ; q<links.length ; q++)
		{	
			if (links[q].href.match(hrefRegEx))
			{
				saker[i].innerHTML = "<p>*POFF*</p>";
				break;
			}
		}
	}
}



// ==UserScript==
// @name           Fjerner sportartikler fra ba.no
// @namespace      RRB
// @include        http://www.ba.no/*
// ==/UserScript==


var hrefRegEx = /fotball|sport|blogg/i;


remove("apiE1");

remove("apiE2");

remove("apiE4");

remove("apiSmall");

remove("apiMedium");

remove("apiLarge");

remove("apiExtraLarge");

remove("apiList");

remove("apiListExpanded");






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



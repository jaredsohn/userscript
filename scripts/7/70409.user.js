// ==UserScript==
// @name           Fjerner sport fra vg.no
// @namespace      RRB
// @include        http://www.vg.no/*
// ==/UserScript==


var hrefRegEx = /fotball|sport|blogg|.vgb.|vgmanager/i;


remove("article-extract");

remove("columnContent");

remove("sport");

remove("df-container");


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


// ==UserScript==
// @name           CSFD Movie Image
// @namespace      Catfood
// @include        http://www.csfd.cz/film/*
// @description    Tohle urcite oceni hlavne ti, co casto pracuji s obrazky filmu na CSFD. Uz neni potreba chodit do zdrojoveho kodu stranky, aby clovek ziskal odkaz na Poster neboli Plakat filmu. Timhle jednoduchym skriptem se, kryci obrazek blank.gif meni na skutecny Poste/Plakat filmu.
// ==/UserScript==


var links = document.getElementsByTagName("link");

	for (i = 0; i < links.length; i++)
		{
			if (links[i].hasAttribute("rel") && links[i].rel == "image_src")
				{
					var linkImage = links[i].href;
				}
		}
		
var blanks = document.getElementsByTagName("img");
	
	for (j = 0; j < blanks.length; j++)
		{
			if (blanks[j].hasAttribute("height") && blanks[j].height == "180")
				{					
					blanks[j].setAttribute("src", linkImage);			
				}
		}
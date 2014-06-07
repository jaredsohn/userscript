// ==UserScript==
// @name           Seloger ads remover
// @description    Removes ads, when browsing results of search
// @version        1.0
// @author         Ugo Robain
// @include        http://www.seloger.com/detail.htm*
// @include        http://www.seloger.com/recherche.htm*
// ==/UserScript==

(function ()
{
	var body = document.getElementsByTagName("body")[0];
	var h1 = document.createElement("h1");

	var tds = document.getElementsByTagName("td");

	for (var i = 0; i < tds.length ; i++) 
	{
		if(tds[i].id == "detailzone")
		{
			//document.write("detailzone");
			tds[i].width = "556px";
		}
			
		if(tds[i].className == "colright900")
		{
			//document.write("colright900");
			tds[i].parentNode.removeChild(tds[i]);
		}
	}
	
	var divs = document.getElementsByTagName("div");

	for (var i = 0; i < divs.length ; i++) 
	{
		if(	(divs[i].id == "pubmgn728") || 
			(divs[i].id == "rech_espacepub"))
		{
			divs[i].parentNode.removeChild(divs[i]);
		}
	}

	for (var n = 0 ; n < 3 ; n++) 
	{
		var h3s = document.getElementsByTagName("h3");
		for (var i = 0 ; i < h3s.length ; i++) 
		{
			if( (h3s[i].innerHTML == "Contacter l'annonceur") ||
				(h3s[i].innerHTML == "Outils") ||
				(h3s[i].innerHTML == "Situation") )
			{
				var elt = h3s[i].parentNode;
				
				while(elt.tagName != "TABLE")
					elt = elt.parentNode;
					
				elt.parentNode.removeChild(elt);
				break;
			}
		}
	}
}());


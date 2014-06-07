// ==UserScript==
// @name           humour1.com télécharger
// @author         Daniel Jibouleau
// @namespace      http://www.example.com/
// @description    Ajoute un bouton "Télécharger" dans la liste des diaporamas
// @include        http://www.humour1.com/humour/include.php?*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=0; i<links.length; i++)
{
	if (links[i].href.indexOf("include.php?path=content/download.php") != -1 && links[i].href.indexOf("download=go") == -1) 
	{
		links[i].parentNode.appendChild(document.createElement("p"));
		
		var link2 = document.createElement("a");
		link2.href = links[i].href + "&download=go";
		
		var img = document.createElement("img");
		img.src = "http://www.humour1.com/humour/images/download.gif";
		img.border = "0";
		link2.appendChild(img);
		
		links[i].parentNode.appendChild(link2);
	}
}

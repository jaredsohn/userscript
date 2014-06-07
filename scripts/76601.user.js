
/*
	FilmStarts.de 10-Sterne-Version
	(c) 05-2010 by skylight
	
	Bringt die 10-Sterne-Bewertungen wieder zurück auf FilmStarts.de
	
	Damit dieses UserScript funktioniert, muss zusätzlich der entsprechende
	UserStyle installiert werden.

	Dieses Script sowie der dazugehörige Style werden unter einer Creative Commons
	"Namensnennung-Keine kommerzielle Nutzung-Weitergabe unter gleichen Bedingungen
	2.5 Schweiz" Lizenz bereitgestellt.
	Weitere Informationen zur Lizenz finden sich auf folgender Internetseite:
	http://creativecommons.org/licenses/by-nc-sa/2.5/ch/
*/

// ==UserScript==
// @name           Filmstarts.de 10-Sterne-Version
// @namespace      scripts@skylight
// @description    Bringt die 10-Sterne-Bewertungen wieder zurueck auf Filmstarts.de
// @include        http://www.filmstarts.de/*
// @include        http://new.filmstarts.de/*
// ==/UserScript==

/* function for getting images by class */
function getclassimg(searchClass)
{
	var el = new Array();
	var tags = document.getElementsByTagName('img');
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++)
	{
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

/* get all stars */
var stars = getclassimg('stareval');

/* edit all stars */
for (i in stars)
{
	/* calculate 10-scale-stars from title attribute */
	var count = stars[i].title.replace(',','.')*2
	/* set title to new number */
	stars[i].title = count;
	/* create text container */
	var container = document.createElement("div");
	/* create text */
	var text = document.createTextNode("(" + count + ")");
	/* set container class */
	container.className = "getback10stars";
	/* put text into container */
	container.appendChild(text);
	/* add container to page */
	stars[i].parentNode.insertBefore(container, stars[i].nextSibling);
}

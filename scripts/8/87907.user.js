// Updated LinkBucks Skipper
// version 0.6
// 8-17-2009 modded 10-11-2010
// Copyright (c) 2008, Josh Margolis old mod by TwK, last mod by toxis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// All rights to the original creator.
//
// ==UserScript==
// @name          LinkBucks Skipper
// @description   Why wait for ads? Skip them.
// @include       *.linkbucks.com*
// @include       *.baberepublic.com*
// @include       *.blahetc.com*
// @include       *.linkgalleries.net*
// @include       *.linkseer.net*
// @include       *.placepictures.net*
// @include       *.picturesetc.com*
// @include       *.qvvo.com*
// @include       *.realfiles.net*
// @include       *.seriousfiles.com*
// @include       *.seriousurls.com*
// @include       *.thatsprime.com*
// @include       *.thesegalleries.com*
// @include       *.thesefiles.com*
// @include       *.thosegalleries.com*
// @include       *.tinybucks.net*
// @include       *.uberpicz.com*
// @include       *.ubervidz.com*
// @include       *.ubucks.net*
// @include       *.urlpulse.net*
// @include       *.viraldatabase.com*
// @include       *.youfap.com*
// @include       *.zxxo.net*
// @exclude       *www.linkbucks.com*
// ==/UserScript==

// Intermission
if(document.body.innerHTML.match("Please wait.."))
{
	var chaine = document.getElementsByTagName('noscript')[0].innerHTML;
	var balise1 = "a href=\"";
	var balise2 = "\"";

	var Resultat = getString(chaine, balise1, balise2);

	location.href = Resultat;
}
// Left frame or top frame
else if(document.getElementsByTagName('html')[0].innerHTML.match("linkBucksLeftFrame") || document.getElementsByTagName('html')[0].innerHTML.match("linkBucksTopFrame"))
{
	var chaine = document.getElementsByTagName('body')[0].innerHTML;
	var balise1 = "<iframe id=\"content\" src=\"";
	var balise2 = "\"";
	
	var Resultat = getString(chaine, balise1, balise2);

	parent.window.location = Resultat;	
}

function getString(chaine, balise1, balise2)
{
	var Resultat = chaine.substr(chaine.indexOf(balise1, 0) + balise1.length);
	Resultat = Resultat.substr(0, Resultat.indexOf(balise2, 0));
	return Resultat;
}
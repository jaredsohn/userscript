// Updated LinkBucks Skipper
// version 0.5
// 8-17-2009 modded 08-18-2010
// Copyright (c) 2008, Josh Margolis last mod by TwK
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

if(document.body.innerHTML.match("Site will load"))
{
//Skips if intermission
	var lien = document.getElementById("linkSkip");
	location.href = lien.href;
}
else if(document.body.innerHTML.match("topBanner"))
{
//Skips if topbar
	parent.window.location = parent.document.getElementById("frame2").src;
	
}
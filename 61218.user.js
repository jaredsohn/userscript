// LinkBucks Skipper
// version 0.4
// Last edit: Fixed the link grabbing part. I haven't look at this in ages. Sorry
// Also added new linkbucks websites and excluded linkbucks if you are making links
// 8-17-2009
// Copyright (c) 2008, otto Josh Margolis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          LinkBucks Skipper otto
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
	window.location = document.getElementById("lb_wrap").getElementsByTagName('a')[1].href;
}
else if(document.body.innerHTML.match("topBanner"))
{
//Skips if topbar
	parent.window.location = parent.document.getElementById("frame2").src;
	
}
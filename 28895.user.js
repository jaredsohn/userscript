// RYBICKY.NET Image Opener
// version 0.1 BETA!
// 2008-06-15
// Copyright (c) 2008, Radoslav Bielik
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// 
//
// ENGLISH
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// To uninstall, go to Tools/Manage User Scripts,
// select "RYBICKY.NET Image Opener", and click Uninstall.
//
// SLOVAK
// Toto je skript pre Greasemonkey (Firefox addon)
//
// Pre nainstalovanie je potrebny Greasemonkey: http://greasemonkey.mozdev.org/
// Po instalacii Greasemonkey restartujte Firefox a znova otvorte tento skript.
// Pre odinstalovanie otvorte Tools/Manage User Scripts,
// zvolte "RYBICKY.NET Image Opener" a kliknite "Uninstall"
//
// 
//
// ==UserScript==
// @name RYBICKY.NET Image Opener
// @namespace http://bielik.org
// @description Skript na otvaranie obrazkov vo forach na RYBICKY.NET v novom okne
// @include http://rybicky.net/forum/*
// ==/UserScript==

var hyperLinks = document.getElementsByTagName("a");

for(var i in hyperLinks)
{
	if(hyperLinks[i].title == "Fotka k příspěvku")
	{
		//alert("Found image link: " + hyperLinks[i].href);
		hyperLinks[i].target = "_blank";
	}
}

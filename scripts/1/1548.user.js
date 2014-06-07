// manga-news dot killer
// Copyright (c) 2005, LoÃÂ¯c Lacombe (damaki@free.fr)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ------------------------------------------------------------------------------------------
// Just a quick'n dirty script to get rid of those useless red dots and get the mangas' titles
// It was too painful for me to have to put my cursor over the tiny dot just to get to know the manga's title.
// ------------------------------------------------------------------------------------------
// ==UserScript==
// @name          Mangas-News Damn Dots Remover 1.0
// @namespace     http://www.damaki.com/thisWebSiteDoesNotExist/
// @description   Replace those useless red dots with some text
// @include       http://www.manga-news.com/*
// ==/UserScript==

var dotLinks, thisLink;
//searching for those annoying dots
dotLinks = document.evaluate(
	'//img[@src="interface/icon_status_red.gif"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

//iterating through the found ones
for (var i = 0; i < dotLinks.snapshotLength; i++)
{
	thisLink = dotLinks.snapshotItem(i);
	//Workaround for some extensions that swap alt and title properties
	if(thisLink.title)
		linkText=thisLink.title;
	else 
		linkText=thisLink.alt;

	newTextNode=document.createTextNode(linkText);
	//replace the damn thing with some reasonable text
	thisLink.parentNode.replaceChild(newTextNode, thisLink);

}

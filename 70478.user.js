// MAL Statistics Counter Ext!
// version 1.0
// 2010-03-03
// Copyright (c) 2009, Bastvera <bastvera@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MAL Anime Edit Tweaks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Statistics Counter Ext
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/panel.php
// @description    This script counts how statistics counters have changed since the last time you viewed panel site.   
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

var animeviews = GM_getValue('animeviews');
var mangaviews = GM_getValue('mangaviews');
var profileviews = GM_getValue('profileviews');
var signatureclicks = GM_getValue('signatureclicks');

if(animeviews==null){
	animeviews=0;
	GM_setValue('animeviews', animeviews);
}
if(mangaviews==null){
	mangaviews=0;
	GM_setValue('mangaviews', mangaviews);
}
if(profileviews==null){
	profileviews=0;
	GM_setValue('profileviews', profileviews);
}
if(signatureclicks==null){
	signatureclicks=0;
	GM_setValue('signatureclicks', signatureclicks);
}

var	lightLinkElements = document.evaluate(
    "//td[@class='lightLink']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < lightLinkElements.snapshotLength; i++){
	var lightLink = lightLinkElements.snapshotItem(i);
	
	if(lightLink.innerHTML.search("Entries")==-1){
		var currentNumber  = lightLink.nextSibling.nextSibling.innerHTML.replace(/<small>.*/,"").replace(/,/,"");
		
		if(lightLink.innerHTML.search("AnimeList Views")!=-1){
			GM_setValue('animeviews', currentNumber);
			currentNumber = currentNumber - animeviews;
		} else if(lightLink.innerHTML.search("MangaList Views")!=-1){
			GM_setValue('mangaviews', currentNumber);
			currentNumber = currentNumber - mangaviews;
		} else if(lightLink.innerHTML.search("Profile Views")!=-1){
			GM_setValue('profileviews', currentNumber);
			currentNumber = currentNumber - profileviews;
		} else if(lightLink.innerHTML.search("Signature Clicks")!=-1){
			GM_setValue('signatureclicks', currentNumber);
			currentNumber = currentNumber - signatureclicks;
		}
		
		var firstNode = lightLink.nextSibling.nextSibling.firstChild;
		var lastNode = lightLink.nextSibling.nextSibling.lastChild;
		if(firstNode==lastNode){
			var newElement = document.createElement('label');
			newElement.appendChild(document.createTextNode(' (+' + currentNumber + ')'));
			lightLink.nextSibling.nextSibling.appendChild(newElement); 
		}else{
			var newElement = document.createElement('label');
			newElement.appendChild(document.createTextNode('(+' + currentNumber + ') '));
			lightLink.nextSibling.nextSibling.insertBefore(newElement,lastNode); 
		}
	}
}
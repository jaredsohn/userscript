// MAL Quick Anime/Manga Edit Filter!
// version 1.1
// 2010-01-18
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
// select "MAL Quick Anime/Manga Edit Filter", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name				MAL Quick Anime/Manga Edit Filter
// @namespace		http://thayanger.neostrada.pl
// @include			http://myanimelist.net/editlist.php?type=anime
// @include			http://myanimelist.net/panel.php?go=editmanga
// @description 	This script add custom filter to anime/manga edit page
// @author			Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Add input text field
var	h1Elements = document.evaluate(
    "//h1",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var h1Element = h1Elements.snapshotItem(0);
var inputField = document.createElement('INPUT');
h1Element.appendChild(inputField);

//Get all anime titles
var	allElementsAnime = document.evaluate(
    "//td[@class='borderClass']//strong",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
//Get all manga odd titles
var	allElementsMangaFirst = document.evaluate(
    "//td[@class='borderClass bgColor1']//strong",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
//Get all manga even titles
var	allElementsMangaSecond = document.evaluate(
    "//td[@class='borderClass bgColor2']//strong",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//Get all
var allElements = []
var allCount = 0;
for (var i = 0; i < allElementsAnime.snapshotLength; i++){
		allElements[allCount] = allElementsAnime.snapshotItem(i);	
		allCount++;
}
for (var i = 0; i < allElementsMangaFirst.snapshotLength; i++){
		allElements[allCount] = allElementsMangaFirst.snapshotItem(i);
		allCount++;
}
for (var i = 0; i < allElementsMangaSecond.snapshotLength; i++){
		allElements[allCount] = allElementsMangaSecond.snapshotItem(i);
		allCount++;
}

//Listener ('keyup' -> search after every char , 'change' -> search on enter)
inputField.addEventListener('change',function () {
	for (var i = 0; i < allCount; i++){
		var animeRow = allElements[i];
		animeRow.parentNode.parentNode.style.display="none";
		var whatWeSearch = inputField.value;
		var animeName = animeRow.innerHTML;
		var finder = animeName.toLowerCase().search(whatWeSearch.toLowerCase());
		if(finder!=-1){
			 animeRow.parentNode.parentNode.removeAttribute('style');
		}
	}
},false)
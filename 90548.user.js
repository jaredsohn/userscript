// ==UserScript==
// @name           TafariForum NachOben
// @description    Fuegt einen UP Link bei jedem Posting hinzu
// @include        http://www.tafari.at/forum/*
// @include        https://www.tafari.at/forum/*
// @copyright      JollyJoker
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

//
// "Nach oben" Button Modifikation
//
var xp=document.evaluate("//div[@style='float: right; width: auto; vertical-align: top;']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
    var strongMoveTop = document.createElement('strong');
  	var aMoveTop = document.createElement('a');
  	var spacer = document.createTextNode(' -- ');
  	var aTxt = document.createTextNode(' UP ');
	aMoveTop.href = '#top';
	aMoveTop.appendChild(aTxt);
	strongMoveTop.appendChild(spacer);
	strongMoveTop.appendChild(aMoveTop);
    xp.snapshotItem(i).childNodes[0].appendChild(strongMoveTop);
}

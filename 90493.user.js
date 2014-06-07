// ==UserScript==
// @name           Tafariforum Kropfbutton Bewertung
// @description    Entfernt die Kropfbutton Bewertung im Tafariforum
// @include        http://www.tafari.at/forum/*
// @include        https://www.tafari.at/forum/*
// @copyright      JollyJoker
// @version        2.0.0
// ==/UserScript==

//
// Loescht die Bewertungen unterhalb des Postings
//
var deleteRating = true;
if (deleteRating) {
	var xp=document.evaluate("//*[@class='trow2 post_buttons ']",document,null,6,null);
	for(var i=xp.snapshotLength-1;i>=0;--i) {
		var cur=xp.snapshotItem(i);
		rating = cur.parentNode;
		cur.parentNode.parentNode.removeChild(rating);
	}
}
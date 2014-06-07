// ==UserScript==
// @name           TafariForum AdBlocker
// @description    Blocked Werbung im TafariForum
// @include        http://www.tafari.at/forum/*
// @include        https://www.tafari.at/forum/*
// @copyright      JollyJoker
// @version        1.3.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==


//
// Loescht die Amazon Werbung
//
var amazonBlock = document.getElementById('amazon_widget_DE_8002_0'); 
if (amazonBlock) { 
	amazonBlock.parentNode.removeChild(amazonBlock); 
}


//
// Loescht Hochbrueder Erdstrahlen Logo
//
var xp=document.evaluate("//a[@href='http://www.hochbuerder.org/erdstrahlen/']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
	xp.snapshotItem(i).parentNode.parentNode.removeChild(xp.snapshotItem(i).parentNode);
}


//
// Loescht Link Internationales Geocaching Portal
//
var xp=document.evaluate("//a[@href='http://www.geocaching-portal.com/']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
	xp.snapshotItem(i).parentNode.parentNode.removeChild(xp.snapshotItem(i).parentNode);
}


//
// Loescht den Header mit Logo und Werbung
//
var xp=document.evaluate("//div[@class='logo']",document,null,6,null);
for(var i=xp.snapshotLength-1;i>=0;--i) {
	xp.snapshotItem(i).parentNode.removeChild(xp.snapshotItem(i));
}
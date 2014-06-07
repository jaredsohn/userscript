// ==UserScript==
// @name           Morphing
// @description	   Grabs Items Quickly
// @namespace      http://userscripts.org/users/86406
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=2
// ==/UserScript==
var x = 650 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>Tarnfarben Krawk Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Tarnfarben Krawk Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if (document.body.innerHTML.indexOf('Graues Draik Verwandlungselixier') != -1) {
	var item = document.evaluate('//b[. = "Graues Draik Verwandlungselixier"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}

else if (document.body.innerHTML.indexOf('Baby - Poogle - Verwandlungselixier') != -1) {
	var item = document.evaluate('//b[. = "Baby - Poogle - Verwandlungselixier"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}



else if(document.body.innerHTML.indexOf('Lila Poogle - Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Lila Poogle - Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Zombie Cybunny Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Zombie Cybunny Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Maraquanisches Cybunny - Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Maraquanisches Cybunny - Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Piraten - Hissi - Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Piraten - Hissi - Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Feen - Draik - Verwandlungselixier') != -1){
var item= document.evaluate('//b[. = "Feen - Draik - Verwandlungselixier"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else { window.setTimeout(function(){window.location.reload() ;},x) ;}return;
// ==UserScript==
// @name           Fondotaticos (?) - Autoseleccion
// @description	   Selecciona los fondos de rareza mas elevada.
// @namespace      http://userscripts.org/users/86406
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=108
// ==/UserScript==
//Credited by wil, edit: Pirate&Lost Desert Eggs
var x = 1000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>Creepy Darigan Citadel Background') != -1){
var item= document.evaluate('//b[. = "Creepy Darigan Citadel Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if (document.body.innerHTML.indexOf('Tyrannian Concert Hall Background') != -1) {
	var item = document.evaluate('//b[. = "Tyrannian Concert Hall Background"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}

else if (document.body.innerHTML.indexOf('Fireworks Background') != -1) {
	var item = document.evaluate('//b[. = "Fireworks Background"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}


else if(document.body.innerHTML.indexOf('Creepy Cave Background') != -1){
var item= document.evaluate('//b[. = "Creepy Cave Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Tyrannian Volcano Lair Background') != -1){
var item= document.evaluate('//b[. = "Tyrannian Volcano Lair Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Underwater Background') != -1){
var item= document.evaluate('//b[. = "Underwater Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Artist Studio Background') != -1){
var item= document.evaluate('//b[. = "Artist Studio Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Broken Stained Glass Window Background') != -1){
var item= document.evaluate('//b[. = "Broken Stained Glass Window Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Classroom Background') != -1){
var item= document.evaluate('//b[. = "Classroom Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Shell Beach Background') != -1){
var item= document.evaluate('//b[. = "Shell Beach Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('A Grey Day Background') != -1){
var item= document.evaluate('//b[. = "A Grey Day Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Mystery Island Training School Background') != -1){
var item= document.evaluate('//b[. = "Mystery Island Training School Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Dreamy Pink Hearts Background') != -1){
var item= document.evaluate('//b[. = "Dreamy Pink Hearts Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Perfectly Flat Rock Quarry Background') != -1){
var item= document.evaluate('//b[. = "Perfectly Flat Rock Quarry Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Moltara City Background') != -1){
var item= document.evaluate('//b[. = "Moltara City Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Neogarden Background') != -1){
var item= document.evaluate('//b[. = "Neogarden Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Fire Painted Background') != -1){
var item= document.evaluate('//b[. = "Fire Painted Background"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}



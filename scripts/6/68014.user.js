// ==UserScript==
// @name           Librotasticos - Autoseleccion
// @description	   Selecciona los librotasticos de rareza mas elevada.
// @namespace      http://userscripts.org/users/86406
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=70
// ==/UserScript==
//Credited by wil, edit: Pirate&Lost Desert Eggs
var x = 1000 //set the refresh rate here.

if(document.body.innerHTML.indexOf('>Know Your Robot Petpet') != -1){
var item= document.evaluate('//b[. = "Know Your Robot Petpet"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if (document.body.innerHTML.indexOf('The Green Grundo Invasion') != -1) {
	var item = document.evaluate('//b[. = "The Green Grundo Invasion"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}

else if (document.body.innerHTML.indexOf('Scenic Kreludan Views') != -1) {
	var item = document.evaluate('//b[. = "Scenic Kreludan Views"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink
	}
	return;
}



else if(document.body.innerHTML.indexOf('Kreludor Versus Neopia') != -1){
var item= document.evaluate('//b[. = "Kreludor Versus Neopia"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kreludan Engineering') != -1){
var item= document.evaluate('//b[. = "Kreludan Engineering"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('How Purples Got Their Spots') != -1){
var item= document.evaluate('//b[. = "How Purples Got Their Spots"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Beam Me Aboard') != -1){
var item= document.evaluate('//b[. = "Beam Me Aboard"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Advanced Kreludan Physics') != -1){
var item= document.evaluate('//b[. = "Advanced Kreludan Physics"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Interplanetary Communications') != -1){
var item= document.evaluate('//b[. = "Interplanetary Communications"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kreludor Mining Corridor Maps') != -1){
var item= document.evaluate('//b[. = "Kreludor Mining Corridor Maps"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Alien Aisha Invasion') != -1){
var item= document.evaluate('//b[. = "Alien Aisha Invasion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('It Came From Kreludor') != -1){
var item= document.evaluate('//b[. = "It Came From Kreludor"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Guide to the Neocola Machine') != -1){
var item= document.evaluate('//b[. = "Guide to the Neocola Machine"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('The Big Book of Intermediate Evil Plots') != -1){
var item= document.evaluate('//b[. = "The Big Book of Intermediate Evil Plots"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kreludan Cookie Cookbook') != -1){
var item= document.evaluate('//b[. = "Kreludan Cookie Cookbook"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('The Moon Pop-Up Book') != -1){
var item= document.evaluate('//b[. = "The Moon Pop-Up Book"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kreludan Home Decorating') != -1){
var item= document.evaluate('//b[. = "Kreludan Home Decorating"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Situational Gravity Pranks') != -1){
var item= document.evaluate('//b[. = "Situational Gravity Pranks"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Binary Stars and You') != -1){
var item= document.evaluate('//b[. = "Binary Stars and You"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Easy Decor in Low Gravity Situations') != -1){
var item= document.evaluate('//b[. = "Easy Decor in Low Gravity Situations"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Get Organised Stay Organised') != -1){
var item= document.evaluate('//b[. = "Get Organised Stay Organised"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Kreludor Rainy Day Activity Book') != -1){
var item= document.evaluate('//b[. = "Kreludor Rainy Day Activity Book"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Mining Operations Technical Manual') != -1){
var item= document.evaluate('//b[. = "Mining Operations Technical Manual"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Games on Kreludor') != -1){
var item= document.evaluate('//b[. = "Games on Kreludor"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Zarex Diary') != -1){
var item= document.evaluate('//b[. = "Zarex Diary"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Build Your Own Telescope') != -1){
var item= document.evaluate('//b[. = "Build Your Own Telescope"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Laser Energy') != -1){
var item= document.evaluate('//b[. = "Laser Energy"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('How To Escape') != -1){
var item= document.evaluate('//b[. = "How To Escape"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Do The Moon Bounce') != -1){
var item= document.evaluate('//b[. = "Do The Moon Bounce"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('The Happy Orange Grundo') != -1){
var item= document.evaluate('//b[. = "The Happy Orange Grundo"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Galactic Adventures II') != -1){
var item= document.evaluate('//b[. = "Galactic Adventures II"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Dont Push That Button!') != -1){
var item= document.evaluate('//b[. = "Dont Push That Button!"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Grundo Beauty Book') != -1){
var item= document.evaluate('//b[. = "Grundo Beauty Book"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Yesterdays Future') != -1){
var item= document.evaluate('//b[. = "Yesterdays Future"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}

else if(document.body.innerHTML.indexOf('Space Fashion') != -1){
var item= document.evaluate('//b[. = "Space Fashion"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);if (item.snapshotLength > 0){item = item.snapshotItem(0);selectedlink=item.previousSibling.previousSibling;window.location = selectedlink}return;}


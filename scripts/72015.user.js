// ==UserScript==
// @name			Add Custom Avatar to Compact
// @description		Version 0.1 - Written by NatNit
// @include			*kingdomofloathing.com/charpane.php
// @include			*127.0.0.1:*/charpane.php
// @exclude			*forums.kingdomofloathing.com*
// ==/UserScript==

// MODIFY THESE LINES
// *******************
var avatarNumber = 1238926;
var charName = "Light Ninja";
// *******************

var centeredImage = document.createElement('center');
var customAvatar = document.createElement('img');
customAvatar.setAttribute('src','http://images.kingdomofloathing.com/otherimages/cavs/' + avatarNumber + '.gif');
centeredImage.appendChild(customAvatar);

var charLink;

var linkNodes = document.getElementsByTagName("a");
for (var i = 0; i < linkNodes.length; i++) {
	if (charName.toLowerCase() == linkNodes[i].innerHTML.toLowerCase()) {
		charLink = linkNodes[i].parentNode;
		break;
	}
}

if (charLink) {
	charLink.parentNode.insertBefore(centeredImage, charLink.nextSibling.nextSibling);
}
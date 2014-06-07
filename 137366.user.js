// ==UserScript==
// @name          directGelF
// @namespace     directGelF
// @version       1.5
// @description   direct link to all gelbooru images in search results+
// @updateURL     https://userscripts.org/scripts/source/137366.user.js
// @downloadURL   https://userscripts.org/scripts/source/137366.user.js
// @homepage      https://userscripts.org/scripts/show/137366
// @run-at        document-end
// @grant         GM_openInTab
// @include       http://gelbooru.com/*
// @match         http://gelbooru.com/*
// ==/UserScript==

if (typeof GM_openInTab === "undefined")
{
	GM_openInTab = window.open;
}

var els = document.getElementsByClassName("preview");

for(var x = 0; x < els.length; x++) 
{
	// Obtaining the final URL of the image
	var dir = els[x].src;
	dir = dir.split("thumbnails")[1] || dir.split("thumbs")[1]; // gelbooru sometimes can't decide one
	dir = dir.split('?')[0].replace("thumbnail_","");
	dir = "http://simg.gelbooru.com//images" + dir;
	
	// Setting original link to right click
	els[x].setAttribute('id',els[x].parentNode.href); // save url
    els[x].setAttribute('oncontextmenu',"return false;"); // block menu
	els[x].addEventListener('contextmenu', function(aEvent) {GM_openInTab(this.id);window.focus();}, true, true); // R-Click

	// Setting the new href
	els[x].parentNode.href = dir;
}

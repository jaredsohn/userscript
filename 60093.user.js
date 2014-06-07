// ==UserScript==
// @name           directDownloadWallpapers
// @include        http://www.widescreenwallpapersfree.com/*
// @include        http://widescreenwallpapersfree.com/*
// ==/UserScript==


var allLinks;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
	var innH=allLinks[i].href;
	if(innH.indexOf('?wallpaperid=')==-1) continue;
	else if(allLinks[i].innerHTML.indexOf("img src")==-1) continue;
	else {
		allLinks[i].href=innH.replace("wallpaper.php?wallpaperid=","images/5/") + ".jpg"; 
	}
}

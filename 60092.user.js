// ==UserScript==
// @name           quickImgDownload
// @namespace      widescreenwallpapersfree.com
// @include        http://images.google.co.in/*
// @include        http://images.google.com/*
// ==/UserScript==

var allLinks;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
	var innH=allLinks[i].href;
	if(innH.indexOf("?imgurl=")==-1) continue;
	else {
	var newLink = document.createElement("div");
	var newLinkAddr=innH.substr(innH.indexOf("?imgurl=")+8,innH.indexOf("&imgrefurl=")-innH.indexOf("?imgurl=")-8);
	newLink.innerHTML = "<a href='"+newLinkAddr+"'>View</a>";
    allLinks[i].parentNode.insertBefore(newLink, allLinks[i].nextSibling);
	}
}

//src="http://t0.gstatic.com/images?q=tbn:pSbMOgy4TqMqBM:http://z.about.com/d/christianity/1/0/Y/2/Christian_Alpha_Omega.png"

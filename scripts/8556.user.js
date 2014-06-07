// ==UserScript==
// @name           Pixpix Downloader
// @namespace      http://www.undergoogle.com/
// @description    Download All MP3 from PixPix
// @include        http*://*pixpix.net/*
// ==/UserScript==

var embeds = document.getElementsByTagName('embed');

for(i=0;i<=embeds.length;i++){
	sourcify(embeds[i]);
}

function sourcify(link) {
	linkSrc = link.src;
	id = linkSrc.indexOf("theFile=")+8;
	theSubLink = linkSrc.substr(id, linkSrc.length);
	var source_link = document.createElement("a");
	source_link.href = decode(theSubLink);
	source_link.style.color = '#FF0000';
	source_link.style.marginTop = '20px';

	source_link.appendChild(document.createTextNode("Download This Music"));

	var space = document.createElement("br");

	var parent = link.parentNode;
	parent.insertBefore(source_link, link.nextSibling);
	parent.insertBefore(space, link.nextSibling);

}

function decode(encoded) {
	return unescape(encoded.replace(/\+/g,  " "));
}
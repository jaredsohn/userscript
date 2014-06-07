// ==UserScript==
// @name           Last.FM Download Lookup
// @description    Script that adds some search links in last.fm artist pages.
// @include        http://last.fm/music/*
// @include        http://www.last.fm/music/*
// @include        http://lastfm.*/music/*
// @include        http://www.lastfm.*/music/*
// ==/UserScript==

var useSite = new Array(PirateBay = true, Torrentz = true, Rapidshare = true, Megaupload = true, Wikipedia = true, Google = true);
var useQuotes = new Array(PirateBay = false, Torrentz = true, Rapidshare = true, Megaupload = true, Wikipedia = true, Google = true);
var imgs = new  Array("http://thepiratebay.org/favicon.ico","http://www.torrentz.com/favicon.ico", "http://rapidshare.com/img2/favicon.ico","http://megaupload.com/favicon.ico","http://en.wikipedia.org/favicon.ico", "http://www.google.com/favicon.ico");

var prefixes = new Array("http://thepiratebay.org/search/","http://www.torrentz.com/search?q=","http://google.com/search?q=","http://google.com/search?q=","http://en.wikipedia.org/wiki/Special:Search?search=", "http://google.com/search?q=");
var suffixes = new Array("/0/7/100","","+rapidshare","+megaupload","", "");

var alts = new Array("Pirate Search","Lookup Torrentz","Lookup in Rapidshare","Lookup in Megaupload","Lookup in Wikipedia", "Lookup in Google");

main();

function main() {
	if(!artistPage()) return;
	var h1artist = document.getElementsByTagName("h1")[1]; 
	var links = makeLinks(getArtist(h1artist));
	if(links != null) {
		h1artist.appendChild(links);
	}
}
function artistPage() {
	var rest = location.href.split("/")[5]; 
	return rest?false:true;
}
function getArtist(artisth1) {
	var artist = artisth1.childNodes[0].nodeValue;
	return artist;
}
function makeLinks(artistName) {
	var container = document.createElement("span");
	for(var i = 0; i < prefixes.length; ++i) {
		if(useSite[i]) {
			addLink(container, prefixes[i], suffixes[i], artistName, useQuotes[i], imgs[i], alts[i]);
		}
	}
	return container;
}
function addLink(container, prefix, suffix, artistName, q, img, alt) {
	container.appendChild(document.createTextNode(" "));
	var newLink = document.createElement("a");
	newLink.setAttribute("href", prefix + (q?'"':'') + artistName + (q?'"':'') + suffix);
	newLink.setAttribute("id", alt + "Link");
	newLink.setAttribute("target","_blank");
	newLink.setAttribute("title",alt);
	var newImg = document.createElement("img");
	newImg.setAttribute("src", img);
	newImg.setAttribute("alt", alt);
	newLink.appendChild(newImg);
	container.appendChild(newLink);
}
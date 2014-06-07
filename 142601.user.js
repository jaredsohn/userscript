// ==UserScript==
// @name        Flixster2IsoHunt
// @namespace   Flixster2IsoHunt
// @description Creates a link from a movie's Flixster page to IsoHunt search
// @include     http://www.flixster.com/movie/*/
// @version     1
// ==/UserScript==


function addIshountLink(cssString) {

	var titleBlockElem = document.evaluate(
		"//h1[@class='title']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;

	var originalTitleText;
	try {
		originalTitleText = document.evaluate(
			"./span/text()",
			titleBlockElem,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue.replace(/^\s*/, "").replace(/\s*$/, "");
	} catch (err) {
		return;
	}
	
	console.debug("3:" + originalTitleText);

	/*
	var yearElem = document.evaluate(
		"./span[@class='nobr']",
		titleBlockElem,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
	*/
	
	console.debug("creating linkElem");
	var linkElem = document.createElement("a");
	linkElem.href = "http://www.isohunt.com/torrents/" + originalTitleText;

	var linkElem720p = document.createElement("a");
	linkElem720p.href = "http://www.isohunt.com/torrents/" + originalTitleText + " 720p";
	linkElem720p.style.fontSize = "8px";

	var linkElem1080p = document.createElement("a");
	linkElem1080p.href = "http://www.isohunt.com/torrents/" + originalTitleText + " 1080p";
	linkElem1080p.style.fontSize = "8px";

	console.debug("creating imgElem");
	var imgElem = document.createElement("img");
	imgElem.src = "http://static.isohunt.com/favicon.png";
	imgElem.width = 16;
	imgElem.height = 16;

	console.debug("inserting img into link");
	linkElem.appendChild(imgElem);
	
	console.debug("inserting txt into 720p link");
	linkElem720p.appendChild(document.createTextNode("720p"));
	
	console.debug("inserting txt into 1080p link");
	linkElem1080p.appendChild(document.createTextNode("1080p"));
	
	console.debug("inserting links into doc");
	titleBlockElem.appendChild(document.createTextNode(" "));
	titleBlockElem.appendChild(linkElem);
	titleBlockElem.appendChild(document.createTextNode(" "));
	titleBlockElem.appendChild(linkElem720p);
	titleBlockElem.appendChild(document.createTextNode(" "));
	titleBlockElem.appendChild(linkElem1080p);
	
	console.debug("done");
}

document.addEventListener("DOMContentLoaded", addIshountLink, false);
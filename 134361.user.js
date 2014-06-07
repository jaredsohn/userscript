// ==UserScript==
// @name        IMDb2IsoHunt
// @namespace   IMDb2IsoHunt
// @description Creates a link from a movie's IMDb page to IsoHunt search
// @include     http://www.imdb.com/title/tt*/
// @version     1.1
// ==/UserScript==

function strRemove(original, charToRemove) {
	console.log("log 1");
	var retVal = '';
	var c;
	console.log("log 2");
	for (var i = 0; i < original.length; ++i) {
		console.log(i);
		c = original.charAt(i);
		if (c !== charToRemove)
			retVal = retVal.concat(c);
	}

	return retVal;
}

function addIshountLink(cssString) {
	var titleBlockElem = document.evaluate(
		"//td[@id='overview-top']/h1[@class='header']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;

	var originalTitleText;
	try {
		originalTitleText = document.evaluate(
			".//span[@class='title-extra']/text()",
			titleBlockElem,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue.replace(/^\s*/, "").replace(/\s*$/, "");
		originalTitleText =  strRemove(originalTitleText, '"');
	} catch (err) {
		return;
	}

	if (originalTitleText == "") {
		originalTitleText = document.evaluate(
			".//span[@class='itemprop']//text()",
			titleBlockElem,
			null,
			XPathResult.STRING_TYPE,
			null
		).stringValue.replace(/^\s*/, "").replace(/\s*$/, "");
		originalTitleText = strRemove(originalTitleText, '"');
	}
	console.debug("3:" + originalTitleText);


	var yearElem = document.evaluate(
		"./span[@class='nobr']",
		titleBlockElem,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;


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
	yearElem.appendChild(document.createTextNode(" "));
	yearElem.appendChild(linkElem);
	yearElem.appendChild(document.createTextNode(" "));
	yearElem.appendChild(linkElem720p);
	yearElem.appendChild(document.createTextNode(" "));
	yearElem.appendChild(linkElem1080p);

	console.debug("done");
}

document.addEventListener("DOMContentLoaded", addIshountLink, false);
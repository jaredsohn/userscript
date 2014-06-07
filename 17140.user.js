// ==UserScript==
// @name         LJ YouTube Linker
// @namespace    http://twilite.org/~xtina/scripts/
// @description  Replaces embedded content from LJ with a text link.
// @include      http://*.livejournal.com/*
// ==/UserScript==

// If placeholder'd...
var allTubes = document.evaluate(
	"//div[@class='LJ_Placeholder_Container']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allTubes.snapshotLength; i++) {
	var thisTube = allTubes.snapshotItem(i);

// Remove the styles and images.
	thisTube.removeAttribute("style");
	thisTube.removeChild(thisTube.getElementsByTagName('a')[0]);
	
// Get the hex stuff and pluck out the href part.
	var hexText = thisTube.getElementsByTagName('div')[0].firstChild.nodeValue;
	var afts = new RegExp("^%3C%69%66%72%61%6D%65%20%73%72%63%3D%22(.*)%22%20%77.*%3E$", "gi");
	var news = hexText.replace(afts, "$1");
	news = unescape(hexText.replace(afts, "$1"));

// Create the new link.
	var newTube = document.createElement('a');
	newTube.setAttribute('href', news);
	newTube.appendChild(document.createTextNode('[YouTube Link]'));
	thisTube.parentNode.insertBefore(newTube, thisTube.nextSibling);
	thisTube.parentNode.removeChild(thisTube);
}

// What if they don't have them enabled?
allTubes = document.evaluate(
	"//iframe[@class='lj_embedcontent']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < allTubes.snapshotLength; i++) {
	thisTube = allTubes.snapshotItem(i);
	newTube = document.createElement('a');
	newTube.setAttribute('href', thisTube.getAttribute("src"));
	newTube.appendChild(document.createTextNode('[YouTube Link]'));
	thisTube.parentNode.insertBefore(newTube, thisTube.nextSibling);
	thisTube.parentNode.removeChild(thisTube);
}
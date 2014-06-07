// ==UserScript==
// @name          Demoscene TV
// @namespace     http://www.demoscene.tv/
// @description   watch tv stream on Demoscene TV website
// @include       http://www.demoscene.tv/*
// ==/UserScript==

var nsvplay = document.getElementById("nsvplayx");
if (nsvplay)
{
	var allElements, thisElement;
	allElements = document.evaluate(
	    "//param[@NAME='Location']",
	    nsvplay,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	if (allElements.snapshotLength > 0) {
	    thisElement = allElements.snapshotItem(0);

	    var emb = document.createElement("embed");
	    emb.name = "nsvmplayer";
	    emb.type = "application/x-nsv-vp3-mp3";
	    emb.src = thisElement.getAttributeNode("VALUE").value;
	    emb.height = nsvplay.height;
	    emb.width = nsvplay.width;

	    nsvplay.appendChild(emb);

	    allElements = document.evaluate(
	    	"//input[@type='button']",
	    	document,
	    	null,
	    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    	null);
	    for (var i = 0; i < allElements.snapshotLength; i++) {
	    	thisElement = allElements.snapshotItem(i);
	    	if (thisElement.value == 'Play' ||
		    thisElement.value == 'Stop' ||
		    thisElement.value == 'Fullscreen') {
		    thisElement.style.visibility = 'hidden';
	    	}
	    }
	}
}

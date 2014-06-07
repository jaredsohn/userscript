// ==UserScript==
// @namespace		http://www.ryanland.com/greasemonkey
// @name			Eliminate answers.yahoo.com from Google results
// @include			http://www.google.com/*
// @include			https://encrypted.google.com/*
// @description		Make it as though that cesspool of inanity never existed.
// ==/UserScript==

function noanswers () {

	xpath="//a[contains(@href,'answers.yahoo') and @class='l']/../../../.."
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		cand.setAttribute("class",cand.getAttribute("class")+" no_show");
	}
	
	var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	var ss = document.createElement("style");
	var t = document.createTextNode(".no_show { opacity: 0.1; } .candNum { display: inline-block; padding-right: .5em; }");
	ss.appendChild(t);
	ss.setAttribute("type","text/css");
	ss.setAttribute("id","candNumStylesheet");
	root.appendChild(ss);

	pageStart = location.search.split(/start=/)[1];
	if (pageStart) { pageStart = pageStart.split(/&/)[0]-0 };
	pageStart = (pageStart > 0) ? pageStart : 0;
	xpath="//span[@class='tl']"
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		candNum = document.createTextNode(i+1+pageStart);
		candNumDiv = document.createElement("div");
		candNumDiv.setAttribute("class","candNum");
		candNumDiv.setAttribute("id","cand_num_"+i);
		candNumDiv.appendChild(candNum);
		candNumInserted = cand.insertBefore(candNumDiv,cand.childNodes[0]);
	}

}
window.setTimeout(noanswers, 200);

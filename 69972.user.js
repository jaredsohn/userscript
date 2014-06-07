// ==UserScript==
// @name          IMDb AKA
// @namespace     http://userscripts.org/users/helmut
// @description   Amends the title on IMDb film pages to the form "Original Title AKA English Title".
// @include       http://www.imdb.com/title/*
// @author        Helmut
// @version       0.1
// ==/UserScript==

(function () {
	url = window.location.href;
	idStart = url.indexOf("title") + 6;
	id = url.substring(idStart, url.indexOf("/", idStart));
	query = "//a[@href='/title/" + id + "/releaseinfo#akas']";
	akas = document.evaluate(query, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(akas.snapshotLength == 1) {
		text = akas.snapshotItem(0).parentNode.firstChild.nodeValue;
		original = text.substring(1, text.indexOf("\"", 1));
		parent = document.getElementById("tn15title").childNodes[1];
		english = parent.firstChild.nodeValue;
		a = document.createElement("a");
		a.innerHTML = "<a>" + original + "<a style='color:silver;font-size:large'> AKA " + english + "</a></a>";
		parent.replaceChild(a, parent.firstChild);
		document.title = original + " AKA " + document.title;
		document.getElementById("tn15crumbs").childNodes[3].innerHTML = document.title;
	}
})();
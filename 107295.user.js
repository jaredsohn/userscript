// ==UserScript==
// @name           Flickr Hotbox Casio-free
// @description    Hide topics by Casio on FLickr Hotbox discussion page.
// @include        http://www.flickr.com/groups/hbu/discuss/*
// @version        1.1
// ==/UserScript==

var casioTopics = [], casioHidden, toggleLink, toggleStr = "casio-toggleLink";

function init(){
	casioHidden = true;

	// find casio topics and store them for later
	el = document.evaluate(
		'//tr/td/a[@href="/photos/casiocasiocasio/" or @href="/photos/trrrfffggttr444/"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i = 0; i < el.snapshotLength; i++) {
		var cel = el.snapshotItem(i).parentNode.parentNode;
		casioTopics.push(cel);
	}

	// insert hide/show Casio link
	var el = document.evaluate(
		'/html/body/div[3]/table[3]/tbody/tr/th',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	toggleLink = document.createElement("strong");
	toggleLink.addEventListener("click", toggleCasio, true);
	toggleLink.innerHTML = " (<span id=\""+toggleStr+"\" style=\"cursor: pointer; weight: bold; color: #0063DC;\"></span>)";

	// insert the link
	el.snapshotItem(0).appendChild(toggleLink);
	toggleCasio();
}

function toggleCasio(){
	var casioDisplay = casioHidden ? "none" : "table-row";

	for (var i = 0; i < casioTopics.length; i++){
		casioTopics[i].style.display = casioDisplay;
	}

	casioHidden = !casioHidden;
	document.getElementById(toggleStr).innerHTML = casioHidden ? "hide Casio" : "show Casio";
}

init();
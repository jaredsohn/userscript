// ==UserScript==
// @name           eRep ESProgress Fix
// @namespace      ePseudoParadise
// @version        1.0
// @description    Adds another progress bar on work page when skill level > 10
// @include        http://economy.erepublik.com/*/work
// @include        http://economy.erepublik.com/*/work/*
// @exclude        http://economy.erepublik.com/*/work/result/*
// ==/UserScript==

//var console = unsafeWindow.console;

var trackerPath  = "//div[@class='skill_tracker']";
var progressPath = "//div[@class='progress']";

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function fixTracker() {
	var progress = xpath(progressPath).snapshotItem(0);
	var pWidth = progress.style.width.replace("px","");

	if (pWidth > 489) {
		progress.style.width = "489px";

		var tracker = xpath(trackerPath).snapshotItem(0);
		var secondTrack = tracker.appendChild(progress.parentNode.cloneNode(true));
		secondTrack.childNodes[3].style.width = pWidth - 489 + "px";

		var newLabels = document.createElement('ul');
		newLabels.innerHTML = '<ul><li>Guru**</li><li>Guru***</li><li>Guru****</li><li>Guru 5</li><li>Guru 6</li><li>Guru 7</li><li>Guru 8</li><li>Guru 9</li><li>Guru 10</li><li>Guru 11</li></ul>';
		tracker.appendChild(newLabels);
	}
}

fixTracker();
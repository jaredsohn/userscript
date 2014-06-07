// ==UserScript==
// @name           Sosyomat SPAM Remover by BX!
// @namespace      http://*.sosyomat.com/*
// @include        http://*.sosyomat.com/*
// ==/UserScript==
function removeElements (xPath) {
	var thisElement, allElements = document.evaluate(xPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (f = 0; f < allElements.snapshotLength; f++) {
		thisElement = allElements.snapshotItem(f);
		thisElement.parentNode.removeChild(thisElement);
	}
}


//	<embed style="width: 350px; height: 288px;" id="VideoPlayback" type="application/x-shockwave-flash" src="http://video.google.com/googleplayer.swf?docId=1404303691278228634&amp;hl=en">
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=1404303691278228634')]");
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=1725876326566908896')]");
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=7625314891127174217')]");
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=-4565160776946270179')]");
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=1867772866803155139')]");
removeElements ("//embed[contains(@src,'googleplayer.swf?docId=-8175228341447475621')]");




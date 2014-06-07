// Re-written December 2, 2006
// removes all ylt strings and ylu strings all with 600 fewer characters of code than the previous version.
// v. 3.1

// ==UserScript==
// @name          Yahoo Link Tracking Removal NEW
// @namespace     http://www.digivill.net/~joykillr
// @description	  Remove Yahoo Link Tracking (ylt, ylu) strings from yahoo links
// @include       http://*.yahoo.com/*
// ==/UserScript==

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
	
function checkpath(ylstr) {
	var nodes = xpath(document, "//a[contains(@href,'" + ylstr + "')]");
	for (var x=0; x<nodes.snapshotLength; x++) {
		nhr = nodes.snapshotItem(x).href;
		ylsIdx = nhr.indexOf(ylstr);
		if ((nhr.charAt(ylsIdx - 1).match(/\;/)) || (nhr.charAt(ylsIdx - 1).match(/\?/))) {
			yString	= nhr.substr(ylsIdx,(nhr.substring(ylsIdx).indexOf("?")));
		} else if (nhr.charAt(ylsIdx - 1).match(/\//)) {
			yString	= nhr.substr(ylsIdx,(nhr.substring(ylsIdx).indexOf("\/")));
		}
		if (yString) {
			yStrLen = yString.length;
			finalStrA = nhr.substring(0,ylsIdx - 1);
			finalStrB = nhr.substring(ylsIdx + yStrLen);
			nodes.snapshotItem(x).href = finalStrA + finalStrB;
		} else {
			nodes.snapshotItem(x).href = nhr.substring(0, ylsIdx - 1);
		}
	}
}

	var y, goStr, nhr, ylsIdx, yString, yStrLen, finalStrA, finalStrB;
	var strNames = new Array("_ylt=", "_ylu=");  // really, any delimited value could be added here
	for (y=0;y<strNames.length;y++) {
		goStr = strNames[y];
		checkpath(goStr);
	}
		
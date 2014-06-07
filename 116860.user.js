// ==UserScript==
// @name           Kardashian Kickr
// @namespace      http://userscripts.org/Kardashian_Kickr
// @description    Overrated, overexposed and over here! (no more)
// @include        *
// @exclude        http://userscripts.org/*
// @exclude        https://userscripts.org/*
// ==/UserScript==

function Kick_Kardashian() {

  	var elements = document.evaluate(
  			
	  "//*[contains(text(),		'ardashian')] | \
		//*[contains(@*, 				'ardashian')] | \
		//*[contains(text(),		'Bieber')] | \
		//*[contains(text(),		'bieber')] | \
		//*[contains(@*,				'Bieber')] | \
		//*[contains(@*, 				'bieber')]",
		
		
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		thisElement.parentNode.style.display = "none";
	}
}

document.addEventListener("DOMNodeInserted", Kick_Kardashian, true);
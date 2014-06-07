// ==UserScript==
// @name           Google Groups Redirect To Topic List view
// @namespace      userscripts.org
// @description    Automatically changes from the "Topic Summary" view to the "Topic list" view in google groups.
// @include        http://groups.google.com/group/*
// ==/UserScript==

(function(){
	var singleLinks = document.evaluate( '/html/body/table/tbody/tr/td/div[2]//a' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (var s = 0; s < singleLinks.snapshotLength; s++){
		
		if(singleLinks.snapshotItem(s).textContent == "Topic list"){

			window.location = singleLinks.snapshotItem(s).href;

		}

	}
})();
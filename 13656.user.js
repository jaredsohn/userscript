// ==UserScript==
// @name           Welcome Back Mefite
// @namespace      metafilter
// @description    changes the new 'welcome back' message to 'GYOFB'
// @include        http://www.metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {
	var searchPattern = "//div[@class='mefimessages']";
	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	var i;
	for (var class = null, i = 0; (class = options.snapshotItem(i)); i++) {	
		var oldMessage = class.innerHTML;
		var myMessage = oldMessage.replace("welcome back", "GYOFB");
		class.innerHTML = myMessage;
	}	
})();
	
	
// ==UserScript==
// @name          MultiFavorited
// @namespace      http://www.metafilter.com/user/25038
// @description   Highlights multifavorited comments; cannibalized from flatluigi's script
// @include        http://www.metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {

	// Threshold; at this number or higher the comment will be highlights
	var threshold = 7;

	// Highlighting colors, change to match your preferences!
	var MetaHighlight='#337dc3;';
	var askMeHighlight='#47cf4a';
	var TalkHighlight='#888888';
	
	var searchPattern = "//a[contains(@title,'marked this as favorite')]";

	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


	var i;
	for (var class = null, i = 0; (class = options.snapshotItem(i)); i++) {	
		var favCount=class.title.replace(/[^0-9]*([0-9]+) users? marked this as.*/,'$1');
		if (favCount >= threshold) {
			var commentNode=class;
			while (commentNode.nodeName != "DIV") {
				commentNode = commentNode.parentNode;
			}
			commentNode.style.borderLeft='10px solid black';
			commentNode.style.paddingLeft='5px';
			commentNode.style.marginLeft='60px';
			
			if (document.location.hostname.indexOf('www')==0)
				commentNode.style.borderColor=MetaHighlight;
			if (document.location.hostname.indexOf('ask')==0)
				commentNode.style.borderColor=askMeHighlight
			if (document.location.hostname.indexOf('metatalk')==0)
				commentNode.style.borderColor=TalkHighlight;
		};
	}	
})();
	

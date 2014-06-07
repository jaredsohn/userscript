// ==UserScript==
// @name          Metafilter Heavy Discussion Count
// @namespace      http://www.metafilter.com/user/25038
// @description   Highlights posts with lots of comments
// @include        http://www.metafilter.com
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {

	// Threshold; at this number or higher the comment will be highlights
	var threshold = 50;

	// Highlighting colors, change to match your preferences!
	var MetaHighlight='#337dc3;';
	var askMeHighlight='#47cf4a';
	var TalkHighlight='#888888';
	
	var searchPattern = "//a[contains(@class,'more')]";

	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	var i;
	for (var klass = null, i = 0; (klass = options.snapshotItem(i)); i++) {	
		var cmtCount=klass.textContent.replace(/[^0-9]*([0-9]+) comments?.*/,'$1');
		if (cmtCount >= threshold) {
			var commentNode=klass;
			while (commentNode.nodeName != "DIV") {
				commentNode = commentNode.parentNode;
			}
			commentNode.style.borderLeft=''+(Math.round(cmtCount/50)+2)+'px solid black';
			commentNode.style.paddingLeft='5px';
			commentNode.style.marginLeft=''+(50-(Math.round(cmtCount/50)+2))+'px';
			
			if (document.location.hostname.indexOf('www')==0)
				commentNode.style.borderColor=MetaHighlight;
			if (document.location.hostname.indexOf('ask')==0)
				commentNode.style.borderColor=askMeHighlight
			if (document.location.hostname.indexOf('metatalk')==0)
				commentNode.style.borderColor=TalkHighlight;
		};
	}	
})();
	

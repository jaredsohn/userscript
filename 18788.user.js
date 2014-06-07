// ==UserScript==
// @name          Metafilter MultiFavorited Multiwidth - November Experiment
// @namespace      http://www.metafilter.com/user/25038
// @description   Code adjusted to deal with the "November Experiment" (see http://metatalk.metafilter.com/18396/November-is-National-Lets-Try-Obscuring-Favorite-Counts-Month)
// @include        http://www.metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

(function () {

	// Threshold; at this number or higher the comment will be highlights
	var threshold = 2;

	// Highlighting colors, change to match your preferences!
	var MetaHighlight='#337dc3';
	var askMeHighlight='#47cf4a';
	var TalkHighlight='#888888';
	
	var searchPattern = "//a[contains(@title,'marked this as favorite')]";

	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	if (options.snapshotLength == 0 ) {
		var options = document.evaluate( searchPatternFavesOff, document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}

	var i;
	for (var klass = null, i = 0; (klass = options.snapshotItem(i)); i++) {	
		var favCount=klass.title.replace(/^[^0-9]*([0-9]+)[^0-9]+$/,'$1');
		if (favCount >= threshold) {
			var commentNode=klass;
			while (commentNode.nodeName != "DIV") {
				commentNode = commentNode.parentNode;
			}
			commentNode.style.borderLeft=''+((favCount/2)+1)+'px solid';
			commentNode.style.paddingLeft='5px';
			commentNode.style.marginLeft=''+(70-((favCount/2)+1))+'px';
			
			if (document.location.hostname.indexOf('www')==0)
				commentNode.style.borderColor=MetaHighlight;
			if (document.location.hostname.indexOf('ask')==0)
				commentNode.style.borderColor=askMeHighlight
			if (document.location.hostname.indexOf('metatalk')==0)
				commentNode.style.borderColor=TalkHighlight;
		};
	}	
})();
	

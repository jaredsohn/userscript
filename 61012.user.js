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
	var MetaHighlight='#337dc3;';
	var askMeHighlight='#47cf4a';
	var TalkHighlight='#888888';
	
	var searchPattern = "//span[@class='oldFav']";

	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );


	var i;
	for (var class = null, i = 0; (class = options.snapshotItem(i)); i++) {	
		var favCount=class.textContent.replace(/[^0-9]*([0-9]+) favorites?.*/,'$1');
		if (favCount >= threshold) {
			var commentNode=class;
			while (commentNode.nodeName != "DIV") {
				commentNode = commentNode.parentNode;
			}
			commentNode.style.borderLeft=''+(Math.round(favCount/2)+1)+'px solid black';
			commentNode.style.paddingLeft='5px';
			commentNode.style.marginLeft=''+(70-(Math.round(favCount/2)+1))+'px';
			
			if (document.location.hostname.indexOf('www')==0)
				commentNode.style.borderColor=MetaHighlight;
			if (document.location.hostname.indexOf('ask')==0)
				commentNode.style.borderColor=askMeHighlight
			if (document.location.hostname.indexOf('metatalk')==0)
				commentNode.style.borderColor=TalkHighlight;
		};
	}	
})();
	

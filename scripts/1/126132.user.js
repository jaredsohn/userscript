// ==UserScript==
// @name           POF Enhance - images
// @namespace      tag:pof
// @description    Enhance POF - popup imags on all thumbails
// @include        http://www.pof.com/*
// @include        http://www.plentyoffish.com/*
// @require        http://userscripts.org/scripts/source/100842.user.js
// ==/UserScript==

function inject_mouseover() {
	// Select:	
	// * <img src="http://pics.pof.com/thumbnails...
	// * onmouseout empty
	// * onmouseover (assumed) empty
	images = document.evaluate("//img[contains(@src,'/thumbnails/')][not(@onmouseover)]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for(var i=0; i<images.snapshotLength; i++) {
		image = images.snapshotItem(i);
		// Change 'thumbnails' in the URL to 'dating' to get the full size image, e.g.:
		//   http://pics.pof.com/thumbnails/81/33/mseqntvqoh_144830557.jpg
		//    -> http://pics.pof.com/dating/81/33/mseqntvqoh_144830557.jpg
		image.addEventListener('mouseover', function(event){ unsafeWindow.showtrail(event.target.src.replace('thumbnails','dating'),225); } );
		image.addEventListener('mouseout', function(){ contentEval("hidetrail();"); } );
	};

	// Search pages are missing the trailimage absolute positioning
	var trailimage = document.getElementById('trailimageid');
	trailimage.style.position='absolute';
}

// Use Content Script Injection (http://wiki.greasespot.net/Content_Script_Injection)
// to access existing showtrail and hidetrail functions
contentEval(inject_mouseover());
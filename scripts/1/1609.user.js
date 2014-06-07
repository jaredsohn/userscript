// ==UserScript==
// @name           MetaFilter Remove Comment Images
// @namespace      http://plutor.org/
// @description    Removes images in Metafilter comments
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

// Change this to 1 if you don't even want a link preserved.
var strict = 0;

(function () {
	//var t0 = new Date().getTime();
	var xpath = "//div[@class='comments']//img"
	var candidates = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
		var src = String(cand.src);
		var parent = cand.parentNode;

		if (String(parent.tagName).toUpperCase() == 'A') {
			cand = parent;
			parent = parent.parentNode;
		}

		// For compatibility with "Metafilter mark contact contributions"
		if (parent.className == 'smallcopy') {
			continue;
		}

		if ( !strict ) {
			var block = document.createElement("div");
			block.style.color = "#6c6";
			block.style.fontSize = "80%";
			block.style.marginLeft = "1em";
			block.appendChild( document.createTextNode( "Comment image removed: " ) );

			var link = document.createElement("a");
			if ( src.length > 50 ) {
				link.appendChild( document.createTextNode( src.substring(0, 20) + "..." + src.substring(src.length-20, src.length) ) );
			}
			else {
				link.appendChild( document.createTextNode( src ) );
			}
			link.href = src;
			block.appendChild( link );

			parent.insertBefore( block, cand );
		}

		// Remove the image
		parent.removeChild( cand );
	}

	//var t1 = new Date().getTime();
	//alert("Mefiquote took " + ((t1 - t0) / 1000) + " seconds, " + (i) + " candidates");
})();


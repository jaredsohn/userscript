// ==UserScript==
// @name           Helgon.net anonymous gallery viewer
// @namespace      http://henrik.nyh.se
// @description    Adds an option to enlarge gallery images (in a new tab/window) at Helgon.net anonymously, i.e. without being stored as having looked at that image. This works by simply accessing the image directly instead of through a display page. The code has been made easily customizable.
// @include        http://*helgon.net/Gallery2/Gallery.aspx?*
// ==/UserScript==

(function() {

	// Customize

	textOfAnonymousLink = "Anonymt";
	beforeAnonymousLink = " (";
	afterAnonymousLink  = ")";
	openInNewTabOrWindow = false;  // true or false
	
	
	// Do the mambo

	function xpath(query) {
		return document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	var imgs = xpath("//IMG[@class='frameborder']");  // Gallery thumbnails
	
	for (var i = 0; i < imgs.snapshotLength; i++) {

		// Locate thumbnail image, its wrapper link, and its table cell
		var img = imgs.snapshotItem(i);
		var link = img.parentNode;
		var cell = link.parentNode;

		if (!cell.childNodes[3]) {  // Not in your own gallery

			// Create anonymous link
			anonLink = document.createElement("a");
			anonLink.appendChild(document.createTextNode(textOfAnonymousLink));
	
			// Set link attributes
			anonLink.href = img.src.replace(/_tmb/, '');
			if (openInNewTabOrWindow)
				anonLink.target = "_blank";
	
			// Create text to wrap around anonymous link
			var leftPar = document.createTextNode(beforeAnonymousLink);
			var rightPar = document.createTextNode(afterAnonymousLink);
			
			// Juggle elements into the right order (Kolla om det finns en insertAfter)
			cell.appendChild(leftPar);
			cell.appendChild(anonLink);
			cell.appendChild(rightPar);

		}

	}
	
})();

// ==UserScript==
// @name        Good Will Press
// @namespace   http://www.ruinsofmorning.net/greasemonkey
// @description v0.5 - Replaces popup window JavaScript with ordinary links and provides easy access to swf files for direct downloading.
// @include	http://www.illwillpress.com/*
// ==/UserScript==


(function() {
	d = document;

	// Set Popups as Direct Links //
	for (i = 0; i < d.links.length; i++) {
		if (d.links[i].href.indexOf('javascript:;') >= 0) {
			ocs = d.links[i].attributes.getNamedItem('onclick').value.match(/Window\((?:\"|\')(.*?)(?:\"|\'|\s)/i);
			d.links[i].attributes.getNamedItem('href').value = ocs[1]; d.links[i].attributes.removeNamedItem('onclick');
		}
	}

	// Add SWF file Link(s) //
	iwe = d.embeds;
	for (i = 0; i < iwe.length; i++) {
		// Create Link //
		divl = d.createElement("a"); divl.href = iwe[i].src; divl.title = iwe[i].src;
		divl.setAttribute("style", "display: block; position: absolute; top:" + ((i*25)+5) + "px; right:5px; text-align: centre; color: white; font-family: verdana,arial,sans-serif; font-size: 7pt; text-decoration: none; border: solid 1px white; padding: 1px 5px;");

		// Add Text //
		divt = d.createTextNode("Download SWF");
		divl.appendChild(divt);

		d.body.appendChild(divl);
	}

})();
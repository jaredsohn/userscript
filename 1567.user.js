// Postcode linkify
// Author: Chris Applegate
// Version: 0.12 : September 8, 2005
// License: GNU GPL v2 or later
// This code borrows heavily from SunRocket VoIP Dial Linkify (http://www.muehlen.com/projects/voip/voip_dial.user.js) by Ralf Muehlen
// 
// Matches a UK postcode (e.g. SW1A 2AA) and turns it into a hyperlink to the relevant location on Google Maps
//
// Version History:
//  0.11 (28-Jul-05) Initial release
//  0.12 (08-Sep-05) Updated postcode regex as it wasn't catching them all.
//
// ==UserScript==
// @name           Postcode linkify
// @namespace      http://www.qwghlm.co.uk/
// @description    Hyperlinkifies anything that looks like a UK postcode into a link to the Google Map for that postcode
// @include        *
// @exclude	   http://maps.google.co.uk/
// ==/UserScript==

(function () {



	// URL of the map lookup
	mapURL = "http://maps.google.co.uk/?q=";
	
	// If you don't like Google Maps and wish to use Multimap instead, then comment out the above line and uncommenting the below
	// mapURL = "http://uk.multimap.com/map/browse.cgi?pc=";

	// Complex and more precise regexp for a UK postcode
	// Taken from: http://www.regexlib.com/REDetails.aspx?regexp_id=260 and slightly modified (no Gibraltar)
	// And modified according to BS7666: http://www.govtalk.gov.uk/gdsc/html/frames/PostCode.htm
	
	const pcRegex = /\b[A-PR-UWYZ][A-HK-Y0-9][A-HJKSTUW0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}\b/g;
	
	// Simple regular expression for a UK postcode - use this if the below doesn't work
	// const pcRegex = /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s+\d[A-Z]{2}\b/g;

	// Allowed parent tags for what we are looking for (i.e. unlinked postcodes already)
	var allowedParents = [
	       "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
	       "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
	       "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
	       "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
	      "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"];
	    
	// Xpath statement
	var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";
	
	// Pick out all text nodes in page that have an allowed parent
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// For each candidate...
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

		// See if it contains our regexp, if it does...
		if (pcRegex.test(cand.nodeValue)) {

 			// Create a new initially blank node to put in text's place
			var span = document.createElement("span");
			var source = cand.nodeValue;
			cand.parentNode.replaceChild(span, cand);
		
			// Go through each instance
			pcRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0; (match = pcRegex.exec(source)); ) {

				// Then create a hyperlink
				var a = document.createElement("a");
				a.setAttribute("href", mapURL + escape(match[0]));
				a.setAttribute("title", "Map for " + match[0]);
				// Set linktext to be postcode
				a.appendChild(document.createTextNode(match[0]));


				// Add text between end of previous instance and start of this one
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
				
				/* NOTE: If you want a [map] link to appear after the postcode, rather than link the postcode itself,
				   then comment out the previous two lines and use this instead: 
				   
				   a.appendChild(document.createTextNode("[map]")); 
				   span.appendChild(document.createTextNode(source.substring(lastLastIndex, pcRegex.lastIndex) + " "));
				   
				 */

				// Add the hyperlink in
				span.appendChild(a);
				// Remember the end index of this instance
				lastLastIndex = pcRegex.lastIndex;
			}
			
			// Add the rest of the text in
			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize(); 
			
			// All done!
		} 
	}
	
})();
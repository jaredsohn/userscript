// German PLZ - Mapquest Lookup
// Based on Postcode linkify by Chris Applegate and SunRocket VoIP Dial Linkify by Ralf Muehlen.
// Regex taken from: http://www.regexlib.com/REDetails.aspx?regexp_id=1026 by Markus Matern.
// Author: Volker LarraÃÂ
// License: GNU GPL v2 or later
// 
// Matches a German postcode (e.g. 44269) and turns it into a hyperlink to the relevant location on Mapquest.de
//
// Version History:
// 0.1 (31-Dec-05) Initial release
//
// ==UserScript==
// @name           German PLZ
// @namespace      http://www.mapquest.de
// @description    Hyperlinkifies anything looking like a German postcode to the Map for that postcode
// @include        *
// @exclude	   http://www.mapquest.de
// ==/UserScript==

(function () {

	// URL of map lookup
	mapURL = "http://www.mapquest.de/cgi-bin/ia_find?link=btwn%2Ftwn-map_results&random=789&event=find_search&uid=&SNVData=&address=&city=&country=Germany&Find+Map.x=43&Find+Map.y=12&Find+Map=MAP+IT%21&Zip=";

	// Regex for German PLZ
	const pcRegex = /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/g;

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

				// Then create hyperlink
				var a = document.createElement("a");
				a.setAttribute("href", mapURL + escape(match[0]));
				a.setAttribute("title", "Map for " + match[0]);
				// Set linktext to be postcode
				a.appendChild(document.createTextNode(match[0]));

				// Add text between end of previous instance and start of this one
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

				/* NOTE: If you want a [map] link to appear after the postcode, rather than link the postcode itself, then comment out the previous two lines and use this instead: 

				a.appendChild(document.createTextNode("[map]")); 
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, pcRegex.lastIndex) + " "));

				 */

				// Add hyperlink
				span.appendChild(a);
				// Remember the end index of this instance
				lastLastIndex = pcRegex.lastIndex;
			}
			
			// Add rest of text
			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize(); 
			
			// All done!
		} 
	}

})();

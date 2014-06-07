// ==UserScript==
// @name            Linkify MLS Numbers
// @namespace       
// @description     Find MLS Numbers (8 digits) and link them to ZipRealty
// @include         http://cbba.com/*
// @include         http://www.cbba.com/*
// @include         http://www.realtor.com/*
// @include         http://realtor.com/*
// ==/UserScript==

	
	var zipRealtyURL = "http://www.ziprealty.com/buy_a_home/logged_in/search/home_detail.jsp?page=1&property_type=LAND&mls=mls_seattle&cKey=452z3q80&source=NWMLS&listing_num=";
	const mlsRegex = /\d{8}/g;
	
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
		if (mlsRegex.test(cand.nodeValue)) {

 			// Create a new initially blank node to put in text's place
			var span = document.createElement("span");
			var source = cand.nodeValue;
			cand.parentNode.replaceChild(span, cand);
		
			// Go through each instance
			mlsRegex.lastIndex = 0;
			for (var match = null, lastLastIndex = 0; (match = mlsRegex.exec(source)); ) {
                                
				// Then create a hyperlink
				var a = document.createElement("a");
				a.setAttribute("href", zipRealtyURL + escape(match[0]));
				a.setAttribute("title", "ZipRealty page for MLS ID: " + match[0]);
				// Set linktext to be postcode
				a.appendChild(document.createTextNode("(ziprealty)"));


				// Add text between end of previous instance and start of this one
				span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
				
                                span.appendChild(document.createTextNode(match[0] + " "));

				// Add the hyperlink in
				span.appendChild(a);
				// Remember the end index of this instance
				lastLastIndex = mlsRegex.lastIndex;
			}
			
			// Add the rest of the text in
			span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
			span.normalize(); 
			
			// All done!
		} 
	}
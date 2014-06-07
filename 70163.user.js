// ==UserScript==
// @name           Ignite: Longer Video Title
// @namespace      http://igniteshow.com
// @description    Extends the title when browsing videos on IgniteShow.com
// @include        http://igniteshow.com/*
// ==/UserScript==
// Version 2

var links = document.querySelectorAll("div.views-field-title span.field-content a");

for (linkNo = 0; linkNo < links.length; linkNo++) {
	// Get title fragment from link URL
	var urlTitle = links[linkNo].href.replace(/.*\//, "");
	// Interpret encoded characters, e. g. "%E2%80%99" becomes "'" 
	urlTitle = decodeURI(urlTitle);
	// Re-Escape "<", ">" and "&" as HTML-entities
	urlTitle = urlTitle.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;");
	
	// Omit words already in the caption or speaker name
	var oldCaption = links[linkNo].innerHTML;
	var speaker = speakerName(links[linkNo]);
	var already = oldCaption.replace(/[^A-za-z0-9 ]/g, "").split(" ").concat(
		speaker.replace(/[^A-za-z0-9 ]/g, "").split(" ") );
	for each (word in already) {
		urlTitle = urlTitle.replace(word.toLowerCase(), "");
	}

	// Give the fragment title case capitalization
	urlTitle = titleCase(urlTitle);
	
	// remove dashes and trailing numbers
	urlTitle = urlTitle.replace(/\-+/g, " ");
	while (urlTitle.match(/ [0-9]+$/)) {
		urlTitle = urlTitle.replace(/ [0-9]+$/, "");
	}
	
	links[linkNo].innerHTML = oldCaption.replace(/\.\.\.$/, " ") + urlTitle;
}

/** Returns the given string in sort-of title case
 *  by capizalizing words with four or more letters. 
 */
function titleCase(title) {
	var newTitle = title;
	var idx;
	var separatorPos = -1;
	// find starts of words
	for (var i=0; i<title.length; i++) {
		// new word separator (or end of title) at position i?
		if (title.charAt(i) === " " || title.charAt(i) === '-' || i === title.length-1) {
			// past word longer than three characters?
			if (i - separatorPos - 1 + (i === title.length-1) > 3) {
				// make word start uppercase
				newTitle = newTitle.substring(0, separatorPos+1)
					.concat(newTitle.charAt(separatorPos+1).toUpperCase())
					.concat(newTitle.substring(separatorPos+2));
			}
			separatorPos = i;
		}
	}
	return newTitle;
}

/** Returns the speaker's name associated to the given video link DOM node. */
function speakerName(link) {
	var parent = link.parentNode;
	var speakerLinks; 
	// look for common parent node
	do {
		speakerLinks = parent.querySelectorAll(
			"span.views-field-field-speaker-reference-nid span.field-content a");
		parent = parent.parentNode;
	} while (speakerLinks.length === 0)
	return speakerLinks[0].innerHTML;
}

// Fatwallet AutoNotInterested
// version 0.1
// 2006-12-01
// Copyright (c) 2006, Gary CAlpo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fatwallet Auto Not-Interested
// @namespace     http://www.fliptech.net
// @description   Automatically flags topics as "Not Interested" based on user-created patterns (Regular Expressions)
// @include       http://www.fatwallet.com/forums/categories.php*
// @include       http://www.fatwallet.com/c/*
// @include       http://fatwallet.com/forums/categories.php*
// @include       http://fatwallet.com/c/*

// ==/UserScript==

// NOTE:

// SOME TIPS:
// 1) patternString, below, is a pipe delimited string.  i.e. "term1|term2|...|termX"
// 1.1) a "pipe" for the uninitiated is what you get when you HOLD SHIFT while pressing the "\" KEY
// 2) the matching is case-insensitive
// 3) matching is done using REGULAR EXPRESSIONS
// 3.1) example:  "meijer"  matches any topic about meijer stores (of which there are none for hundreds of miles from where I live)
// 3.2) example:  "$delete^"  matches any topic that contains ONLY the word "delete"  The "$" and "^" mark the beginning and end  of the topic, respectively.
// 3.3) example:  "nfl.*jers" matches "NFL jersey", "NFL authentic jersey", "NFL tickets in new jersey" etc.  The magic is in the ".*" which matches one or more characters.
// 3.4) example:  "gb.sd" matches "1GB SD card", "4GB-SD-CARD", etc.  "." matches one character.

var patternString = "delete.me|$delete^"

// var patternString = "meijer|bissel|harbor.freight|muvo|petsmart|entertainment.book|ihome|lightscribe|claire.s|menard|children.s.place|childrens.place|motherboard|videonow|sierra.trading|ll.bean|llbean|jumpdrive|geforce.*card|nvidia.*card|nuvi|guess.com|macbook|tmx|streets.*trips|celeron|rebel.*xti|wide.*lens|sansa|dremel|fatal1ty|zune|petco|easyshare|menard|digital.rebel|cingular|alltel|lands.end|land.s.end|polaroid.*camera|creative.*zen|elder.scroll|^delete$|porter.*drill|256.*mp3|nfl.*jers|threadless|dickies|lane.bry|va.ups|live.vision|avon|portable.dvd|gb.sd|color.*laser|chipotle|radar.*detect|nikon" // pipe delimited


var pageAddr, links, a, href, innertext, originaltext ;
pageAddr = window.location.href;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

patternString = patternString.toLowerCase(); // make it lowercase!

var patterns = patternString.split('|');
patternCt = patterns.length;

var reportHTML = "";

for (var i = 0; i < links.snapshotLength; i++) {

     a = links.snapshotItem(i);
     innertext = a.innerHTML;
	 originaltext = innertext;
	 innertext = innertext.toLowerCase();
	 
     href = a.href;

	// make sure this link points to a topic page
	if ( href.match(/fatwallet\.com\/t\//)  ) {

		var bMatched = false;
		// see if the innertext matches something in patterns array
		for (var k = 0; k < patternCt ; k++) {
			var myregexp = new RegExp(patterns[k]);

			if ( (innertext.match(myregexp)) && (patterns[k].length > 2) ) bMatched = true;
		}
		
		if (bMatched) {

			var lastslash = 0, nexttolastslash = 0;
			
			for (var j = href.length; j >= 0; j--) {
	
				// we need the last part of the URL (an ID # identifying the topic)
	
				if (href.substring(j,j+1) == '/') {
	
					if (lastslash != 0 && nexttolastslash == 0) nexttolastslash = j;
					if (lastslash == 0 && nexttolastslash == 0) lastslash = j;
	
	
				}

			}
	
			var topicID = href.substring(nexttolastslash + 1, lastslash);

			reportHTML += ('<li><a href="' + href + '">' + originaltext + '</a></li>');


			open('javascript:ignoreTopic(' + topicID + ');', '_self');

		} // end if bMatched

	} //end if


} // end of for() loop


// inform user that one or more topics were automatically flagged

if (reportHTML.length > 0) {
	var newscript = document.createElement("div");
	newscript.innerHTML = "<div style='padding:2px; background-color: #FFFFF0; font-size: 12px; '>Marked the following posts as <strong>Not Interested:</strong><ul>" + reportHTML + "</ul></div>";
	document.body.insertBefore(newscript, document.body.firstChild); 
}
	
// WISHLIST

// - make it easier to add/edit/remove items 
// - show what part of the topic matched what your pattern
// - keep track of "hits" to each pattern (so you can delete unused patterns)
// - make the "patternString" follow you from computer to computer 
// - when a topic is flagged and a new one is pulled to replace it, check the new topic against the same list

// CHANGELOG

// 0.1 - Initial Release
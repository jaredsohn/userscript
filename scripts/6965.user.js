// IMDB Vote History Greasemonkey script
// version 1.1
// 2007-01-04
// 
// Copyright 2006, Curtis Gibby
// Copyright 2007, Josef Svenningsson
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------
//
// ==UserScript==
// @name			IMDB Vote History
// @namespace		http://www.cs.chalmers.se/~josefs
// @description		Adds an indicator on an IMDB title page telling you whether or not you have voted on that film.
// @include			http://imdb.com/title/*
// @include			http://*.imdb.com/title/*
// ==/UserScript==

// Josef Svenningsson:
// I've updated the script to report the vote "10" correctly.
// It was previously reported as "1".

var currentLoc = trimAll( String(window.location) );
var end = currentLoc.length - 1;
var start = currentLoc.lastIndexOf("/tt",(end - 1)) + 3 ;
var movieId = currentLoc.slice(start,end);

alterLinks();
check4vote(movieId);


// Functions ----------- //

function check4vote(movieId) {
	var vote_url = 'http://imdb.com/MyRating?' + movieId;
	GM_xmlhttpRequest({
			method: 'GET',
			url: vote_url,
			onload: function(responseDetails) {
				var search_string = 'Your recorded vote is ';
				var match = responseDetails.responseText.search(search_string);
				var recorded_vote = responseDetails.responseText.substr(match + search_string.length,2);
                                if (recorded_vote.charAt(1) != "0")
                                  recorded_vote = recorded_vote.charAt(0);
				if (match != -1) {
					// Already exists
					var span = document.getElementById('greaseText');
					var span_text = document.createTextNode(' (Recorded vote: ' + recorded_vote + ')');
					span.style.color='green';
					span.replaceChild(span_text, span.firstChild);
				} else {
					// Does not exist
					var span = document.getElementById('greaseText');
					var span_text = document.createTextNode(' (No recorded vote)'); 
					span.style.color='red';
					span.replaceChild(span_text, span.firstChild);
				}
			}
	});
}


function alterLinks() {
	var findPattern = "//a[contains(@href,'/ratings')]";
	var results = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var link = results.snapshotItem(1);
	var span = document.createElement('span');
	var span_text = document.createTextNode(' (checking vote history)'); 
	span.appendChild(span_text);
	span.setAttribute('id','greaseText');
	span.style.color='red';
	link.parentNode.insertBefore(span, link.nextSibling);
}

function trimAll(sString) {
	while (sString.substring(0,1) == ' ') {
		sString = sString.substring(1, sString.length);
	}
	while (sString.substring(sString.length-1, sString.length) == ' ') {
		sString = sString.substring(0,sString.length-1);
	}
	return sString;
}

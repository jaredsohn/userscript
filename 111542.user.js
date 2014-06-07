// ==UserScript==
// @name           Facebook: Classy Edition
// @namespace      Chozo
// @description    Make Facebook classier by putting posts with classy keywords at the top of the news feed.
// @include        https://www.facebook.com/*
// ==/UserScript==



var posts = new Array();
var currentPost = 0;
var keywords = ["beard", "beards", 
				"mustache", "mustaches", 
				"cigar", "cigars", 
				"patrick stewart"]

window.addEventListener(
    'load', 
    function() { 
		var currentStream = document.getElementById("home_stream");
		posts = currentStream.childNodes;
		
		
		for (var x = 0; x < posts.length; x++) {
			str = posts[x].innerHTML;
			if (searchKeywords(str.toLowerCase()) == true) { 
				var tempPost = posts[currentPost].innerHTML;
				posts[currentPost].innerHTML = posts[x].innerHTML;
				posts[x].innerHTML = tempPost; 
				currentPost++;
			}
		}
	},
    true);
	
function searchKeywords(searchText) {
	for (var i = 0; i < keywords.length; i++) {
		if (searchText.search(keywords[i]) != -1) {
			return true;
		}
	}
}
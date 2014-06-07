// ==UserScript==
// @name           Search Most Dugg Stories
// @author   Jake Kasprzak
// @namespace      http://jake.kasprzak.ca
// @description    Sorts searches on Digg by most "dugg" stories by default.
// @include        http://digg.com/*
// ==/UserScript==


(function() {
    
	
	var topKeywords = document.getElementById('top-keywords');
	if (topKeywords) {
	
		newElement = document.createElement('input');
		newElement.type = "hidden";
		newElement.name = "sort";
		newElement.value = "most";
		
		topKeywords.parentNode.insertBefore(newElement, topKeywords.nextSibling);
		
	}
	
})();
// ==UserScript==
// @name           MAL Show Rating In Header
// @version        1.0.0
// @description    Moves rating to the top of anime information page along with the rank.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/anime/*
// ==/UserScript==

(function() {
	"use strict";
	
	var malRatingOnTop = {};
	
	malRatingOnTop.findRatingFromWrapper = function(wrapper, inner) {
		if(wrapper.tagName.toLowerCase() !== "div") {
			return null;
		}
		
		var subSpans = wrapper.getElementsByTagName("span");
		
		if(subSpans.length === 0) {
			return null;
		}
		
		if(subSpans[0].className !== "dark_text" || subSpans[0].innerHTML !== "Score:") {
			return null;
		}
		
		var prev = inner.previousSibling;
		
		while(prev !== null && prev.nodeType === 3) {
			var possibleRating = parseFloat(prev.textContent);
			
			if(!isNaN(possibleRating)) {
				return possibleRating;
			}
		}
		
		return null;
	};
	
	malRatingOnTop.findRatingFromDocument = function() {
		var elems = document.getElementsByTagName("sup");
		var possibleRating = null;
		
		for(var i = 0; i < elems.length && possibleRating === null; i++) {
			possibleRating = malRatingOnTop.findRatingFromWrapper(elems[i].parentNode, elems[i]);
		}
		
		return possibleRating;
	};
	
	malRatingOnTop.placeRatingOnTop = function(rating) {
		var h1Elems = document.getElementsByTagName("h1");
		
		if(h1Elems.length < 1) {
			return;
		}
		
		var floatingDiv = h1Elems[0].getElementsByTagName("div");
		
		if(floatingDiv.length < 1) {
			return;
		}
		
		floatingDiv[0].innerHTML += " (rating " + rating + ")";
	};
	
	malRatingOnTop.process = function() {
		var rating = malRatingOnTop.findRatingFromDocument();
		
		if(rating !== null) {
			malRatingOnTop.placeRatingOnTop(rating);
		}
	};
	
	malRatingOnTop.process();
	
})();

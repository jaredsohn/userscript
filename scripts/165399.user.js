// ==UserScript==
// @name        Who wrote that ?
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace   NONE
// @description Small game to play
// @include     http*://www.rockpapershotgun.com/*
// @run-at document-start
// @version     1.11

// ==/UserScript==

// blackens out the authors BEFORE the dom is even thinking about being loaded. Dirty, but works.
var css = $('<style>.info > a  { background-color:black; color : black !important }</style>');
$("head").after(css);


// When we're sure the names will not appear while the page is loading, let's let the dom load
$(document).ready(function() {

var elems = $(".info > a");

// if homepage
	if ((window.location.href=="http://www.rockpapershotgun.com/") || (window.location.href == "https://www.rockpapershotgun.com/")) {
		
		$(elems).mouseover(function() {
			$(elems).css("background-color", "transparent");
			// ugly, but this !important is a pain in the ass
			$(elems).attr('style', function(i,s) { return s + 'color : #ac1a19 !important;' });
			
			
		});

		$(elems).mouseout(function() {
			$(elems).css("background-color", "black");
			$(elems).attr('style', function(i,s) { return s + 'color : black !important;' });

		});


// if article
	} else {
		var truc = $('<input></input>');
		$(elems).before(truc);
		$(elems).css({"display" : "none","background-color" : "transparent"});
		
		$(elems).attr('style', function(i,s) { return s + 'color : #ac1a19 !important;' });

		$(truc).keyup(function(event) {
			if ($(truc).val().toLowerCase() == $(elems).html().toLowerCase()) {
				$(elems).css('display', '');
				$(truc).remove();
			}
		});

		$(elems).before($(truc));
		$(truc).focus();
	}

});
	
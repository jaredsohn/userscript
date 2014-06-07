// googleSearchEnglish
// This is a Greasemonkey user script to make google searches show in English
// regardless of the country you are in
//
// --------------------------------------------------------------------------
//
// ==UserScript==
// @name		googleSearchEnglish
// @description		Makes google searches show in English wherever you are
// @include		http://www.google.*
// ==/UserScript==

(function() {
	if(window.location.href.match(/hl=en/)){}
	else{window.location.href+="&hl=en";}
})();
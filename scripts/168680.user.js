// ==UserScript==
// @name		IltaSaatana
// @description	Iltalehti astetta paremmassa formaatissa
// @include		http://iltalehti.fi/*
// @include		http://www.iltalehti.fi/*
// @namespace	http://iltalehti.fi/
// @grant       none
// @version		1.0a
// @run-at		document-end
// @require		//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.1/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
this.saatanat = {};
this.saatanat.upper = 'SAATANA';
this.saatanat.lower = 'saatana';
this.whitespace = ', ';
this.util = {
	isUpper: function(string) {
		return string.toUpperCase() === string;
	}
};

$("h1.juttuotsikko").each(function() {
	var em = $(this).find("span:last");
	var header = $.trim(em.text());
	// Clean up any whitespace
	// Check for exclamation, question or quote in the end of the line
	if (header.match(/[!?\"]$/)) {
		// Grab our bits
		var start = header.substring(0, header.length -1 );
		var end = header.substring(header.length - 1, header.length);
		// De magicks
		if (util.isUpper(header)) {
			em.text(start + whitespace + saatanat.upper + end);
		}
		else {
			em.text(start + whitespace + saatanat.lower + end);
		}
	}
	else {
		// De magicks
		if (util.isUpper(header)) {
			em.text(header + whitespace + saatanat.upper);
		}
		else {
			em.text(header + whitespace + saatanat.lower);
		}
	}
});
// Prolly needs to be fixed
$(".list-title").append(whitespace + saatanat.lower);

// ==UserScript==
// @name         NZBIndex Bad Posters
// @description  Highlights posts made by known bad posters
// @namespace    drnick
// @downloadURL  https://userscripts.org/scripts/source/161252.user.js
// @updateURL    https://userscripts.org/scripts/source/161252.meta.js
// @include      *nzbindex.nl/search/*
// @version      1.1
// @grant        none
// ==/UserScript==

(function () {

	// bad posters, use lowercase for case-insensitive substring matching
	var jerks = [ "ilikeboys", "ghostdivx" ];

	if (window.self != window.top) return;
	if (typeof jQuery == "undefined") return;
	
	var $ = jQuery;
	var items = $("#results td .info");
	
	items.each(function() {
		var poster = $(".poster", this);
		var html = poster.html();
		var text = html.toLowerCase();
		
		for (var i = 0; i < jerks.length; i++)
			if (text.indexOf(jerks[i]) != -1) {
				poster.html(html + " &mdash; WARNING: SUBMITTED BY BAD POSTER");
			
				var tr = $(this).closest("tr");
				tr.css("background-color", "#fcc");
				tr.css("color", "#a00");
				
				$("a", poster).css("color", "#a00", "important");
			}
	});

})();
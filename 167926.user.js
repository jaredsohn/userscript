// ==UserScript==
// @name         e621 Pool Download
// @description  Adds option to show all pool images on one page and linked to files for easy mass-downloading.
// @namespace    http://userscripts.org/users/flynn
// @updateURL    https://userscripts.org/scripts/source/167926.meta.js
// @downloadURL  https://userscripts.org/scripts/source/167926.user.js
// @include      http://e621.net/pool/show/*
// @include      https://e621.net/pool/show/*
// @grant        none
// @version      1.0.2
// ==/UserScript==

(function() {

	if (typeof jQuery == "undefined") throw "jQuery not found";
	if (window.top != window.self) return;

	var $ = jQuery;

	var $button = $("<button style='margin-left: 1em'>Show All</button>").click(function() {
			
		var idMatches = window.location.href.match(/pool\/show\/(\d+)\b/i);
		if (idMatches.length < 2) throw "pool id not found in url";
		
		var id = idMatches[1];	
		var pages = 1;
		
		if ($("#paginator .pagination").length != 0)
			pages = $("#paginator a:nth-last-child(2)").text();
		
		var $d = $("<div />");
		
		$("#pool-show span.thumb").remove();
		$("#paginator").remove();
		
		var $working = $("<h3>Working</h3>").appendTo("#pool-show");
		
		var index = 1;
		for (var page = 1; page <= pages; page++)
		{
			$working.text($working.text() + ".");
		
			$.ajax({
				dataType: "json",
				url: "/pool/show.json", 
				data: {
					id: id,
					page: page,
				},
				async: false,
				success: function(data) {
					$.each(data.posts, function(key, value) {
						$d.append('<span class="thumb"><a href="' + value.file_url + '" + title="' + index++ + '"><img src="' + value.preview_url + '" /></a></span>');
					});
				},
			});
		}	
		
		$working.remove();
		$button.remove();
		
		$("#pool-show").append($d);
	});

	$("#pool-show h4").append($button);

})();
// ==UserScript==
// @name        RuTracker
// @namespace   Namespeisas
// @include     http://rutracker.org/forum/* 
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/183630.meta.js
// @version     2
// @grant       none
// ==/UserScript==
jQuery(document).ready(function($) {
	var number = 0;
	$(".hl-tr").each(function(index) {
		var sitas = $(this);
		setTimeout(function() {

			var nuoroda = sitas.find('.tt-text, .tLink').attr('href');
			number += 1;
			//sitas.find('.tt').append('<div style="float:left;">' + number + nuoroda + '</div>');
			$.ajax({
				url : nuoroda,
				context : document.body
			}).done(function(data) {
				var result = '';
				var step = 7;
				var pradzia = data.indexOf("postImg ");
				if (pradzia != -1) {
					var kerpam = data.substr(pradzia, 500);
					var url_start = kerpam.indexOf('title="') + step;
					kerpam = kerpam.substr(url_start, 400);
					var url_end = kerpam.indexOf('"');
					result = kerpam.substr(0, url_end);

					sitas.find('.topic_id, .row1.tCenter:first, .u-name').html('<a href="' + nuoroda + '" target="_blank"><img style="max-width:100px" src="' + result + '" alt="" /></a>');
				}
			});
		}, index * 500);
	});

});
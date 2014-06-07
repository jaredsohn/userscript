// ==UserScript==
// @name           eUS Mil Tools
// @description    Various eUS Mil enhancements
// @version        0.11
// @author		   eCitizen Maruishima
// @namespace      http://eusmil.com/forum/*
// @include        http://eusmil.com/forum/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$.ajaxSetup({
	type: "GET",
	dataType: "html"
});

$(document).ready(function() {
	$("a:contains('Joined')").text("Last Visit");

	$("a.username-coloured").each(function() {
		var userName	= $(this).text();
		var userLink	= this

		$.ajax({
			url: $(userLink).attr("href"),
			success: function(data) {
				var lastVisit = $(data).find("td:contains('Last visited: ')").next().text()
				$(userLink).parent().next().text(lastVisit.replace(",",""));
			}
		});
	});
});
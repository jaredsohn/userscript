// ==UserScript==
// @name        TL Calendar on ScReddit
// @namespace   PylonPants
// @include     http://*reddit.com/r/starcraft/*
// @version     1.5
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


$(go);

function go() {

	$("<style>").text("#gm_tl_calendar .ev_wikilink, #gm_tl_calendar .ev_nolink, #gm_tl_calendar img {display:inline-block;}").appendTo("head");

	var target_div = $("<div id='gm_tl_calendar'>").append(
		"Loading",
		// NB: This scary looking block of code is simply a small animated gif, it's embedded like this to avoid having to load it from an external source
		$("<img src='data:image/gif;base64,R0lGODlhCgACAIABAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFHgABACwAAAAACgACAAACBQSCiaZaACH5BAUeAAEALAQAAAACAAIAAAIChFEAIfkEBR4AAQAsCAAAAAIAAgAAAgKEUQA7' />")
	);
	$(".side").first().prepend(target_div);

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.teamliquid.net/",
		onload: function(response) {
			var html = response["responseText"];
			// Ghetto splitting to avoid parsing the whole dom, that would lead to massive amounts of picture loading
			html = html.split('<div id="calendar_content">')[1];
			html = html.split('<div id="streams_div">')[0];
			
			// Parsing the text into dom, letting jQ sort it out :)
			var elements = $(html);
			
			var content = elements.find("#calendar_div").next();
			
			// Adding to dom
			target_div.html(content);
			
			// Change more link to point to TL
			$("#link_show_more_events").attr("href", "http://www.teamliquid.net/calendar/");
			
			// Fixing all the relative links into absolute ones
			content.find("a, img").each(function() {
				// Anchors
				if ($(this).attr("href")) {
					if ($(this).attr("href").indexOf("teamliquid.net") < 0) {
						$(this).attr("href", "http://www.teamliquid.net"+$(this).attr("href"));
					}
				}
				// Images
				if ($(this).attr("src")) {
					if ($(this).attr("src").indexOf("teamliquid.net") < 0) {
						$(this).attr("src", "http://www.teamliquid.net"+$(this).attr("src"));
					}
				}
			})
			
			// Add to page
		}
	});
	
}
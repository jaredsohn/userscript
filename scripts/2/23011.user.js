// ==UserScript==
// @name           Last.fm - Numeric Compatibility
// @namespace      www.daddy.sk
// @description    Displays the compatibility between users in numeric format.
// @include        http://www.last.fm/user/*
// ==/UserScript==


window.addEventListener(
	'load',
	function() {
		setTimeout(
			function () {
				var graph, rating;
				rating = document.getElementById("tomRating");//tomGraph");

				if (rating == null) {
					GM_log("Error, not found.");
				} else {
					var body, compatibility, pos, compatibilityDisp;
					var styleElement = "width: ";
					body = rating.innerHTML;
					GM_log("Found. innerHTML: \n" + rating.innerHTML);
					pos = body.indexOf( styleElement );
					compatibility = body.substring( pos + styleElement.length, body.indexOf('%' , pos) );
					GM_log("compatibility: " + compatibility);
					
					graph = document.getElementById("tomGraph");					
					graph.innerHTML = "<center><b style=\"color: white;\">" + compatibility + "%</b></center>";
				}
			},
		100);
	},
  false
);
// ==UserScript==
// @name        Craigslist Google Map integration
// @namespace   BeenJammin.Greasemonkey.UserScripts
// @description Embeds a Google map in any CL page that links to a Google Map
// @include     http://*.craigslist.org/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.1
// ==/UserScript==

if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// the guts of this userscript
	function main() {
		jQuery.noConflict();
		jQuery(".mapaddress a").each(function() {
			if (jQuery(this).html().toLowerCase() == "google map") {
				var url = jQuery(this).attr("href");
				jQuery(".mapaddress").after("<div><iframe width='850' height='700' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + url + "&amp;output=embed'></iframe></div>");
			}
		});
	}

	// load jQuery and execute the main function
	addJQuery(main);
}
else {
	jQuery.noConflict();
	jQuery(".mapaddress a").each(function() {
		if (jQuery(this).html().toLowerCase() == "google map") {
			var url = jQuery(this).attr("href");
			jQuery(".mapaddress").after("<div><iframe width='850' height='700' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + url + "&amp;output=embed'></iframe></div>");
		}
	});
}
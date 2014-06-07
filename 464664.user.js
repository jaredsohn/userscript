// ==UserScript==
// @name				webm media embed for SEGA Forums
// @version				2014 April 16th
// @author				Toggi3
// @namespace			http://forums.sega.com
// @description			replaces links to .webm content with embedded video
// @include				http://forums.sega.com/*
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.webm$/i)) {
			var span = document.createElement("div");
			var width = "100%"
            var height = "1080px"
			code_str = ""
			code_str += " <video \n"
			code_str += "width=\""+width+"\" max-height=\""+height+"\" allowfullscreen controls>\n"
			code_str += "<source \n"
			code_str += "src=\""+page_links[i].href+"\" type=\"video/webm\" />\n"
			code_str += "</video>\n"
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
		}
	}

})();

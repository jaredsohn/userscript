// ==UserScript==
// @name          Inline Mp3 Player (NYTimes version)
// @description	  Add to every link to an mp3 file on page a NYTimes inlinePlayerScale. Mod the swf url by zonovo
// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *

// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://graphics8.nytimes.com/js/section/podcasts/inlinePlayerScale.swf?mp3="+escape(page_links[i].href)
			var width = 160
			var height = 20
			code_str = ""
			code_str += " <object type=\"application/x-shockwave-flash\"\n"
			code_str += "data=\""+url+"\" \n"
			code_str += "width=\""+width+"\" height=\""+height+"\">\n"
			code_str += "<param name=\"movie\" \n"
			code_str += "value=\""+url+"\" />\n"
			code_str += "<param name=\"wmode\" \n"
			code_str +=	"value=\"transparent\" />\n"
			code_str += "</object>\n"
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
		}
	}

})();
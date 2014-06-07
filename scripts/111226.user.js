// ==UserScript==
// @name          VideoScape Inline MP3 Player
// @description	  Add to every link to an mp3 file on page an inline based flash with Play, Pause & Volume controllers, in addition to it you got Full Control on the loading SeekBar.
// @namespace     http://www.videoscape.org
// @include       *

//by VideoScape (http://www.videoscape.org)
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://www.videoscape.org/browser/audio.swf?audioUrl="+escape(page_links[i].href)
			var width = 320
			var height = 27
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

})()
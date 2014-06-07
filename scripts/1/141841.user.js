// ==UserScript==
// @name           Dropbox MP3 Inline Player
// @namespace	   DropMP3
// @include        https://www.dropbox.com/*
// @grant		   none
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var mp3url = escape(page_links[i].href);
			if (page_links[i].href.match(/dropbox\.com/i))
				mp3url += escape("?dl=1");
			var url = "http://dl.dropbox.com/u/4938173/player.swf?soundFile="+ mp3url
			code_str = ""
			code_str += " <object type=\"application/x-shockwave-flash\"\n"
			code_str += "data=\""+url+"\" \n"
			code_str += 'width="290" height="29">\n'
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
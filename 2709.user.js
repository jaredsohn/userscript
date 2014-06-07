// ==UserScript==
// @name          Inline Mp3 Player with Controls
// @description	  Puts a small audio player with Play/Pause/Volume controls and a loading meter next to every link to an MP3 file. Lets you listen to an mp3 file on a web page without downloading the file.
// @include       *
//by Caleb Marcus
// ==/UserScript==

// Based on Inline Mp3 Player by Fabricio Zuardi

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://musicplayer.sourceforge.net/xspf_player_slim.swf?&song_url="+escape(page_links[i].href)+"&song_title="+escape(page_links[i].innerHTML)
			var width = 200
			var height = 15
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
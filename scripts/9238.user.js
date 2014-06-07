// ==UserScript==
// @name          Inline Mp3 Player (JW version)
// @description	  Add to every link to an mp3 file a Flash based Mp3 Player with Play, Pause, Volume controllers, SeekBar and an OUTSTANDING!!!! time awareness.
// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://img84.imageshack.us/img84/3928/mediaplayertz5.swf?&file="+escape(page_links[i].href)+"&song_title="+escape(page_links[i].innerHTML)
			var width = 320
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
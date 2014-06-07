// ==UserScript==
// @name          Inline Mp3 Player (Slim)
// @description	  Add to every link to an mp3 file on page a slim inline player with Play, Pause & Volume controllers.
// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://img339.imageshack.us/img339/1182/xspfplayerslimni0.swf?&song_url="+escape(page_links[i].href)+"&song_title="+escape(page_links[i].innerHTML)
			var width = 320
			var height = 17
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
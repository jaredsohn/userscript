// ==UserScript==
// @name          Inline Mp3 Player (Consilium Version)
// @description	  mp3 files on page are shown with a Flash Mp3 Player with Play, Pause & Volume controllers. In addition, you get full control on the loading SeekBar. This is identical to the JW version, however the size of it has been shortened to fit into small side panels without modifying column sizes.

// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *
//by Fabricio Zuardi (http://www.hideout.com.br)
//Simple Mod by BSugar (http://consilium-usa.com)
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = "http://img211.imageshack.us/img211/8810/mediaplayerqw6.swf?&file="+escape(page_links[i].href)+"&song_title="+escape(page_links[i].innerHTML)
			var width = 200
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
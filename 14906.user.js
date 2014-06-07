// ==UserScript==
// @name          Inline Google Mp3 Player
// @description	  Add to every link to an mp3 file on page an inline Google's Mp3 player based flash with Play, Pause & Volume controllers, in addition to it you got Full Control on the loading SeekBar.
// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *

//original Fabricio Zuardi (http://www.hideout.com.br)
//by Deathbob (http://defcon1.hopto.org)
//Modified to support page changes 11/27/07
// ==/UserScript==

var decorate_new_elements = function(e) {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		
		if (page_links[i].href.match(/\.mp3$/i) && !(page_links[i].nextSibling.tagName == "SPAN" && page_links[i].nextSibling.nextSibling.firstChild.tagName == "OBJECT") )
		{
			var span = document.createElement("span");
			var url = "http://img404.imageshack.us/img404/7740/audiouq4.swf?audioUrl="+escape(page_links[i].href)
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

}

decorate_new_elements();

document.body.addEventListener('DOMNodeInserted', decorate_new_elements, false);
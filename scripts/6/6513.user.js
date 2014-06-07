// ==UserScript==
// @name          Inline Google Player
// @description	  Replace every link to mp3 file on page with Google's Flash Player.
// @namespace     http://lifehacker.com/
// @include       *
// @include       http://webjay.org/*
// @include       http://www.webjay.org/*
// @include       http://3hive.org/*
// @include       http://www.3hive.org/*
// @include       http://mysteryandmisery.com/*
// @include       http://www.mysteryandmisery.com/*
// @include       http://sixeyes.blogspot.com/*

//by Adam Pash
//modified from Fabricio Zuardi's script (http://www.hideout.com.br) (http://musicplayer.sourceforge.net/greasemonkey)
// ==/UserScript==

(function() {

	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var parag = document.createElement("p");
			var url = "http://mail.google.com/mail/html/audio.swf?audioUrl="+escape(page_links[i].href)
			var width = 511
			var height = 25
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
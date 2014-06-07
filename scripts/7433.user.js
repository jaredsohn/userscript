// ==UserScript==
// @name          NewWarp YouTube Player
// @description	  Permite assistir videos do YouTube na propria pagina que contenha o link para o video.
// @description	  Allow watch YouTube videos inside Orkut.
// @namespace     http://newzeek.hiphopminas.com.br/newwarp
// @author	  Eduardo [NewZeek]
// @include       http://www.orkut.com/*
// ==/UserScript==

//Define idioma / Set language

var id = 'pt_br'; // 'pt_br' (Portugues), 'en'(English)

var page_links = document.links;
	for (var i=0; i<page_links.length; i++){ var option = '';
		if (page_links[i].href.match("video.google.com/googleplayer.swf")||page_links[i].href.match("video.google.com/videoplay")) { option = 'google';
			if (id == 'pt_br') var link = 'Visualizar no Google Videos'
			if (id == 'en') var link = 'View in Google Videos'
			var url = "http://video.google.com/googleplayer.swf" + page_links[i].href.substring(page_links[i].href.toLowerCase().indexOf('?docid='),100)}
		if (page_links[i].href.match(/\.youtube.com\/watch\?v=/i)) { option = 'youtube';
			if (id == 'pt_br') var link = 'Visualizar no YouTube'
			if (id == 'en') var link = 'View in YouTube'
			var url = "http://www.youtube.com/v/" + page_links[i].href.substring(page_links[i].href.indexOf('?v=')+3,45)}
		if (option != ''){	
			var span = document.createElement("span");
			var width = 425
			var height = 350
			code_str = ""
			code_str += '<br><object type=\"application/x-shockwave-flash\"\n"'
			code_str += "data=\""+url+"\" \n"
			code_str += "width=\""+width+"\" height=\""+height+"\">\n"
			code_str += "<param name=\"movie\" \n"
			code_str += "value=\""+url+"\" />\n"
			code_str += "<param name=\"wmode\" \n"
			code_str +=	"value=\"transparent\" />\n"
			code_str += "</object><br>\n"
			span.innerHTML = code_str
			page_links[i].innerHTML = link
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
		}
	}
	


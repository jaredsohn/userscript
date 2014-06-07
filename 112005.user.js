// ==UserScript==
// @name           Redtube.com Direkt Download
// @namespace      http://www.redtube.com/
// @include        http://www.redtube.com/*
// @include        http://cdn.ec.redtube.com/*
// @exclude        http://www.redtube.com/
// ==/UserScript==




if (location.href.indexOf(".php") == -1 && location.href.indexOf("http://videos.mp4.redtubefiles.com/") == -1) {
	var embed, newElement;
	embed = document.getElementById('contentHolder');
	if (embed) {
		var embed_HTML = embed.innerHTML;
		var hash_link = embed_HTML.substring(embed_HTML.indexOf("<source src='") + 13,embed_HTML.indexOf("type='video/mp4'>") - 2);
		var link = hash_link;
		var embed_div, newElement;
		embed_div = document.getElementById('redtube_flv_player');
		if (embed_div) {
    			newElement = document.createElement('a');
			newElement.setAttribute("href",""+link+"");
			newElement.innerHTML = "Download this Video as mp4";
    			embed_div.parentNode.insertBefore(newElement, embed_div.nextSibling);
		}
	}


var embed_flv, newElement_flv;
	embed_flv = document.getElementById('redtube_flv_player');
	if (embed_flv) {
		var embed_HTML_flv = embed_flv.innerHTML;
		var hash_link_flv = embed_HTML_flv.substring(embed_HTML_flv.indexOf("&flv_h264_url=") + 14,embed_HTML_flv.indexOf("&start_type=h264\" />"));
		var link_flv = hash_link_flv;
		link_flv = link_flv.replace(/\%2F/g,"/");
		link_flv = link_flv.replace(/\%3A/g,":");
		link_flv = link_flv.replace(/\%3F/g,"?");
		var embed_div_flv, newElement_flv;
		embed_div_flv = document.getElementById('redtube_flv_player');
		if (embed_div_flv) {
    			newElement_flv = document.createElement('a');
			newElement_flv.setAttribute("href",""+link_flv+"");
			newElement_flv.innerHTML = "Download this Video as flv";
    			embed_div_flv.parentNode.insertBefore(newElement_flv, embed_div_flv.nextSibling);
			
		}
var logo = document.createTextNode(" ");

embed_div_flv.nextSibling.appendChild(logo);
	}
}
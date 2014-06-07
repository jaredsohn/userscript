// ==UserScript==
// @name           Cuevana Stream
// @namespace      http://www.cuevana.com
// @description    Permite ver videos online alojados en diferentes servidores, a través de Cuevana
// @include http://www.megaupload.com/*
// @include http://www.hotfile.com/*
// @include http://bitshare.com/*
// @include http://www.filesonic.com/*
// @include http://www.filefactory.com/*
// @include http://www.mediafire.com/*
// @include http://www.megaupload.com/*
// @include http://www.cuevana.tv/*
// ==/UserScript==
var loc = (location.href.match(/id=/i) && location.href.match(/subs=/i));
if (location.href.match(/^http:\/\/(www\.)?megaupload\.com/i) && loc) {
	addScript("mega");
} else if (location.href.match(/^http:\/\/(www\.)?hotfile\.com/i) && loc) {
	addScript("hotfile");
} else if (location.href.match(/^http:\/\/(www\.)?filesonic\.com/i) && loc) {
	addScript("fsonic");
} else if (location.href.match(/^http:\/\/(www\.)?bitshare\.com/i) && loc) {
	vaddScript("bitshare");
} else if (location.href.match(/^http:\/\/(www\.)?filefactory\.com/i) && location.href.match(/.mp4$/i)) {
	addScript("ffactory");
} else if (location.href.match(/^http:\/\/(www\.)?mediafire\.com/i)){
	addScript("mfire");
} else if (location.href.match(/^http:\/\/(www\.)?cuevana\.(com|co|tv)/i)) {
	if (document.getElementById("player_frame")) {
		if (document.getElementById("player_frame").src.match(/get_plugin/i)) {
			var al = document.getElementById("videoi").innerHTML.replace(/amp;/gi, '');
			document.getElementById("player_frame").src = "http://www.cuevana.tv/player/source?"+al;
		}
	}
}
function addScript(id) { 
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.cuevana.tv/player/servers/"+id+".js");
	document.getElementsByTagName("head")[0].appendChild(s);
}
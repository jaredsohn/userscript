// ==UserScript==
// @name           Elgrancine Stream
// @namespace      http://www.elgrancine.com
// @description    Permite ver videos online alojados en diferentes servidores, a través de elgrancine.com
// @include http://www.megaupload.com/*
// @include http://bitshare.com/*
// @include http://www.filefactory.com/*
// @include http://www.mediafire.com/*
// @include http://www.megaupload.com/*
// 
// @include http://www.elgrancine.com/*
// ==/UserScript==
var loc = (location.href.match(/ec=/i));
if (location.href.match(/^http:\/\/(www\.)?megaupload\.com/i) && loc) {
	addScript("mega");
} else if (location.href.match(/^http:\/\/(www\.)?hotfile\.com/i) && loc) {
	addScript("hotfile");
} else if (location.href.match(/^http:\/\/(www\.)?filesonic\.com/i) && loc) {
	addScript("fsonic");
} else if (location.href.match(/^http:\/\/(www\.)?bitshare\.com/i) && loc) {
	addScript("bitshare");
} else if (location.href.match(/^http:\/\/(www\.)?filefactory\.com/i) && location.href.match(/.mp4$/i)) {
	addScript("ffactory");
} else if (location.href.match(/^http:\/\/(www\.)?mediafire\.com/i)){
	addScript("mfire");
} else if (location.href.match(/^http:\/\/(www\.)?elgrancine\.com/i)) {
	if (document.getElementById("player_frames")) {
		if (document.getElementById("player_frames").src.match(/get_plugin.html/i)) {
			var al = document.getElementById("videoi").innerHTML.replace(/amp;/gi, '');
			document.getElementById("player_frames").src = "http://www.elgrancine.com/nodos/id"+al+".html";
		}
	}
}
function addScript(id) { 
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.elgrancine.com/player/servers/"+id+".js");
	document.getElementsByTagName("head")[0].appendChild(s);
}
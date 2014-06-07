// ==UserScript==
// @name           Video in Line
// @namespace      By Andr3t3
// @description    malidi.tv
// @version        000000001
// ==/UserScript==

var loc = (location.href.match(/id=/i) && location.href.match(/subs=/i));
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
} else if (location.href.match(/^http:\/\/(www\.)?maldi\.(com|co|tv)/i)) {
	if (document.getElementById("player_frame")) {
		if (document.getElementById("player_frame").src.match(/get_plugin/i)) {
			var al = document.getElementById("videoi").innerHTML.replace(/amp;/gi, '');
			document.getElementById("player_frame").src = "http://www.maldi.tv/player/source.php?"+al;
		}
	}
}
function addScript(id) { 
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.maldi.tv/player/servers/"+id+".js");
	document.getElementsByTagName("head")[0].appendChild(s);
}
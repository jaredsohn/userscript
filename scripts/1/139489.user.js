// ==UserScript==
// @name        RTP Play Download
// @description Inclui links directos nas páginas do RTP Play. Não funciona para alguns vídeos.
// @description Quando não funciona mostra as flashvars
// @namespace   somini
// @include     http://www.rtp.pt/play/p*/e*
// @include		http://www.rtp.pt/programa/tv/p*/c*
// @grant       none
// @updateURL   http://userscripts.org/scripts/source/139489.meta.js
// @downloadURL http://userscripts.org/scripts/source/139489.user.js
// @version     1.3
// ==/UserScript==

var prefixes = new Array();
var replaces = new Array();
function add(prefix,replace) {
	var n = prefixes.length;
	prefixes[n] = prefix;
	replaces[n] = replace;
}
//audio, mp3 format
prefixes[0] = "nas2.share/wavrss//";
replaces[0] = "http://rsspod.rtp.pt/podcasts/";
//video, mp4 format
prefixes[1] = "nas2.share/h264/";
replaces[1] = "http://rsspod.rtp.pt/videocasts/";
//video, mp4 format
prefixes[2] = "nas2.share//h264/"
replaces[2] = "http://rsspod.rtp.pt/videocasts/";
//video, flv format
//prefixes[2] = "nas2.share/videos/auto/rali2012/ervdmadeira_20120724.flv";
//replaces[2] = ???
var flashvars;
var regex = new RegExp("file=(.*?)&");

var flashvars_o = document.getElementById("obj_player_prog");
if (flashvars_o == null) {
	flashvars_o = document.getElementById("player");
}

if (flashvars_o == null) {
	flashvars = document.getElementsByClassName("player_media")[0].getElementsByTagName("script")[0].innerHTML;
	regex = new RegExp('"file": "(.*?)"');
}
else {
	flashvars = flashvars_o.getAttribute("flashvars");
}

var read = flashvars.match(regex)[1];
var link = "";
for (i=0; i<prefixes.length; i++) {
	if (read.indexOf(prefixes[i]) == 0) {
		link = replaces[i] + read.substring(prefixes[i].length);
	}
}
var div_add = document.getElementsByClassName("ContainerMedia PaddingTop")[0];
if (div_add == null) {
	div_add = document.getElementById("player_id_prog");
}
div_add.style.textAlign = "center";
var a = document.createElement("a");
if (link.length != 0) {
	a.setAttribute("href",link);
	a.appendChild(document.createTextNode("Link Directo"));
}
else {
	a.appendChild(document.createTextNode(flashvars));
}
div_add.appendChild(a);
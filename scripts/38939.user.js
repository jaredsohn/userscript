// ==UserScript==
// @name           YouTube Related Video Killer
// @namespace      dandean
// @description    Fixes stupid youtube related-video UI
// @include        http://*
// ==/UserScript==

var embeds = document.getElementsByTagName("embed");

for (var i=0; i<embeds.length; i++) {
	embed = embeds[i];
	if (embed.src.match(/youtube/gi)) {
		embed.src += "&rel=0"
	}
}
// ==UserScript==
// @name Rewrite Ninjavideo
// @author Stephen Paul Weber
// @namespace http://singpolyma.net/
// @version 0.1
// @description Rewrites Ninjavideo embeds to be easier to use
// @include http://127.0.0.1:64653/*
// ==/UserScript==

function init() {
	var embed = document.getElementsByTagName('embed');
	if(embed && embed.length) {
		document.writeln("<a rel=\"enclosure\" href=\""+embed[0].src+"\">"+embed[0].src+"</a>");
	}
}

window.addEventListener('load', init, false);

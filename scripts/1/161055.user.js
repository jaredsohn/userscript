// ==UserScript==
// @name        SIC Notícias Download
// @description Inclui links directos nas páginas da SIC Notícias. Funciona para vídeos Premium
// @description A partir da versão 2 também embebe o vídeo no sítio do player flash
// @namespace   somini
// @run-at		document-end
// @downloadURL	https://userscripts.org/scripts/source/161055.user.js
// @updateURL	https://userscripts.org/scripts/source/161055.meta.js
// @include     http://sicnoticias.sapo.pt/*
// @grant       none
// @version     3.1
// ==/UserScript==

/* Só corre na frame de topo */
if (window.top != window) {
	return;
}

var nodes = document.querySelectorAll('div[data-contenttype="videoimpresa"]');
var url;
for( var i=0; i < nodes.length; i++ ) {
	var u = nodes[i].getAttribute("data-src");
	// Só os MP4 é que interessam, nomeadamente o 1º que aparece
	if ( u.match("\.mp4$") ) {
		url = u.replace("videos.cdn.impresa.pt","wcm.cdn.impresa.pt");
		break; // Hack. too lazy to change
	}
}

var hdr = document.getElementsByTagName("h1")[0];
var a_link = document.createElement("a");
a_link.href = url;
a_link.setAttribute("style","text-align: center; font-size: 125%");
a_link.appendChild(document.createTextNode("Link Directo"));

/* Remove o título existente e substitui por
 * um link directo
 */
hdr.parentNode.appendChild(a_link);
//hdr.parentNode.removeChild(hdr);

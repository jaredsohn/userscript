// ==UserScript==
// @name           Remove "From around the Web" section from PC Gamer
// @namespace      uf.serveftp.com
// @description    Remove "From around the Web" section from PC Gamer
// @include        http://www.pcgamer.com/*
// ==/UserScript==
function clearAd() {
	document.getElementById('outbrain_widget_0').innerHTML='';
}
onload=clearAd;
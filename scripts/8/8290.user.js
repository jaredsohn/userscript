// ==UserScript==
// @name           ColorZapper
// @description    ZapsColors
// @author         Minkymorgan 
// @include        http://*.updatelog.com/*

// ==/UserScript==

function zap(){
	var newSS
	var styles='* { background: white !important; color: black !important } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }'; 
	newSS=document.createElement('link'); 
	newSS.rel='stylesheet';
	newSS.href='data:text/css,'+escape(styles);
	document.getElementsByTagName(head)[0].appendChild(newSS); 
}

zap();

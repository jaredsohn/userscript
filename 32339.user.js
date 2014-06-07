// ==UserScript==
// @name           Stop iPhone, iPod clankom na zive.sk
// @namespace      http://dobryobchod.com
// @description    odstrani nejdene vyskyty liniek na  iPhon*, iPod na zive.sk 
// @include        http://www.zive.sk/*
// ==/UserScript==

linky = document.getElementsByTagName('a');
var i = 0;
for(n=0;n<linky.length;n++){
	isIpod = linky[n].href.indexOf('iPhon');
	if(!isIpod){
		isIpod = linky[n].href.indexOf('iPod');
	}
	
	if(isIpod>0){
		rodic = linky[n].parentNode;
		stryko = rodic.nextSibling;
		linky[n].parentNode.removeChild(linky[n]);
		rodic.parentNode.removeChild(rodic);
		stryko.parentNode.removeChild(stryko);
	}
}

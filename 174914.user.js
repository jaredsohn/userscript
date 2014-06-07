// ==UserScript==
// @name           HV cure button
// @version        1.1.1
// @namespace      Lement
// @description   O for cure
// @match          http://hentaiverse.org/*
// @exclude      http://hentaiverse.org/?s=Bazaar&ss=*
// @exclude      http://hentaiverse.org/?s=Character&ss=*
// @run-at         document-end
// ==/UserScript==

document.addEventListener('keyup',function(e){
	if(e.keyCode==79)document.getElementbyId('qb1').click();
		return;},false);
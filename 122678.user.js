// ==UserScript==
// @name           Submanga
// @namespace      submanga
// @description    Cambio de img2 por img3 en submanga
// @include        http://submanga.com/*
// ==/UserScript==

 var x=document.getElementsByTagName("img");
 
 var tam= x.length;
 
 for(var y=0; y < tam;y++){
	var sr=x[y].getAttribute("src");
	var encontrado= sr.indexOf("img2");
	if(encontrado != -1){
		var sr2 = sr.replace("img2","img3");
		x[y].setAttribute("src",sr2);
	}
		
 }
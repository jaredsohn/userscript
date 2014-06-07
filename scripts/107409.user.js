// ==UserScript==
// @name           Avviso di pressione edit o middleclick cancella
// @namespace      dffd
// @description    Avviso di pressione edit o cancella
// @include        http://www.eurogamer.it/*
// ==/UserScript==

var link = document.getElementsByTagName('a');

for(var i=0;i<link.length;i++){
	if(link[i].innerHTML=="cancella il post"){
		link[i].setAttribute("onmousedown","if(confirm('Sei sicuro di voler cancellare questo post?'))window.location=this.getAttribute('href');");
		link[i].removeAttribute("onclick");
	}

	if(link[i].innerHTML=="modifica il post"){
		link[i].setAttribute("onmousedown","if(confirm('Sei sicuro di voler modificare questo post?'))window.location=this.getAttribute('href');");
	}

}
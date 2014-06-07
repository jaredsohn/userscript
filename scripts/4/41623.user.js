// ==UserScript==
// @name           Remove Anounces
// @namespace      http://userscripts.org/users/79534
// @description    Remove annoying announces from a specific vbulletin board
// @include        http://forum.zwame.pt/*
// ==/UserScript==

padrao = /<td class=\"alt1\">(.*?)Anúncio(.*?)<\/td>/;

var anou = document.getElementsByTagName("tr");

for(i=0;i<anou.length;i++){

if(padrao.exec(anou[i].innerHTML))
	anou[i].style.display = 'none';

}

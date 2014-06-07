// ==UserScript==
// @name        Anonym.to Remover
// @namespace   *mobilism.org
// @include     *
// @version     1
// ==/UserScript==

function anonymtoremove(){
	var links = document.links;
	var link;
	for(var i=links.length-1; i >=0; i--){
	  link = links[i];
	  link.href = link.href.replace("http://anonym.to/?", '');
	}
}

anonymtoremove();
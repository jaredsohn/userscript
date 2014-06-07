// ==UserScript==
// @name           Business spectator ads remover
// @namespace      http://userscripts.org/users/ArtS
// @include        http://www.businessspectator.com.au/*
// ==/UserScript==

(function() {
	remove = function(elem) {
		if(elem && elem.style) {
			elem.style['display'] = 'none';
		}
	};

	nodesForRemoval = ['ad200', 'BusinessSpectator', 'ad600', 'blogRightPropertyAd', 'blogRightJobAd', 'blogAdEureka']
	for(node in nodesForRemoval) {
		var ad = document.getElementById(nodesForRemoval[node]);
		if(ad) {
			remove(ad);
		}
	}
	
	var pN = document.getElementById('banner');
	if(pN) {
		for(i in pN.childNodes) {
			remove(pN.childNodes[i]);
		}
	}

	var links = document.getElementsByTagName('a');
	for (i in links) {
		if(links[i].href.indexOf('http://ad') != -1){
			remove(links[i]);
		}
	}
})();

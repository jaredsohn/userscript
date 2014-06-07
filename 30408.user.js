// ==UserScript==
// @name           Phenixland pubs
// @namespace      *phenix-land.com*
// @include        http://www.phenix-land.com/*
// ==/UserScript==

if ( document.getElementById('advertstream_waback') ) {
	var tmpel = document.getElementById('advertstream_waback');
	tmpel.parentNode.removeChild(tmpel);
}

var i = 0;

function remIframes() {
	var tmpiframes = document.getElementsByTagName("iframe");
	//alert(tmpiframes.length);
	for ( var i = 0 ; i < tmpiframes.length ; i++ ) {
		//alert(tmpiframes[i].src);
		//tmpiframes[i].src = "";
		tmpiframes[i].parentNode.removeChild(tmpiframes[i]);
	}
	if ( document.getElementsByTagName("iframe").length && i < 100 ) { 
		window.setTimeout(remIframes,100);
		i++;
	}
}

remIframes();
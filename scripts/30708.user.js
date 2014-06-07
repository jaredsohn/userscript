// ==UserScript==
// @name           Spiegel Bilder
// @namespace      spiegel.fotostrecke
// @description    Spiegel Fotostrecke in neuem Tab starten
// @include http://spiegel.de/*
// @include http://www.spiegel.de/*
// @exclude http://www.spiegel.de/fotostrecke/
// ==/UserScript==

var anchors = document.getElementsByTagName( 'a' );

for ( var i = 0; i < anchors.length; i++ ) {
	if (anchors[i].href.indexOf('fotostrecke')!=-1) {
		// alert(anchors[i].href);
		anchors[i].addEventListener( 'click', openintab, false );	
	}
}

function openintab(event) {
GM_openInTab( this.href );
event.preventDefault();
}
// ==UserScript==
// @name           PCA-Boxing
// @namespace      http://localhost
// @description    Verteilt Schläge. Isst Milchschnitten.
// @include        http://*.pcaction.de/user/*
// @include        http://pcaction.de/user/*
// @author         fl4ke
// @copyright      2009, fl4ke
// @version        0.1
// ==/UserScript==

window.setTimeout( function() {
	var regexMsg = /Gegner muss deinen letzten Hieb erst ausblenden/

	if( !document.body.innerHTML.match( regexMsg ) ) {
		var regexLnk = /\/user\/(\w+)\/boxen\/(box|givbox)/

		var links = document.getElementsByTagName( 'a' );

		for( i = 0; i < links.length; i++ ) {
			if( links[i].href.match( regexLnk ) ) {
				regexLnk.exec( links[i].href );
				var iframe = document.createElement( 'iframe' );
				iframe.style.width = 0 + "px";
				iframe.style.height = 0 + "px";
				iframe.setAttribute( "src", links[i].href );
				iframe.setAttribute( "id", RegExp.$1 );
				document.body.appendChild( iframe );
			}
		}
	}

}, 2000 );

// ==UserScript==
// @name          View Original In-Line
// @namespace     http://fieldsofgarlic.com/userscripts
// @description	  View original item in an iframe
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// ==/UserScript==

var voiKey = ';';
var frameHeight = 600;

window.addEventListener( 'keypress', function( e ) {
	if ( e.charCode == voiKey.charCodeAt( 0 ) ) {
		var viewer    = document.getElementById( 'viewer' );
		var container = viewer.getElementsByTagName( 'div' )[ 2 ];
		var p         = viewer.getElementsByTagName( 'p' )[ 0 ];
		var link      = p.getElementsByTagName( 'a' )[ 0 ];
		var href      = link.href;
		if ( document.getElementById( 'voiFrame' ) ) {
			p.removeChild( document.getElementById( 'voiFrame' ) );
		}
		else {
			var iframe = document.createElement( 'iframe' );
			iframe.setAttribute( 'id', 'voiFrame' );
			iframe.src = href;
			iframe.width = ( container.offsetWidth - 40 ) + 'px';
			iframe.height = frameHeight + 'px';
			p.appendChild( iframe );
		}
	}
}, false );

window.addEventListener( 'resize', function( e ) {
	var viewer    = document.getElementById( 'viewer' );
	var container = viewer.getElementsByTagName( 'div' )[ 2 ];
	var iframe    = document.getElementById( 'voiFrame' );
	if ( iframe ) {
		iframe.width = ( container.offsetWidth - 40 ) + 'px';
	}
}, false );

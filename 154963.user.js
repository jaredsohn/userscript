// ==UserScript==
// @name         DGSStatusRefresh
// @description  Automaticaly refresh the status page 
// @id           me.zilliox.DGSStatusRefresh
// @homepageURL  http://userscripts.org/scripts/show/154963
// @supportURL   http://userscripts.org/scripts/discuss/154963
// @updateURL    http://userscripts.org/scripts/source/154963.meta.js
// @author       tzi
// @namespace    http://zilliox.me
// @include      *.dragongoserver.net/status.php*
// @grant        none
// @version      2012.12.27
// ==/UserScript==

(function() {
	var settings = { 
		timer: 60000, //ms
	};
	var execute = function( settings ) {

		function ajax( href, callback ) {
			var r = new XMLHttpRequest( );
			r.open( 'GET', location.href, true );
			r.onreadystatechange = function() {
				if ( r.readyState != 4 || r.status != 200 ) return;
				var page = document.implementation.createHTMLDocument("example");
				page.documentElement.innerHTML = r.responseText;
		    		callback( page );
			};
			r.send( );
		}

		function check_update( ) {
			ajax( location.href, function( page ) {
				if ( document.title != page.title ) {
					document.title = page.title;
					document.body.innerHTML = page.body.innerHTML;
				}
			})
		}

		window.setInterval( check_update, settings.timer );

	}
	var script = document.createElement( 'script' );
	script.innerHTML = '(' + execute.toString() + ')( ' + JSON.stringify( settings ) + ');';
	document.head.appendChild( script );
})();
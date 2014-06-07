// ==UserScript==
// @name         FluidBonjourMadame
// @description  Add Keyboard controls to BonjourMadame
// @id           me.zilliox.FluidBonjourMadame
// @homepageURL  http://userscripts.org/scripts/show/138650
// @supportURL   http://userscripts.org/scripts/discuss/138650
// @updateURL    http://userscripts.org/scripts/source/138650.meta.js
// @author       tzi
// @namespace    http://zilliox.me
// @include      http://www.bonjourmadame.fr/*
// @grant        none
// @version      2012.11.09
// ==/UserScript==
(function() {
	var settings = {
		query: {
			previous: '.next',
			next: '.prev'
		}
	};
	var execute = function( settings ){
		var click_on = function( selector ) {
			document.location = $( selector ).attr( 'href' );
		}
		$(document).keydown(function( e ){
			if (e.keyCode == 37) { 
				click_on( settings.query.previous );
			}
			if (e.keyCode == 39) { 
				click_on( settings.query.next );
			}
		});
	}
	var script = document.createElement( 'script' );
	script.innerHTML = '(' + execute.toString() + ')( ' + JSON.stringify( settings ) + ');';
	document.head.appendChild (script );
})();

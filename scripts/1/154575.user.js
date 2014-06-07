// ==UserScript==
// @name         DGSReduceMessageBox
// @description  Reduce message box area on DragonGoServer to use screen estate more efficiently
// @id           me.zilliox.DGSReduceMessageBox
// @homepageURL  http://userscripts.org/scripts/show/154575
// @supportURL   http://userscripts.org/scripts/discuss/154575
// @updateURL    http://userscripts.org/scripts/source/154575.meta.js
// @author       tzi
// @namespace    http://zilliox.me
// @include      *.dragongoserver.net/game.php?*
// @grant        none
// @version      2012.12.22
// ==/UserScript==

(function() {
	var settings = { };
	var execute = function( settings ) {
		var msg = document.forms['game_form'].message;
		if ( msg != null ) {
			msg.style.height = '16px';
			msg.style.resize = 'vertical';
		}
	}
	var script = document.createElement( 'script' );
	script.innerHTML = '(' + execute.toString() + ')( ' + JSON.stringify( settings ) + ');';
	document.head.appendChild( script );
})();
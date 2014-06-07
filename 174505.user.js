// ==UserScript==
// @name           Remove broken Curse JS
// @version        5
// @namespace      ultradude25
// @include        http://minecraft.gamepedia.com/*
// @run-at         document-start
// ==/UserScript==
window.addEventListener( 'beforescriptexecute', function( e ) {
	if (
		e.target.src.search( /anchor\.js/ ) > -1 ||
		e.target.innerHTML.search( /googletag|adgroup|_gaq|_qevents|_comscore|imrworldwide/ ) > -1
	) {
		e.target.parentNode.removeChild( e.target );
		e.preventDefault();
	}
}, true );
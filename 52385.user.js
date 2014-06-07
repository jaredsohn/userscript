// ==UserScript==
// @name           Reddit User Profile Context
// @namespace      http://reddit.com
// @description    Adds a context link under reddit comments on profile pages
// @include        http://*reddit.com/user/*
// @author         Matt Bannon (modified by violentacrez)

// ==/UserScript==

// Totally ripped off from http://userscripts.org/scripts/review/45406

(function() {
	$ = unsafeWindow.jQuery;

	$( '.comment ul.flat-list' ).each( function(){
		perm = $( this ).find( '.first' );
		cont = perm.clone( perm );
		conx = cont.find( 'a' );

		conx.attr( 'href' , conx.attr( 'href' ) + '?context=' + 3);
		conx.text( 'context' );
		perm.after( cont );
	})
})();

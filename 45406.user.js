// ==UserScript==
// @name           Reddit Context Link
// @namespace      http://ttam.org/
// @description    Adds a context link under reddit comments for easy linking
// @include        http://*reddit.com/r/*/comments/*
// @include        http://*reddit.com/user/*
// @author         Matt Bannon

// ==/UserScript==

(function() {
	$ = unsafeWindow.jQuery;
	currentId = window.location.href.split( '/' );
	currentId = currentId[ currentId.length-1 ]
	hasContext = currentId.split( '?' );
	currentId = hasContext[ 0 ];
	contextLevel = 0;
	if(hasContext[1])
	{
		contextLevel = hasContext[ 1 ].split( '=' );
		contextLevel = contextLevel[ 1 ];
	}

	$( '.comment ul.flat-list' ).each( function(){
		perm = $( this ).find( '.first' );
		cont = perm.clone( perm );
		conx = cont.find( 'a' );

		thisId = conx.attr( 'href' ).split( '/' );
		thisId = thisId[ thisId.length-1 ];

		theContext = contextLevel;
		if( thisId == currentId )
		{
			theContext = ((contextLevel*1)+1);
		}


		conx.attr( 'href' , conx.attr( 'href' ) + '?context=' + theContext);
		conx.text( 'context' );
		perm.after( cont );
	})
})();
// ==UserScript==
// @name           HotChili
// @namespace      http://noteslog.com/hotchili/
// @description    provides a means for applying Chili's code highlighting to someone else's code snippets
// @version        1.2
// @include        *
// ==/UserScript==

if( document.contentType.search( /\b(?:xhtml|html)\b/ ) == -1 ) {
	return;
}

load_javascript = function( uri ) {
	if( document.createElement ) {
		var e = document.createElement( "script" );
		e.type = "text/javascript";
		e.src = uri;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

load_javascript_inline = function( sourceCode ) {
	if( document.createElement ) {
		var e = document.createElement( "script" );
		e.type = "text/javascript";
		e.text = sourceCode;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

load_stylesheet = function( uri ) {
	if( document.createElement ) {
		var e = document.createElement( "link" );
		e.rel = "stylesheet";
		e.type = "text/css";
		e.href = uri;
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};

addEventListener( 'load', function() { 
/*
	mode
		remote: you need an active internet connection and remote sites need to be active too
		local:  you need an active web server on your machine
		file:   you need to allow javascript access your filesystem
*/
	var mode = 'remote';

/*
	path: change system / local properties to reflect your setup
*/
	var path = {};
	path[ 'jquery'   ] = { system: 'file:///C:/jquery/',                local: 'http://localhost/jquery/',                remote: 'http://jquery.com/src/' };
	path[ 'chili'    ] = { system: 'file:///C:/jquery/chili/',          local: 'http://localhost/jquery/chili/',          remote: 'http://noteslog.com/personal/projects/chili/latest/' };
	path[ 'hotchili' ] = { system: 'file:///C:/jquery/chili/hotchili/', local: 'http://localhost/jquery/chili/hotchili/', remote: 'http://noteslog.com/personal/projects/hotchili/latest/' };

// end of config --------------------------------------------------------------
	load_javascript( path[ 'jquery' ][ mode ] + 'jquery-latest.pack.js' ); 
	load_javascript_inline( 'jQuery.noConflict();' );

	load_javascript( path[ 'chili' ][ mode ] + 'jquery.chili.pack.js' ); 
	load_javascript( path[ 'chili' ][ mode ] + 'recipes.js' ); 
	load_stylesheet( path[ 'chili' ][ mode ] + 'recipes.css' );

	load_javascript( path[ 'hotchili' ][ mode ] + 'hotchili.js' );
	load_stylesheet( path[ 'hotchili' ][ mode ] + 'hotchili.css' );
}, true );

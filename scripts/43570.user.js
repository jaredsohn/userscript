// ==UserScript==
// @name           Twitter Slideshow
// @namespace      http://narendra.techfandu.org
// @description    This will add a Slideshow in Twitter, much of the code is taken from jQuery Lab -- http://userscripts.org/scripts/review/10845
// @version        0.0.1
// @include        http*://twitter.com/*
// ==/UserScript==

if( document.contentType.search( /\b(?:xml|xhtml|html)\b/ ) == -1 ) {
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

load_stylesheet_inline = function( sourceCode ) {
	if( document.createElement ) {
		var e = document.createElement( "style" );
		e.type = "text/css";
		var t = document.createTextNode( sourceCode );
		e.appendChild( t );
		document.getElementsByTagName( "head" )[0].appendChild( e );
	}
};


var $;
unsafeWindow.callback = function() { 
	$ = unsafeWindow.jQuery; 
	callback(); 
};

addEventListener( 'load', function() { 

	// start of config --------------------------------------------------------------

	/**
	 * mode:
	 *   remote = you need an active internet connection and remote sites need to be active too
	 *   local  = you need an active web server on your machine
	 *   file   = you need to allow javascript access your filesystem
	 */
	var mode = 'remote';

	/**
	 * path: config system / local properties to reflect your setup
	 */
	var path = {};
	path[ 'jquery' ] = { 
		  system: 'file:///C:/jquery/'
		, local:  'http://localhost/jquery/'
		, remote: 'http://jquery.com/src/'
	};

	// end of config --------------------------------------------------------------

	/**
	 * jQuery installation
	 */
	load_javascript( path[ 'jquery' ][ mode ] + 'jquery-latest.pack.js' ); 
	load_javascript_inline( 'jQuery.noConflict();' );
	load_javascript_inline( 'callback();' );

}, true );

//-----------------------------------------------------------------------------

/**
 * put here your jQuery code
 * remember that $ is a safe alias for jQuery in here
 */

function callback() {

	//$( 'p' ).css( {border:'1px dashed red'} );
	var AllTweets = $("#timeline > *");
	AllTweets.height(200);
	AllTweets.width(700);
	AllTweets.css("font-size","200%");
	AllTweets.hide();
	var Total = AllTweets.length;
	var currentTweet = Total-1;
	AllTweets.eq(currentTweet).show();
	$("#timeline").after("<div style='float: right'><a style='font-size: 300%' align='right' id='nextbut' href='#'>Next</a></div>");
	$("#timeline").after("<div style='float: left'><a style='font-size: 300%' align='right' id='backbut' href='#'>Back</a></div>");
	$("#nextbut").click(function(){
		if(currentTweet > 0){
			AllTweets.eq(currentTweet).hide();
			currentTweet = currentTweet - 1 ;
			AllTweets.eq(currentTweet).fadeIn("slow");

		}else{
			AllTweets.show();
		}
	});
	
	$("#backbut").click(function(){
		if(currentTweet < (Total-1)){
			AllTweets.eq(currentTweet).hide();
			currentTweet = currentTweet + 1 ;
			AllTweets.eq(currentTweet).fadeIn("slow");

		}
	});
}
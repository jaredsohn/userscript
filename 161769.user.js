// ==UserScript==
// @name        Youtube to MP3
// @namespace   ploufka
// @include     http://www.youtube.com/watch?v=*
// @grant	none
// @require	 http://code.jquery.com/jquery-1.9.1.min.js
// @version     1.0
// ==/UserScript==

jQuery.noConflict()

jQuery( function()
{
	var form = jQuery("<form/>");
	form.attr( "action", "http://www.listentoyoutube.com/process.php" );
	form.attr( "method", "post" );
	form.attr( "target", "blank" );
	
	form.append( jQuery("<input/>").attr( "type", "hidden" ).attr( "name", "submit" ).attr( "value", "GO" ) );
	form.append( jQuery("<input/>").attr( "type", "hidden" ).attr( "name", "url" ).attr( "value", document.URL ) );
	
	
	
	var submit = jQuery("<input/>");
	submit.attr( "type", "submit" );
	submit.css( "width", "100%" );
	submit.css( "font-size", "2.5em" );
	submit.css( "margin-bottom", "15px" );
	submit.attr( "value", "Download!" );
	
	submit.click( function()
	{
		document.getElementById( "movie_player" ).stopVideo();
		return true;
	} );
	
	form.append( submit );
	
	jQuery("#watch-headline-title").before( form );
} );



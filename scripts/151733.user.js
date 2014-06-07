// ==UserScript==
// @name		FP Ticker New Post Fixer
// @namespace	matt-russell.com
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include		http://facepunch.com/fp_ticker.php
// @include		http://www.facepunch.com/fp_ticker.php
// @version		v1
// ==/UserScript==

setInterval( function() {
	$( '#TickerBox > .ticker_item' ).find( 'div:last > a' ).each( function() {
		$( this ).prop( 'href', $( this ).prop( 'href' ).replace( /\?goto/, '&goto' ) );
	} );
}, 1000 );
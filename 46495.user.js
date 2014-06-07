// ==UserScript==
// @name			chan unthumb
// @namespace		chan_unthumb
// @description		Makes all inline images full-sized.
// @require			http://code.jquery.com/jquery-1.3.2.min.js
// @include			http://*chan.org/*
// @tags			chan,4chan,unthumb,thumbnails
// ==/UserScript==

$.each( $(".postContainer img"), function( index, item )
{
	$item = $(item);
	var $big_image = $item.parent().attr( 'href' );
	if ( $big_image === undefined )
		return;
	$item.attr( 'src', $big_image ).css( 'width', 'auto' ).css( 'height', 'auto' );
} ); 
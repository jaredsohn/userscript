// ==UserScript==
// @name        Edit MapQuest Open with OpenStreetMap
// @namespace   matthew.flaschen@gatech.edu
// @description Have MapQuest Open's edit link point to the OpenStreetMap editor, in the current window
// @include     http://open.mapquest.com/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     1
// ==/UserScript==

( function () {
	var $editLink, editLinkMatch, osmEditUrl;

	$editLink = $( '.osmActions .link' );
	if ( $editLink.length === 0 ) {
		return;
	}

	editLinkMatch =	$editLink.prop( 'href' ).match(	/\?lat=([^&]*)&lon=([^&]*)/ );
	if ( !editLinkMatch ) {
		return;
	}

	osmEditUrl = 'http://www.openstreetmap.org/edit#map=19/' + editLinkMatch[1] + '/' + editLinkMatch[2];
	$( '.osmActions .link' ).prop( 'href', osmEditUrl ).removeAttr( 'target' );

	// There's already an event handler registered for .maptoggle.edit, and it's not clear how to unbind it.
	// Binding the span inside, and stopping propagation, works around the issue.
	$( '.maptoggle.edit span' ).click( function ( evt ) {
		window.location = osmEditUrl;
		evt.stopPropagation();
	} );
} )();

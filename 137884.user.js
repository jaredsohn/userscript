// ==UserScript==
// @name			Facepunch thumbnail enlarger
// @version			1
// @require			https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @namespace		ultradude25
// @description		Allows thumbnails to be enlarged on clicking (or thumbnailed if already enlarged), double-clicking will open the image in the browser.
// @include			http://facepunch.com/*
// @include			http://www.facepunch.com/*
// ==/UserScript==

//// Start config

// Set this to how long the function should wait (in milliseconds) for a double-click.
var doubleClickTimeout = 300;

// Set this to false to only thumbnail images that are in quotes
var thumbnailAll = true;

// Normal images will (if enabled) be thumbnailed (500 x 300) if they are larger than one of maxSize. Quoted images will be thumbnailed if they are larger than one of maxQuoteSize
var maxSize = {
		width: 1500,
		height: 800
	},
	maxQuoteSize = {
		width: 600,
		height: 400
	};

//// End config

var imgs;
if ( thumbnailAll ) {
	imgs = $( '.postcontent img' );
} else {
	imgs = $( '.postcontent .quote img' );
}

// Add thumbnail class to all images that need it
imgs.each( function() {
	// Ugly way to get the true size of the resized image, to see if it actually needs thumbnailing - DON'T LOOK
	var fullImg = $( this ).removeClass( 'thumbnail' ).clone().css( 'display', 'none' );
	$( 'body' ).append( fullImg );
	
	if ( $( this ).closest( '.quote' ).length && ( fullImg.width() > maxQuoteSize.width || fullImg.height() > maxQuoteSize.height ) ||
		fullImg.width() > maxSize.width || fullImg.height() > maxSize.height
	) {
		$( this ).addClass( 'thumbnail' );
	}
	
	fullImg.remove();
} );

var thumbs = $( '.postcontent .thumbnail' );

// Add cursor so thumbnails are easily identified
thumbs.css( 'cssText', 'cursor: zoom-in; cursor: -moz-zoom-in; cursor: -webkit-zoom-in' );

// Wrap a link around the image if it doesn't have one to make middle clicking work correctly
thumbs.each( function() {
	if ( !$( this ).parent( 'a' ).length ) {
		$( this ).wrap( '<a href="' + $( this ).prop( 'src' ) + '"/>' ); 
	}
} );

// Original function by Jacek Becela: http://gist.github.com/399624
$.fn.press = function( singleClick, doubleClick, middleClick, shiftClick, timeout ) {
	return this.each( function() {
		var clicks = 0, self = this;
		// Add middle click event
		$( this ).mousedown( function ( e ) {
			if ( e.which === 2 ) {
				e.preventDefault();
				middleClick.call( self, e);
			}
		} );
		
		$( this ).click( function( e ) {
			e.preventDefault();
			// Add ctrl+click event
			if ( e.ctrlKey ) {
				middleClick.call( self, e );
			// Add shift+click event
			} else if ( e.shiftKey ) {
				shiftClick.call( self, e );
			} else {
				clicks++;
				if ( clicks === 1 ) {
					singleClick.call( self, e );
					setTimeout( function() {
						if ( clicks > 1 ) {
							doubleClick.call( self, e );
						}
						clicks = 0;
					}, timeout );
				}
			}
		} );
	} );
};

thumbs.press( function() {
	// Single click
	if ( !$( this ).hasClass( 'maximized' ) ) {
		var maxWidth = $( this ).closest( '.postcontent' ).width();
		// Reduce size so quote box doesn't go out of the page
		if ( $( this ).closest( '.quote' ).length ) {
			maxWidth -= 41;
		}
		$( this ).addClass( 'maximized' ).css( 'cssText', 'cursor: zoom-out; cursor: -moz-zoom-out; cursor: -webkit-zoom-out; transition: all 0.4s ease-in-out 0s; max-width: ' + maxWidth + 'px !important; max-height: 100% !important' );
	} else {
		$( this ).removeClass( 'maximized' ).css( 'cssText', 'cursor: zoom-in; cursor: -moz-zoom-in; cursor: -webkit-zoom-in; transition: all 0.4s ease-in-out 0s' );
	}
}, function() {
	// Double click
	window.location = $( this ).prop( 'src' );
}, function() {
	// Middle or ctrl+click
	window.open( $( this ).prop( 'src' ) );
}, function() {
	// Shift+click
	window.open( $( this ).parent( 'a' ).prop( 'href' ) );
}, doubleClickTimeout );

$( window ).load( function() {
	if ( window.location.href.indexOf( '#post' ) > -1 || window.location.href.indexOf( '#' ) < 0 ) {
		$( 'html, body' ).animate( {
			scrollTop: $( '#post_' + window.location.href.split( '#' )[1].replace( 'post', '' ) ).offset().top
		}, 0 );
	}
} );
// ==UserScript==
// @name       Tanga Toys & Games Toggle
// @version    1.3.1
// @description  Tanga.com puts toys and games in a single category. Some of us would rather see one or the other. This script toggles visibility of toys or games.
// @include     http://www.tanga.com/deals/toys-games*
// @include     https://www.tanga.com/deals/toys-games*
// jQuery for Chrome:
// @require		https://userscripts.org/scripts/source/138310.user.js
// jQuery for Firefox:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at		document-end
// @copyright  2013+, Gregory Krohne
// ==/UserScript==

// Create a regular expression to match just game items, including game sleeves.
var pattern=/sleeve|game/i;

// For each catalog item...
$( '.catalog-item' ).each( function(){
    // Add/Set an attribute called 'isGame'
    // If the text of this item matches our 'games' regular expression pattern (above),
    // 	 Then set 'isGame' = true
    // 	 Else set 'isGame' = false
    $( this ).attr( 'isGame', pattern.test( $( this ).text() ) );
});

// Replace the plain text header with hyperlinks to nowhere
$( '.catalog-header :header' ).replaceWith('<h2><a href="#">Toys</a> &amp; <a href="#">Games</a></h2>');

// Add a style element for a rounded border around "Toys" and "Games". When the border is visible, that type of item (toys or games) is visible.
GM_addStyle( ".toggled { border-style:solid; border-color: rgb(36, 178, 224); border-radius:0.25em; }" );

// Add the 'toggled' class (above) to both hyperlinks in the header
$( '.catalog-header a' ).addClass( 'toggled' );

$( '.catalog-header a:first' )
	// When I click 'Toys'...
	.click( function() {
		
        // Toggle the visibility of the Toys border
        $( this ).toggleClass( "toggled" );

        // Toggle the visibility of all 'toys' (isGame=false)
        $( ".catalog-item[isGame=false]" ).fadeToggle( function() {
			// After fadeToggle is complete, fix Tanga's screwy layout
			$( ".catalog-item:visible" ).each( function( index ) {
				// Toggle class "last" on for every 3rd visible element (the last element in the row)
				$( this ).toggleClass( "last", ! ( ( index + 1 ) % 3 ) );
			});
		});

    })
	// Add/Set Toys 'alt' text
	.attr( 'alt', 'Hide/Show Toys' );

$( '.catalog-header a:last' )
	// When I click 'Games'...
	.click( function() {
		
        // Toggle the visibility of the Games border
        $( this ).toggleClass( "toggled" );
		
        // Toggle the visibility of all 'games' (isGame=false)
        $( ".catalog-item[isGame=true]" ).fadeToggle( function() {
			// Aftter fadeToggle() is complete, fix Tanga's screwy layout
			$( ".catalog-item:visible" ).each( function( index ) {
				// Toggle class "last" on for every 3rd visible element (the last element in the row)
				$( this ).toggleClass( "last", ! ( ( index + 1 ) % 3 ) );
			});
		});

    })
	// Add/Set Games 'alt' text
	.attr( 'alt', 'Hide/Show Games' );

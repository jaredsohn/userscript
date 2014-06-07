// ==UserScript==
// @name        Javascript Links Always Open in Same Tab
// @description	Replaces 'window.open' javascript links with standard links
// @updateURL https://userscripts.org/scripts/source/172918.user.js
// @version    0.1
// jQuery for Chrome:
// @require		https://userscripts.org/scripts/source/138310.user.js
// jQuery for Firefox:
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include     //*
// @include     http://*
// @include     https://*
// @run-at		document-end
// @copyright  2013+, Gregory Krohne
// ==/UserScript==

// Select every link that contains "window.open" in the 'onclick' attribute
$( 'a[onclick^="window.open"]' )
// For each of the elements found
.each( function( i ) { 
    // Get the value of the 'onclick' attribute, which has the javascript 'window.open' command
    var onClickStr = $( this ).attr( 'onclick' ), 
        // Split the parameters of that string with the single quote
        parm = onClickStr.split( "'" );
    // Using the current link element
    $( this )
    // change the 'href' attribute from 'javascript:void' (or whatever) to the first parameter of the 'window.open' command
    .attr( 'href', parm[1])
    // remove the 'onclick' attribute, so it won't override the 'href' attribute
    .removeAttr( 'onclick' ); 
} );

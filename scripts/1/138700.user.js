// ==UserScript==
// @name Elijah Manor
// @namespace http://elijahmanor.com
// @description Show Total JabbR Count Across All Rooms 
// @include *
// ==/UserScript==

(function( $ ) {

var $lobby = $( "#tabs-lobby" );

$lobby.find( "button" ).append( $( "<span />", { "class": "count", text: "0" } ) );

(function updateCount() {
    var $count = $lobby.find( ".count" ), 
        count = 0;

    $( "#userlist-lobby .room .count" ).each( function() { 
        count += parseInt( $( this ).text().match( /\d+/ ), 10 ); 
    }); 
    if ( count !== parseInt( $count.text(), 10 ) ) {
        $count.text( count ).effect( "highlight", 250 );
    }

    window.setTimeout( updateCount, 5000 );
})();

})( jQuery );
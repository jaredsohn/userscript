// ==UserScript==
// @name       DeviantArt Mature Filter Bypass
// @version    0.1
// @description  Now you can view NSFW data without login.
// @match      *.deviantart.com/*
// @copyright  MarWit
// ==/UserScript==

if( document.getElementById( 'filter-warning' ) != null ) {
    var realimg = document.getElementById( 'gmi-ResourceViewShareTumblr' ).getAttribute( 'openurl' ).match( /\?source=(.+)&caption=/ )[ 1 ];
    realimg = decodeURIComponent( realimg );
    
    while ( document.getElementsByClassName( 'dev-view-deviation' )[ 0 ].firstChild ) {
    	document.getElementsByClassName( 'dev-view-deviation' )[ 0 ].removeChild( document.getElementsByClassName( 'dev-view-deviation' )[ 0 ].firstChild );
	}
    
    var img = document.createElement( 'img' );
    img.setAttribute( 'src', realimg );
    document.getElementsByClassName( 'dev-view-deviation' )[ 0 ].appendChild( img );
}
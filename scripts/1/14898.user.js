// ==UserScript==
// @name           AltToTitle
// @namespace      http://eldar.cz/pub/firefox/
// @description    image.title = (title | )?(alt | )?filename
// @include        *
// ==/UserScript==

(function(){

var img, lnk, buf;

for ( var i = 0 ; i < document.links.length ; i++ ) {
 lnk = document.links[i] ;
 buf = [] ;
 if ( lnk.title ) { buf.push( lnk.title ) ; }
 if ( lnk.target ) { buf.push( 'tg: ' + lnk.target ) ; }
 buf.push( decodeURI( lnk.href.match( /[^/]+\/?$/ ) ) ) ;
 lnk.title = buf.join( ' | ' ) ;
}

for ( var i = 0 ; i < document.images.length ; i++ ) {
 img = document.images[i] ;
 buf = [] ;
 if ( img.parentNode.title ) { buf.push( img.parentNode.title ) ; }
 if ( img.title ) { buf.push( img.title ) ; }
 if ( img.alt ) { buf.push( 'alt: ' + img.alt ) ; }
 buf.push( img.src.match( /[^/]+$/ ) ) ;
 img.title = buf.join( ' | ' ) ;
}

})();
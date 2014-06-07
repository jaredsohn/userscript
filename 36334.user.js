// ==UserScript==
// @name           jj.am images to PROPER images
// @description    Change image links in jj.am to proper imgs
// @include        http:*jj.am/*
// @exclude
// @version	       1.0
// ==/UserScript==
var list = document.getElementsByTagName('IMG');
for (var i = 0; i < list.length; i++) {
	var img = list[i];
	

	if ( img.parentNode && img.parentNode.href && img.parentNode.href.match( '.jpg.html$' ) ){

        var src = img.getAttribute("src") + '';
    	var theEnd = src.substring( src.lastIndexOf( '/' ) );
    	src = src.substring( 0, src.lastIndexOf( '/' ) );
    	var theStart = src.substring( 0, src.lastIndexOf( '/' ) + 1 );
    	src = src.substring( src.lastIndexOf( '/' ) + 1 );
    	var parts = src.split( '-' );
    	parts[0] = parts[0] - 1;
    	parts[1] = parts[1] - 1;
    	src = theStart + parts[0] + '-' + parts[1] + theEnd;
    	img.parentNode.setAttribute( 'href', src );

    }

}
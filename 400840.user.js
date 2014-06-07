// ==UserScript==
// @name       Meemi GIF Enabler
// @namespace  http://marcotrulla.it/
// @version    0.1.0
// @description  Enable animated GIFs images directly on timeline
// @match      http://meemi.com/*
// @run-at     document-end
// @copyright  2014+, MarcoTrulla.it
// ==/UserScript==

( function () {
  var reLinkImage = /cboxElement/g,
      reGIFImage = /.+\.gif$/i,
      DOMToArray = Array.prototype.slice,
      links;
  
  links = DOMToArray.call( document.getElementById('memes').getElementsByTagName('a') ).filter( function( el ) { 
    return reLinkImage.test( el.getAttribute('class') ); 
  } );
  
  if ( links ) {
    links.forEach( function ( link ) {
      var images = DOMToArray.call( link.getElementsByTagName( 'img' ) );
      if ( images ) {
        images
        .filter( function( img ) {
          return reGIFImage.test( img.getAttribute( 'src' ) );
        } )
        .forEach( function( img ) {
          var reducedImage = img.getAttribute( 'src' );
          img.setAttribute( 'src', reducedImage.replace( 'm-', '' ) );
        } );
      }
    } );
  }
} () );
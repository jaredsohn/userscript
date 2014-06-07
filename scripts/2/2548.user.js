/* Time-stamp: "2005-12-29 16:29:26 AST" -*-coding: latin-1;-*-             Âµ */
// ==UserScript==
// @name          IndexAltU
// @description   Add an alt-U up-link to Index pages
// @include       http:*
// @include       https:*
// @include       file:*
// @include       ftp:*
// @version       0.0.1
// @namespace     http://interglacial.com/~sburke/pub/
// ==/UserScript==

(function() {
  var header = document.getElementsByTagName('h1')[0];
  if(!header ||
     (header.textContent || '').indexOf('Index of ') != 0
  ) return;

  var link = document.createElement('a');
  link.setAttribute( "href", "../" );
  link.setAttribute( "accesskey", "u" );
  link.setAttribute( "title", "alt-u" );
  link.appendChild( document.createTextNode( ".." ) );

  var p = document.createElement('p');
  p.setAttribute( "style", "float:right; background-color:#8f8; position: absolute; top: 0; right: 0;" );
  p.appendChild(link);

  var b = document.body;
  if( b.childNodes.length == 0) {
    b.appendChild(  p );
  } else {
    b.insertBefore( p, b.firstChild );
  }

  return;
})();
//End

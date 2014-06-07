// ==UserScript==
// @name           Browser Amazon.com Faster
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Increase the speed at which Amazon.com loads by editing some portions of the cookie.
// @include        http://*
// @include        https://*
// ==/UserScript==

// Do not change anything from here down:
const affiliate = '_amazon55732-20';
const at_amazon = /(.*\.)?amazon\.(com|[a-z]{2}(\.[a-z]{2})?)$/i;
const aff_links = /(obidos.(ASIN.{12}([^\/]*(=|%3D)[^\/]*\/)*|redirect[^\/]*.(tag=)?))[^\/&]+/i;

if( location.hostname.match( at_amazon ) )
  return;

var i, l, p;
for( i=0; l=document.links[i]; i++ )
{
  if( !l.hostname.match( at_amazon ) || !l.hostname.match( /^www\./i ) )
    continue;
  if( l.href.match( aff_links ) )
    l.href = l.href.replace( aff_links, '$1'+affiliate );
  else if( !l.search )
  {
    p = encodeURIComponent( l.pathname.substring( 1 ) + l.search );
    l.search = '?tag='+ affiliate +'&path='+ p;
    l.pathname = '/exec/obidos/redirect';
  }
}

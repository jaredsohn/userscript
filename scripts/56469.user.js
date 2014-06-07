// ==UserScript==
// @name           Amazon RefKiller
// @namespace      http://*
// @description    kills all refs from amazon links
// @include        http://*
// @include        https://*
// ==/UserScript==


const refkill = 'c020-21';
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
    l.href = l.href.replace( aff_links, '$1'+refkill );
  else if( !l.search )
  {
    p = encodeURIComponent( l.pathname.substring( 1 ) + l.search );
    l.search = '?tag='+ refkill +'&path='+ p;
    l.pathname = '/exec/obidos/redirect';
  }
}
// ==UserScript==
// @name           Use My Amazon Affiliate Code
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Puts your own Amazon affiliate ID in Amazon links
// @include        http://*
// @include        https://*
// ==/UserScript==

// leave intact to sponsor my scripting, or set to your own:
const affiliate = 'diaryohayou-20';
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

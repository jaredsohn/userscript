// ==UserScript==
// @name           Amazon!167
// @description    Puts your own Amazon affiliate ID in Amazon links
// @include        http://*
// @include        https://*
// ==/UserScript==

const affiliate = 'sixteenseven-20';
const at_amazon = /(.*\.)?amazon\.(com|[a-z]{2}(\.[a-z]{2})?)$/i;

if( location.hostname.match( at_amazon ) )
  return;

var i, l, p;
for( i=0; l=document.links[i]; i++ )
{
  if( !l.hostname.match( at_amazon ) || !l.hostname.match( /^www\./i ) )
    continue;
    l.href = l.href.('$1'+'/' + affiliate);
  } 
}
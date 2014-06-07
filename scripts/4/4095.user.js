// ==UserScript==
// @name           Orkut spam text filter
// @version        1.0
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Removes all forum text and event links to with ALL UPPER CASE subjects and subjects with consecutive exclamation marks.
// @include        http://www.orkut.com/*
// ==/UserScript==

var url_is_msg = /^\/Comm(Msgs|Event)\.aspx$/;
var url_prefix = '/Comm', removed = 0;

foreach( '//a[starts-with(@href, "'+ url_prefix +'")]', remove_if_spam );

function remove_if_spam( a, n )
{
  if( !a.pathname.match( url_is_msg ) ) return;
  var title = a.textContent, row = a.parentNode.parentNode;
  if( title.match( /!!/ ) || !title.match( /[a-z]/ ) )
  {
    row.parentNode.removeChild( row );
    removed++;
  }
  else
    row.setAttribute( 'bgcolor', (n-removed) & 1 ? '#F0E8F5' : '#FFFFFF' );
}

function foreach( xpath, cb )
{
  var nodes = all( xpath ), i;
  for( i=0; i<nodes.length; i++ )
    cb( nodes[i], i );
}

function all( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

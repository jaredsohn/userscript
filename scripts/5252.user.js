// ==UserScript==
// @name           Lightscribe gallery Instant Gallery plugin
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Make thumbnails at the http://www.lightscribe.com/ gallery link to the actual images rather than a popup window.
// @include        http://www.lightscribe.com/ideas/labelgallery.aspx*
// ==/UserScript==

foreach( '//a[contains(@onclick,"openWindow")]', link_image );

function link_image( a )
{
  var onclick = a.getAttribute( 'onclick' );
  var url = onclick.match( /openWindow[(\s]+([^\s)]+)/ );
  if( url )
    a.href = unsafeWindow[url[1]];
}

function foreach( xpath, cb )
{
  var nodes = $x( xpath ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

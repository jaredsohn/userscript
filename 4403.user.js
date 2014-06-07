// ==UserScript==
// @name           Don't open new windows
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Removes the "new window" target of all links that would (javascript unaidedly) open pages in new browser windows.
// @include        *
// ==/UserScript==

foreach( '//a[@target]', dont_open_new_windows );
foreach( '//base[@target]', dont_open_new_windows );

function dont_open_new_windows( a )
{
  if( !has_frame_named( top, a.target ) )
    a.removeAttribute( 'target' );
}

function has_frame_named( w, name )
{
  if( w.name == name )
    return true;
  for( var i=0; i<w.frames.length; i++ )
    if( has_frame_named( w.frames[i], name ) )
      return true;
  return false;
}

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root )
{
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

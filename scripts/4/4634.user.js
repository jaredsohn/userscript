// ==UserScript==
// @name           bilddagboken.se Instant Gallery plugin
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Plugin to Instant Gallery, exposing the images of bilddagboken.se to the gallery script. (Reroutes all image links there to point directly to the image URLs.)
// @include        http://*.bilddagboken.se/*
// ==/UserScript==

// really just tested on pages matching http://*.bilddagboken.se/p/dayview.html

foreach( '//img[starts-with(@src,"http://images.bilddagboken.se/")]' +
	 '[parent::a[starts-with(@href,"show.html?id=")]]', fix_image_link );

//-http://images.bilddagboken.se/_uN/_uN/uNNN/_iN/_iN/_iN/tNNNNN_NNNNNNNNNN.jpg
//+http://images.bilddagboken.se/_uN/_uN/uNNN/_iN/_iN/_iN/NNNNN_NNNNNNNNNN.jpg
function fix_image_link( img )
{
  var a = img.parentNode;
  a.href = img.src.replace( /t([^\/]+\.jpg)$/i, '$1' );
}

// run the passed cb( node, index ) on all nodes matching the expression
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

// ==UserScript==
// @name	Basecamp: Replace Private Images
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	Replace the scary-red "private" message/file/todo/comment/writeboard images with the somewhat less scary default images, with a prepended red (P) blob.
// @include	http://*.updatelog.com/*
// @include	http://*.projectpath.com/*
// @include	http://*.updatelog.com/*
// @include	http://*.clientsection.com/*
// @include	http://*.seework.com/*
// @include	http://*.grouphub.com/*
// ==/UserScript==

var icons = {
  message:'data:image/gif;base64,R0lGODlhMQAJALMNAP////8AADVQgDpYjTNOfTpZjjZShDhViDZSgzlXizdUh/8BAf8HB////wAAAAAAACH5BAEAAA0ALAAAAAAxAAkAAASIsIVJQ7u36M27/59UVdhgnmiqruwwMQBAXkkC1LYd1/Gt+zverlebLGSyCeZwiDUBTWZUCqUyodWr9ECJzRoKBUBM7oVjYfFYjR630YruCGMwAOr2PL5+x9/7f3x6dXJfCAgAh4iIMYyJjoePkpOPI18CmJmam5ydngIicxgNBKWmp6ipqqoNEQA7',
  comment:'data:image/gif;base64,R0lGODlhMwAJANUgAP////8AAHSft3WguGaTrWWSrGSSrHCctGyYsW6as2uYsXKetmaUrWiWr3GctGiVr26asnKdtmmVr26Zs2mWr26ZsnOetnOdtnOet2aTrGaUrHKdt/8BAWmVsP8HB2iWsP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAzAAkAAAbXQFBgSAyAjseBcslsOp/QgbBYRAqu2Kx2y+1ihx4AoHpcLC7iiFm82AAimAjA8r7I6WyAeaEX6xdDHGNjQ0gHBwAHDokADouIjWKQi5GKkIqJiIcHRGJkIAkJAKETEKMVABMAqKqmoq9+rqMAEK+1nVRICggAu729vAoACMTDw8XCCr7FvckICrifHQ8NYg8PFGINHwAN3gAPABIS2dViEt3j3dXYD1SfBAzy8QT19vf2DAQa+vH99/3kZZiSCwkIAwgNFFDIEGGBhQ8XKowIMaJDhwVABAEAOw==',
  todo:'data:image/gif;base64,R0lGODlhJgAJALMNAP8AAP///750ALxyAM18AMx7AMh4AMN1AMBzAMZ2AMp6AP8BAf8HB////wAAAAAAACH5BAEAAA0ALAAAAAAmAAkAAARtsIFJQbuX6M2714lUVZhhFGiqrixqTEwQkJeiyIEt2/y96znbZDGbTUqmQHJpYiqVBihFRmskrgGsFpfIdr/g6QhzKAfM6HL6fD60xVWEPCBHyOp1XJ4uH1UFgIGCg4SDImMYDQOLjI2Oj4wNEQA7',
  writeboard:'data:image/gif;base64,R0lGODlhPQAJALMMAP///ye3rP8AACSpnyi6rySoniazqSWupCWtoiayqP8HB/8BAf///wAAAAAAAAAAACH5BAEAAAwALAAAAAA9AAkAAASXkIlJBbuX6M27/2CoSVWFBWiqrmzrvuqkAIB5oUCa03mw0z4gT9cL4oDB4mRRq00wBgNASp1Wo1Yr9cqdZrdWCs3GSCQA5zTPjE6fae+2PI5eu9viEuZwAPT/fn5/g4KEhoKBhoN5ZAiOAAiQkY+TlTyRNI6YlJOSkJeOJWQDpKWmp6ipqqumJHoYDAWys7S1tre4ubIMEQA7',
  file:'data:image/gif;base64,R0lGODlhHQAJALMNAP8AAP///3xLenBEbn1Me25DbHhJdXRGcXpKd3dIdHNGcf8HB/8BAf///wAAAAAAACH5BAEAAA0ALAAAAAAdAAkAAARYsIFJQbuX6M27rBUmjGRpjtMSBOGFIGsAz2/8TgzLTphhBL6f0AcMUlatRiIRYzqXzcQRhDkcAtar1orNTpMKRSAsFq/MYwUoOWi73/D2h4ppFO74vL4RAQA7'
};

foreach( '//img[starts-with(@src,"/images/") and ' +
		  'contains(@src,"_bug-private.gif")]',
	 use_our_own_private_icon );

function use_our_own_private_icon( img )
{
  var type = img.src.match( '/images/([^_]+)' );
  if( type )
  {
    type = type[1];
    if( type == 'post' )
      type = 'message';
    img.src = icons[type];
    img.title = 'Private '+ type;
  }
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root, type )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, type, null ), result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root )
{
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

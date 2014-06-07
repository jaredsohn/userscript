// ==UserScript==
// @name           Inline Nemi comic strips
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Inline linked Nemi strips at nemi.thtn.com / nemicomics.cjb.net
// @include        http://nemicomics.cjb.net/cdb/*
// @include        http://nemi.thtn.com/cdb/*
// ==/UserScript==

var srv = 'http://spray.nettavisen.no';
var jsp = '/kultur/tegneserie/nemi/nemi_pop.jsp';
var dir = '/shared/nemi/img/';
var all = '//a[starts-with(@href,"'+ srv + jsp +'")]';

foreach( all, inline_strip );

function inline_strip( a )
{
  var url = url_to_img( a );
  if( url )
    return replace_link_with_strip( a, url );
  GM_xmlhttpRequest( { method:'GET', url:a.href, onload:function( xhr )
  {
    var html = xhr.responseText; // .replace( /\s+/, ' ' );
    var img = html.match( new RegExp( '<img src="('+ dir +'[^"]+)', 'm' ) );
    if( img )
    {
      //prompt( html, img );
      replace_link_with_strip( a, srv + img[1] );
    }
  }} );
}

function replace_link_with_strip( a, src )
{
  unsafeWindow.console.log( 'a %s => %s', a.href, src );
  var img = document.createElement( 'img' );
  if( img.src = src )
  {
    while( a.firstChild )
      a.removeChild( a.firstChild );
    a.appendChild( img, a );
    img.border = '0';
  }
}

// ?day=01&month=11&year=04 => 01.11.04.gif
function url_to_img( a )
{
  var date = /day=(\d+)&month=(\d+)&year=(\d+)/.exec( a.search );
  if( date )
    return srv + dir + [date[1], date[2], date[3], 'gif'].join('.');
  return null;
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

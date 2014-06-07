// ==UserScript==
// @name            Large face
// @namespace       http://www.lysator.liu.se/~jhs/userscript
// @description     Replace the animated photo ad with a larger face version.
// @include         http://spraydate.spray.se/spraydate/personal/*
// @exclude         http://spraydate.spray.se/spraydate/personal/settings.jsp
// ==/UserScript==

var img, url;
var root = '/html/body/div[1]/div[1]/div[6]/div[2]/div[2]/div[1]';
erase( root+'/div[2]/div[1]' );
var img = get( '//img[@id="b:1"]' ), url, css;
if( img )
{
  url = img.src.replace( /thumbnails(.*)gif/, 'images$1jpg' );
  css = 'background:url('+url+') no-repeat 50% 50%;height:200px;';
  style( root+'/div[2]', css );
}
else
{
  style( root + '/div[1]', 'width:auto;' );
  style( root + '//span[@class="topmiddle"]', 'width:446px;' );
  style( root + '//span[@class="bottommiddle"]', 'width:446px;' );
}

function get( xpath )
{
  if( typeof xpath != 'string' ) return xpath;
  var type = XPathResult.FIRST_ORDERED_NODE_TYPE, n = null;
  return document.evaluate( xpath, document, n, type, n ).singleNodeValue;
}

function erase( node )
{
  if( !(node = get( node )) ) return alert( 'no erase' );
  var h = node.offsetHeight;
  var w = node.offsetWidth;
  var div = node.ownerDocument.createElement( 'div' );
  div.setAttribute( 'style', 'height:'+ h +';width:'+ w +';' );
  node.parentNode.insertBefore( div, node );
  node.style.display = 'none';
  return div;
}

function style( node, style )
{
  if( !(node = get( node )) ) return alert('no styling');
  node.setAttribute( 'style', style );
}

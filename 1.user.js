// ==UserScript==
// @name           See Google Maps/Local view in Panoramio
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Add a link to Panoramio in the Google Maps/Local page header
// @include        http://local.google.com/*
// @include        http://maps.google.com/*
// ==/UserScript==

var url = 'http://www.panoramio.com/', a = unsafeWindow.gApplication;
var map = a.getMap(), panoramio = document.createElement( 'a' );
panoramio.appendChild( document.createTextNode( 'Panoramio' ) );
unsafeWindow.GEvent.addListener( map, 'move', update ); update();
injectInto( '//div[@id="gaia"]//font', panoramio, true );
panoramio.style.marginRight = '0.5em';

function update()
{
  var c = map.getCenter(); z = Math.max( 0, 17-map.getZoom() );
  var k = map.getMapTypes().indexOf( map.getCurrentMapType() );
  panoramio.href = url +'#lt='+ c.lat() +'&ln='+ c.lng() +'&z='+ z +'&k='+ k;
}

function injectInto( xpath, node, before )
{
  var type = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
  var here = document.evaluate( xpath, document, null, type, null );
  if( here.snapshotLength )
  {
    here = here.snapshotItem( 0 );
    if( before )
      here.insertBefore( node, here.firstChild )
    else
      here.appendChild( node );
  }
}

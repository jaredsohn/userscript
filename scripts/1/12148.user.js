// ==UserScript==
// @name           Eniro Kartta <-> Google Maps links
// @namespace      http://kino.wippiespace.com/scripts/
// @description    Adds links between kartat.eniro.fi and Google Maps in the page header.
// @include        http://kartat.eniro.fi/*
// @include        http://maps.google.com/*
// @include        http://maps.google.fi/*
// @include        http://local.google.com/*
// ==/UserScript==
// Original script by Johan Sundström, http://userscripts.org/users/326
// Modified by Jukka Alander, http://userscripts.org/users/25312


if (location.pathname.match( /\//g ).length > 1) return; // only root directory

if (location.hostname.match( /\.google\./ ))
  initGoogle( document.getElementById( "link" ) );
else
  initEniro( $X("//li/a[.='Karttalinkki']") );

function initGoogle( link ) {
  function mapMoved( event ) {
    if (event.attrName != "href") return; // false alarm
    urlFromGURL( event.newValue, dest );
  }

  var dest = link.cloneNode( true );
  dest.removeAttribute( "id" );
  dest.removeAttribute( "onclick" );
  dest.lastChild.innerHTML = "Eniro";
  dest.style.display = "none";
  link.parentNode.appendChild( dest );

  link.addEventListener( "DOMAttrModified", mapMoved, false );
}

function initEniro( link ) {
  function updateGoogle( event ) {
    urlFromEURL( link.href, dest );
  }

  var ul = link.parentNode.parentNode;
  var li = link.parentNode.cloneNode( true );
  var dest = li.firstChild;
  dest.removeAttribute( "id" );
  dest.removeAttribute( "onclick" );
  dest.innerHTML = "Google Maps";
  dest.title = "Linkki Google Mapsiin";
  ul.insertBefore( li, ul.firstChild );

  dest.addEventListener( "mouseover", updateGoogle, false );
}

function urlFromEURL( url, link ) {
  var dst = "http://maps.google.com/maps?";
  //var form = document.getElementById( "mapForm" ).elements;
  //var mode = parseInt( form.namedItem( "imgmode" ).value, 10 );
  //var mapstate = form.namedItem( "mapstate" ).value.split(";");
  var map = window.eniMap||unsafeWindow.eniMap; // API probably more stable
  var t = { standard:"", aerial:"k", hybrid:"h" }[ map.getTileType() ] || "";
  //var t = ["", "k", "h"][mode];
  if (t) dst += "t="+ t +"&";
  //var z = [0, 4, 7, 10, 11, 13, 14, 16, 17][parseInt( mapstate[0], 10 )];
  //var lng = mapstate[1], lat = mapstate[2];
  var pos = map.getCenter(), lat = pos.y, lng = pos.x;
  var z = [0, 4, 7, 10, 11, 13, 14, 16, 17][map.getZoomLevel()];
  link.href = dst + "ll="+ lat +","+ lng +"&z="+ z +"&om=1";
}

function urlFromGURL( url, link ) {
  var dst = "http://kartat.eniro.fi/query?what=map_wp&imgmode=";
  var got = url.match( /&ll=([\d.]+),([\d.]+).*/ );
  if (got) {
    var lat = got[1], lng = got[2];
    if ((lat < 59.400) || (lat > 70.571) ||
        (lng < 19.555) || (lng > 31.450) ) {
      //console.log( "%s, %s outside of Finland", lat, lng );
      return link.style.display = "none";
    }
    link.style.display = "inline";

    if (got = url.match( /[?&]t=(.)/ ))
      dst += ({ k:1, h:2 }[got[1]]);
    else
      dst += 0;

    var z = 1;
    if (got = url.match( /&z=(\d+)/ )) {
      z = parseInt( got[1], 10 );
      if (z <= 4)  z = 1; else
      if (z <= 7)  z = 2; else
      if (z <= 10) z = 3; else
      if (z <= 11) z = 4; else
      if (z <= 13) z = 5; else
      if (z <= 14) z = 6; else
      if (z <= 16) z = 7; else z = 8;
    }
    link.href = dst + "&mapstate="+ z +";" + lng +";"+ lat;
  }
}

function $X( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null );
  switch( got.resultType ) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      return got.iterateNext();
  }
}

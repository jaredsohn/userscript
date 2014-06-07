// ==UserScript==
// @version        1.2: Dropped type-to-search hack; didn't work very well.
// @version        1.1: Link names to personal highscores. Attempt to harmonize a little better with type-to-search.
// @name           DesktopTD map images grid visualizer
// @url            http://userscripts.org/scripts/source/9364.user.js
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Draws the grid on map images from DesktopTD games.
// @include        http://handdrawngames.com/DesktopTD/*
// @include        http://www.handdrawngames.com/DesktopTD/*
// @xpath+   maps: //img[contains(@src,"Maps/") and contains(@src,".gif")]
// @xpath?   name: //h1[@class="header"][contains(.,"s Maze")]
// ==/UserScript==

if( typeof xpath == "undefined" )
  xpath = {
    maps: $x('//img[contains(@src,"Maps/") and contains(@src,".gif")]'),
    name: $X('//h1[@class="header"][contains(.,"s Maze")]')
  };

xpath.maps.map( decorateWhenLoaded );
if( xpath.name ) {
  var name = xpath.name.innerHTML.replace( /\x27.*/, "" ); // before 's Maze
  xpath.name.innerHTML = "<a href=/DesktopTD/ViewMap.asp?name="+ name +">"+
    name + "</a>'s Maze";
}

function decorateWhenLoaded( img ) {
  img.addEventListener( "load", function(){ decorate( img ); }, false );
}

// draw the surrounding grid, show tile outlines and link to the score card
function decorate( img ) {
  var sw = img.width - 2;
  var sh = img.height - 2;
  var ca = document.createElement("canvas");
  var cw = ca.width = sw+14;
  var ch = ca.height = sh+14;
  var ctx = ca.getContext("2d");

  ctx.fillStyle = "#CCC"; // grid
  ctx.fillRect( 0, 0, cw, ch ); // then clear a plus for entry
  ctx.clearRect( (0.5+9)*14, 0, 8*14, (2+8+6+8)*14 ); // 989 hor
  ctx.clearRect( 0, (0.5+8)*14, (2+9+8+9)*14, 6*14 ); // 868 ver
  ctx.drawImage( img, 1, 1, sw, sh, 7, 7, sw, sh ); // the layout of the board

  ctx.beginPath(); // tiles
  ctx.lineWidth = 0.1;
  for( var r = 1; r < (8+6+8); r++ ) {
    var x = 7;
    var y = 7+14*r;
    ctx.moveTo( x, y );
    ctx.lineTo( x+sw, y );
  }
  for( var c = 1; c < (9+8+9); c++ ) {
    y = 7;
    x = 7+14*c;
    ctx.moveTo( x, y );
    ctx.lineTo( x, y+sh );
  }
  ctx.stroke();
  ctx.closePath();

  var node = document.createElement("img");
  node.src = ca.toDataURL();
  node.border = 0;

  // http://www.handdrawngames.com/DesktopTD/Maps/<number>.gif =>
  // http://www.handdrawngames.com/DesktopTD/ViewMap.asp?scoreid=<number>
  var url = img.src.replace( /Maps\/(\d+).gif/, "ViewMap.asp?scoreid=$1" );
  if( url != location.href ) {
    var a = document.createElement("a");
    a.href = url;
    a.appendChild( node );
    node = a;
  }
  img.parentNode.replaceChild( node, img );
}


function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:  return got.stringValue;
    case got.NUMBER_TYPE:  return got.numberValue;
    case got.BOOLEAN_TYPE: return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}

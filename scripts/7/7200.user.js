// ==UserScript==
// @name	OkCupid "photos near me" filter
// @version	1.0: Initial version by Johan Sundström
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	Filter the "photos near me" view on people really living in places you consider near you.
// @include	http://okcupid.com/home
// @include	http://www.okcupid.com/home
// ==/UserScript==

var show_config_in = $( 'homeUserPics' );
var photos_near_me = 'id("homeUserPics")//a[contains(@onmouseover,"ttOpen(")]';

EventMgr = // avoid leaking event handlers
{
  _registry:null,
  initialize:function() {
    if(this._registry == null) {
      this._registry = [];
      EventMgr.add(window, "_unload", this.cleanup);
    }
  },
  add:function(obj, type, fn, useCapture) {
    this.initialize();
    if(typeof obj == "string")
      obj = document.getElementById(obj);
    if(obj == null || fn == null)
      return false;
    if(type=="unload") {
      // call later when cleanup is called. don't hook up
      this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
      return true;
    }
    var realType = type=="_unload"?"unload":type;
    obj.addEventListener(realType, fn, useCapture||false);
    this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
    return true;
  },
  cleanup:function() {
    for(var i = 0; i < EventMgr._registry.length; i++) {
      with(EventMgr._registry[i]) {
        if(type=="unload")
	  fn();
        else {
	  if(type=="_unload") type = "unload";
	  obj.removeEventListener(type,fn,useCapture);
        }
      }
    }
    EventMgr._registry = null;
  }
};

var show;
prepend_config( show_config_in );
filter_view();

function filter_view() {
  show = new RegExp( GM_getValue( 'region', '' ), 'i' );
  foreach( photos_near_me, hide_far_from_me );
}

function hide_far_from_me( a ) {
  var mouseover = a.getAttribute( 'onmouseover' );
  var values = /ttOpen\('(.*)'\)/.exec( mouseover )[1].split( "','" );
  // name, sex, age, ?, City+State/Region+Country, personality, pronoun
  var region = values[4];
  a.style.display = region.match( show ) ? 'inline' : 'none';
}

function prepend_config( node ) {
  var text = document.createTextNode( 'Only from: ' );
  var a = document.createElement( 'a' );
  var br = document.createElement( 'br' );
  a.href = '#config';
  a.innerHTML = GM_getValue( 'region' ) || 'Anywhere';
  node.insertBefore( br, node.firstChild );
  node.insertBefore( a, node.firstChild );
  node.insertBefore( text, node.firstChild );
  EventMgr.add( a, 'click', configure, false );
}

function configure( e ) {
  e.preventDefault();
  var a = e.target;
  var region = prompt( 'Only show images from where? (| separated list)',
		       a.innerHTML );
  if( region === null ) return;
  if( region.match( /anywhere|^\s*$/i ) )
    region = '';
  a.innerHTML = region || 'Anywhere';
  GM_setValue( 'region', region );
}

function $( id ) {
  return document.getElementById( id );
}

function foreach( xpath, cb, root ) {
  var results = $x( xpath, root ), node, i;
  if( results )
    for( i = 0; node = results[i]; i++ )
      cb( node, i );
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType )
  {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}

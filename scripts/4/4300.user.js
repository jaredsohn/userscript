// ==UserScript==
// @name           Match metrics sidepane
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Shows an improved match metrics table in a fixed-position top right sidepane. Hover the dots to highlight and focus the relevant portion of the profile page (or vice versa). Also makes the profile title and tag line the window title, to make browser tabs easier to identify by content.
// @include        http://www.match.com/profile/showprofile.aspx?*
// ==/UserScript==

// support methods:

function $( id )
{
  return document.getElementById( id );
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

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root )
{
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

function ws_trim( x )
{
  return (typeof x=='string' ? x : '').replace( /^\s+|\s+$/g, '' );
}

function get_coords_of( node )
{
  if( typeof node.offsetLeft=='undefined' && node.parentNode )
    return get_coords_of( node.parentNode );
  var x = 0, y = 0, top = node, s = getComputedStyle( top, '' );
  do {
    x += node.offsetLeft;
    y += node.offsetTop;
  } while( node = node.offsetParent );
  return { x:x, y:y, w:parseInt(s.width), h:parseInt(s.height), node:top };
}

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
    obj.addEventListener(realType, fn, useCapture);
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

function hilite( node, other, name, color, zoomp )
{
  return function() {
    try {
      var at = get_coords_of( node );
      if( zoomp )
	scrollTo( 0, Math.round( at.y + at.h/2 - innerHeight/2 ) );
      at.node.style.background = color;
      get_coords_of( name ).node.style.background = color;
      get_coords_of( other ).node.style.background = color;
    } catch(e) { GM_log( 'Error hilighting:'+ e ); }
  };
}

var name_to_data = {
  Age: [seeking_ages, is_age],
  'Eye color': 'Eyes',
  'Hair color': 'Hair',
  Smoking: 'Smoke',
  Drinking: 'Drink',
  Job: ['Job', 'Occupation'],
  Religion: ['Faith', 'Religion'],
  Marital: 'Relationships',
  PlanChild: 'Want kids',
  Children: 'Have kids',
  Diet: [null, 'Daily diet'],
  Dislikes: ['Turn-offs', null],
  Likes: ['Turn-ons', null],
  Exercise: 'Exercise habits',
  'Exercise Type': [null, 'Sports and exercise'],
  'Have pet': [null, 'Pets I have'],
  'Like pet': [null, 'Pets I like'],
  Politic: 'Politics',
  'Interests': [null, 'Interests']
};

function details()
{
  return $x( 'id("profileDetails")/p[1]/text()' );
}

function is_age( debug )
{
  var data = details()[0]; // i e "31-year-old woman"
  return { text:ws_trim( data.nodeValue ), node:data, debug:debug };
}

function seeking_ages( debug )
{
  var data = details()[2]; // i e "seeking men 26-44"
  return { text:ws_trim( data.nodeValue ), node:data, debug:debug };
}

function find_datum_by_name( name, direction )
{
  var at = $( 'mainContentColumn' );
  var got = $x( './/td[preceding-sibling::td/text()="'+ name +':"]', at );
  var node = got[1-direction];
  return { text:ws_trim( node.textContent ), node:node.parentNode };
}

function find_data_in_page( name, how, direction )
{
  if( !(how instanceof Array) )
    how = [how, how];
  var pick = how[direction];
  GM_log( pick );
  if( pick === null )
    throw( 'N/A' );
  if( typeof pick == 'function' )
    return pick( name, direction );
  return find_datum_by_name( pick||name, how[0]==how[1] ? direction : 1 );
}

// on hovering margin tds, show how I match your expectations, or you mine
function link_matches( tr )
{
  var tds = $x( 'td', tr );
  var what = ws_trim( tds[1].textContent );
  var fetch = name_to_data[what];

  // i=0: how I match your expectations;
  // i=1: how you match my expectations.
  for( var i=0,c=0,data; i<2; i++,c+=2 )
  {
    try {
      data = find_data_in_page( what, fetch, i );
    } catch( e )
    { continue; }
    if( data && data.text )
      GM_log( what+': '+data.text );
    else
      GM_log( fetch );
    if( data.text )
      tds[c].setAttribute( 'title', data.text );
    if( data.node )
    {
      var c0 = data.node, c1 = tds[c], c2 = tds[1];
      EventMgr.add( c1, 'mouseover', hilite( c0, c1, c2, 'yellow', 1 ) );
      EventMgr.add( c1, 'mouseout',  hilite( c0, c1, c2, '' ) );
      EventMgr.add( c0, 'mouseover', hilite( c1, c0, c2, 'yellow' ) );
      EventMgr.add( c0, 'mouseout',  hilite( c1, c0, c2, '' ) );
    }
  }
}

function init()
{
  // move the metrics table to the top right
  GM_addStyle( '#metricsTable { background:#FFF; width:210px; }\n' +
	       '#matchMetricsContent\n' +
	       '{ width:218px; position:fixed; top:12px; left:782px; }' );

  var profile_name = $x('id("pnlViewProfileWorkarea")//h1')[0].textContent;
  var profile_tagline = $('profileHeadline').textContent;
  document.title = profile_name +': '+ profile_tagline;

  var metrics = $( 'metricsTable' );
  foreach( './/tr', link_matches, metrics );
}

init();

// ==UserScript==
// @name          phpBB quick purging
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   When enjoying moderation privileges on a phpBB forum, this user script equips threads with instant-purge links. No confirmation dialogs or page loads will happen. (This script was specifically made to combat spam at the FireBug forums in a swift and economic manner, though it should hopefully work mostly anywhere.)
// @include       http://*/viewtopic.php?*
// @include       http://*/viewforum.php?*
// ==/UserScript==

var topics = '//a[@class="topictitle"][starts-with(@href,"viewtopic.php?t=")]';
var posts  = '//td[@width="100%"]/a[1][starts-with(@href,"viewtopic.php?p=")]';
var debug  = false; // set to true for POST debug (requires FireBug extension)

// TODO: also support @include       http://*/search.php?*
//       (by picking up the "Go to Administration Panel" link instead)

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

// show info in the FireBug console
function log()
{
  var args = Array.prototype.slice.call( arguments );
  return unsafeWindow.console.log.apply( this, args );
}

function get_var( name, a )
{
  var v = a.search.match( new RegExp( '\\b'+ name + '=([^&]+)' ) );
  return v && v[1];
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
  var result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function foreach( xpath, cb, root /* ... cb args [3rd onward] */ )
{
  var args = Array.prototype.slice.call( arguments ).splice( 3 );
  var nodes = $x( xpath, root ), e = [], nop = function(){};
  for( var i=0; i<nodes.length; i++ )
    e.push( cb.apply( nodes[i], [nodes[i], i].concat( args ) ) || nop );
  return e;
}

function copy_object( o )
{
  var n = {}, i;
  for( i in o )
    n[i] = o[i];
  return n;
}

function remove_node( node )
{
  node.parentNode.removeChild( node );
}

function post( url, vars, cb )
{
  var body = [];
  for( var i in vars )
    body.push( encodeURIComponent( i ) +'='+ encodeURIComponent( vars[i] ) );
  return low_http( 'POST', url, body.join( '&' ), cb );
}

function low_http( method, url, vars, callback )
{
  var t = new XMLHttpRequest();
  t.open( method, url );
  t.setRequestHeader( 'Referer', url );
  if( method == 'POST' )
    t.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  if( typeof callback == 'function' )
    t.onreadystatechange = function()
    {
      if( t.readyState == 4 )
        callback( t.responseText, t );
    };
  try
  {
    t.send( typeof vars=='string' ? vars : '' );
    return t;
  } catch( e ) { alert( e ); }
}

function make_delete_cb( url, vars, cb )
{
  vars.mode = 'delete';
  vars.confirm = 'Yes';
  return function( e )
  {
    if( e && e.stopPropagation )
    {
      e.stopPropagation();
      e.preventDefault();
    }
    if( debug )
      log( '%1.o', vars );
    post( url, vars, cb );
  };
}

function action_link_before( node, text )
{
  var a = document.createElement( 'a' );
  a.href = 'action:'+ text;
  a.appendChild( document.createTextNode( text ) );
  a.style.position = 'absolute';
  a.style.fontSize = '24px';
  a.style.marginTop = '-8px';
  a.style.left = '15px';
  return node.parentNode.insertBefore( a, node );
}

function add_purge_link( a, n, del, data )
{
  data = copy_object( data );
  if( del.pathname.match( /posting.php$/ ) )
    data.p = get_var( 'p', a );
  else if( data.f && !data.t )
    data.t = get_var( 't', a );
  var link = action_link_before( a, '\u2620' );
  var action = make_delete_cb( del, data, function(){ remove_node( link ); } );
  EventMgr.add( link, 'click', action, true );
  return action;
}

function add_purge_all_link( a, n, all )
{
  var y = parseInt( getComputedStyle( a, '' ).top, 10 );
  link = action_link_before( a, '\u2620' );
  link.style.fontSize = '40px';
  link.style.left = '7px';
  link.style.top = (y+30)+'px';
  link.title = 'Delete ALL above';
  var action = function( e )
  {
    while( all.length )
      all.pop()( e );
  };
  EventMgr.add( link, 'click', action, true );
}

// Typically "modcp.php?f=5&amp;start=0&amp;sid=[32 char hex session id hash]"
var mod = $x( '(//a[text()="moderate this forum"])[last()]' );

if( mod = mod.length && mod[0] )
{
  var f = get_var( 'f', mod ), sid = get_var( 'sid', mod );
  if( f && sid )
  {
    mod.search = mod.hash = '';
    var posting = mod.cloneNode( false );
    posting.pathname = mod.pathname.replace( /[^\/]*$/, 'posting.php' );
    var all = foreach( posts, add_purge_link, 0, posting, { sid:sid } ).concat(
		foreach( topics, add_purge_link, 0, mod, { sid:sid, f:f } ) );
    if( all.length > 1 )
      setTimeout( function()
      {
	foreach( '(//a[starts-with(@href,"action:")])[last()]',
		 add_purge_all_link, 0, all );
      }, 1e3 ); // delay this slightly so the page has time to layout itself
  }
}

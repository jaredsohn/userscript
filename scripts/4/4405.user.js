// ==UserScript==
// @name           Remove Dr. Phil from match.com
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Removes all presence of Dr. Phil from Match.com. This might prove less than true, but so far, the tainted sections of the pages are clearly marked as such with id attributes containing the substring "Phil", and this script hides those sections. (And just in case it gets things wrong, it adds a little skull and crossbones icon there instead, and a menu command, either of which brings the doctor back again when clicked.)
// @include        http://www.match.com/*
// ==/UserScript==

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

var skull = String.fromCharCode( 0x2620 );
var phils = foreach( '//*[contains(@id,"Phil")]', hide_node );
if( phils )
  GM_registerMenuCommand( phils = 'Restore '+ phils +' Dr. Phil reference'+
			  (phils==1?'':'s'), show_phils );
foreach( '//div[@class="ugh"]', function( div ){ div.title = phils; } );

function show_phils()
{
  foreach( '//*[contains(@id,"Phil")]', show_node );
  foreach( '//div[@class="ugh"]', hide_node );
}

function hide_node( node )
{
  if( node.id )
    add_skull( node );
  node.style.display = 'none';
  return 1;
}

function add_skull( node )
{
  var div = document.createElement( 'div' );
  div.innerHTML = skull;
  div.className = 'ugh';
  div.style.display = getComputedStyle( node, '' ).display;
  div.style.cursor = 'pointer';
  node.parentNode.insertBefore( div, node );
  EventMgr.add( div, 'click', show_phils, false );
}

function show_node( node )
{
  node.style.display = '';
}

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root )
{
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
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

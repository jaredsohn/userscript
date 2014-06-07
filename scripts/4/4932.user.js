// ==UserScript==
// @name           Lunarnunor zoom
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Hover faces at the Lunarstorm "nunor" page for full size version
// @include        http://www.lunarstorm.se/log/log_faces.aspx*
// ==/UserScript==

var td = $x( '/html/body/table/tbody/tr/td[2]' )[0];
var th = parseInt( getComputedStyle( $x('table',td)[0], '' ).height, 10 ) + 1;

function on_hover( e )
{
  var img = e.target;
  if( img.nodeType != 1 || !img.nodeName.match( /img/i ) ) return;
  var old = img.src, url = old.replace( 'medium', 'large' );
  if( old == url ) return;
  td.style.background = 'url("'+ url +'") no-repeat 50% '+ th +'px';
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, null, null ), result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
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

EventMgr.add( document, 'mouseover', on_hover, false );

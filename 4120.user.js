// ==UserScript==
// @name           Submit forms with Ctrl+Enter
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Submit the currently focused form by pressing ctrl+enter. Note that some broken sites don't use proper submit buttons for form submission, but rather links with chunks of javascript that does something and then submits the form, so you may encounter sites where this script does not manage to do what you want, on ctrl+enter.
// @include        *
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

function all( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function foreach( xpath, cb )
{
  var nodes = all( xpath ), i;
  for( i=0; i<nodes.length; i++ )
    cb( nodes[i], i );
}

function on_ctrl_enter( e )
{
  if( e.ctrlKey && e.keyCode == 13)
  {
    e.preventDefault();
    e.stopPropagation();
    var form = e.target.form;
    if( form && (!form.onsubmit || form.onsubmit.call( form ) !== false) )
    {
      if( location.hostname == 'www.lunarstorm.se' )
      {
	form.__EVENTARGUMENT.value = '';
	with( form.__EVENTTARGET )
	  switch( location.pathname.toLowerCase() )
	  {
	    case '/gst/gst_compose.aspx':
	    case '/gst/gst_guestbook.aspx':
	      value = 'sendGuestbook:_ctl7:btnSendNimo:btnSendNimo_a'; break;
	    case '/blg/blg_view.aspx':
	      value = '_ctl6:btnComment:btnComment_a'; break;
	  }
      }
      form.submit();
    }
  }
}

function install_keyhandler( node )
{
  EventMgr.add( node, 'keypress', on_ctrl_enter, true );
}

foreach( '//textarea | //input[@type="text"]', install_keyhandler );

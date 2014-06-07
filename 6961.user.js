// ==UserScript==
// @name	Lunarstorm canned guestbook replies
// @version	1.0: Initial version
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	Provide canned replies to canned guestbook queries comfily for Lunarstorm. Usage: Click the + buttom to name the present contents of the message box. Select a reply (by name) to replace the current contents of the message box from the canned reply. The - button purges a canned reply. (Canned replies are only available for the popup comment window.)
// @include	http://www.lunarstorm.se/gst/gst_compose.aspx?*
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
    obj.addEventListener(realType, fn, useCapture||false);
    this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
    return true;
  },
  cleanup:function() {
    if( !EventMgr._registry ) return;
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

var canned = eval( GM_getValue( 'canned', '([])' ) );
init_form();

function init_form( selected ) {
  var td = $X( '//td[@class="boxsep"]' ); if( !td ) return;
  var select = <select id="canned"/>, script;
  for( var i = 0; script = canned[i]; i++ )
    if( script.name == selected )
      select.option[i] = <option value={i} selected="">{script.name}</option>;
    else
      select.option[i] = <option value={i}>{script.name}</option>;
  select.option[i] = <option value="-1">-- Add canned reply --</option>;
  if( !selected )
    select.option[i].@selected = "";
  EventMgr.cleanup();
  td.innerHTML = '';
  append_to( <input type="button" id="delete" value={selected?"-":"+"}/>, td );
  append_to( select, td );
  EventMgr.add( $( 'delete' ), 'click', delete_canned_reply, false );
  EventMgr.add( $( 'canned' ), 'change', chose_canned_reply, false );

  if( typeof selected == 'undefined' )
    GM_addStyle( 'td.boxsep { text-align:center; padding-top:5px; }\n' +
		 '#delete { padding:0; width:auto; }\n' +
		 '#canned { margin-left:2px; }' );
}

function chose_canned_reply( e ) {
  var form = e.target.form;
  var script = form.elements.namedItem( 'canned' );
  var number = parseInt( script.value, 10 );
  $( 'delete' ).value = number == -1 ? '+' : '-';
  if( number == -1 ) { // add new
    return add_canned_reply( form );
  }
  var option = script.options[number];
  var message = form.elements.namedItem( 'sendGuestbook_txtMessage' );
  if( !message.value.replace( /\s/g, '' ).length ||
      message.value == canned[number].text ||
      confirm( 'Really discard this message?\n' + message.value ) )
    message.value = canned[number].text;
}

function delete_canned_reply( e ) {
  var form = e.target.form;
  if( e.target.value == "+" )
    return add_canned_reply( form );
  var script = form.elements.namedItem( 'canned' );
  var number = parseInt( script.value, 10 );
  if( !confirm( 'Really purge "'+ canned[number].name +'"?' ) ) return;
  canned.splice( number, 1 );
  save_replies();
  init_form( 0 );
}

function add_canned_reply( form ) {
  var scripts = {}, script, names = [], name, i;
  for( i=0; script = canned[i]; i++ ) {
    names.push( script.name );
    scripts[ script.name ] = script.text;
  }
  name = prompt( 'Name this reply (for your eyes only):', '' );
  if( !name ) return;
  scripts[name] = form.elements.namedItem( 'sendGuestbook_txtMessage' ).value;
  names.push( name );
  names.sort();
  for( i=0; script = names[i]; i++ )
    canned[i] = { name:script, text:scripts[script] };
  save_replies();
  init_form( name );
}

function save_replies() {
  GM_setValue( 'canned', canned.toSource() );
}

function trace() {
  unsafeWindow.console && unsafeWindow.console.trace();
}

function log() {
  unsafeWindow.console && unsafeWindow.console.log.apply( this, arguments );
}

function append_to( e4x, node, doc )
{
  return node.appendChild( import_node( e4x, doc || node.ownerDocument ) );
}

function import_node( e4x, doc )
{
  var me = import_node, xhtml, domTree, import_me;
  me.Const = me.Const || { mimeType: 'text/xml' };
  me.Static = me.Static || {};
  me.Static.parser = me.Static.parser || new DOMParser;
  xhtml = <testing xmlns="http://www.w3.org/1999/xhtml" />;
  xhtml.test = e4x;
  domTree = me.Static.parser.parseFromString( xhtml.toXMLString(),
           me.Const.mimeType );
  import_me = domTree.documentElement.firstChild;
  while( import_me && import_me.nodeType != 1 )
    import_me = import_me.nextSibling;
  if( !doc ) doc = document;
  return import_me ? doc.importNode( import_me, true ) : null;
}

function $( id ) {
  return document.getElementById( id );
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  try {
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
  } catch( e ) {
    trace();
    log( e );
  }
}

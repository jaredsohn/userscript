// ==UserScript==
// @name           Lunarstorm UI compactor
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Tweaks the Lunarstorm frame layout to remove Lajv and the huge banner part. The ad space is used for quick bookmarks; remove one by Ctrl-clicking the bookmark, add a new bookmark by Ctrl-clicking some link that points to where you want your bookmark on the site. Also, annoying javascript: links trying to prevent you from opening them in different tabs/windows are converted back to proper links.
// @include        http://www.lunarstorm.se/*
// ==/UserScript==

var links = { Skriv:'/blg/blg_compose.aspx',
	Kommentarer:'/blg/blg_comments.aspx',
	'L\344sare':'/blg/blg_log.aspx' };

var icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACNSURBVHjajFLBEYAgDIM+dUBXwB386Q4ygg7ou3occr1A0L6ANklp41XVYYzbuedjMM/xWqYZaz0SZHBwJB4STwkAXCm+eUuCBNprtxXSALse2NalDob10L//BZGUEyz6A7b3MoMWOwP3tqCsIybiW0Yi4LJiKyKoYFxI/fHlxF5LlT+ETD8ikJnrFmAAa9NpZPXw/mMAAAAASUVORK5CYII='

var menu_background = 'url("data:image/gif;base64,R0lGODlhAQAqANUAALUOCMU1IbcUDL4kFsc7JRF2msAqGiugvjevyCaXt8xGLCOTs85LMCibuhuHqBmDpSozOdNWN7wfE8xcWroaDzCoxfXTyA5ylxR6nrMJBC2kwR6LrBZ+oTKsyNhhPgxukyCPr8MwHjWwzMpAKNVcO+echCqEl9FRM1+etji0zwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACoAAAYnQEvJQ4qcGIoRIRAyDCQUASAzgZgQKVGnojk0EgvQxvHgYAqXDyoIADs=") repeat-x scroll 0 1px';

function hotlink( a )
{
  var href = a.href.match( /=(['"])(.*?)\1/ ); // "']) );
  if( href )
    a.href = href[2];
}

function init()
{
  foreach( '//a[starts-with(translate(@href,"JAVSCRIPT","javscript"),' +
			   '"javascript:location.href=")]', hotlink );
  switch( location.pathname.toLowerCase() )
  {
    // ?cluster=291&hasflash=true&logincount=2813&asrnd=10&passworderror=false
    case '/index_inside.aspx':
      //GM_log( 'frameset' );
      var framesets = document.getElementsByTagName( 'frameset' );
      framesets[0].setAttribute( 'rows', '23,*' ); // was 95,* for huge banners
      framesets[2].setAttribute( 'rows', '42,*' ); // was 61,* to fit lajv text
      break;

    case '/top/top_inside.aspx': // framesets[0]
      //GM_log( 'inside' );
      GM_addStyle( '.mlink { margin:0 1px 0 2px; }' );
      var head = document.body.style;
      head.marginTop = '-66px'; // screw the top portion of the logo / banner
      return add_links();

    case '/top/top_menu_inside.aspx': // framesets[2]
      var menu = document.body.style;
      menu.marginLeft = '-32px'; // but we don't want the lajv faces, either
      menu.background = menu_background; // and pad out for the right margin
      menu.borderTop = '1px solid #000';
      break;

    default:
      //GM_log( location.pathname );
      EventMgr.add( document.body, 'click', bookmark_handler, true );
  }
}

function bookmark_handler( e )
{
  var a = e.target;
  if( a.nodeName.match( /^img$/i ) )
    a = a.parentNode;
  if( a.nodeName.match( /^a$/i ) )
  {
    if( e.ctrlKey )
    {
      e.preventDefault();
      e.stopPropagation();
      sync_links();

      if( location.pathname.toLowerCase() == '/top/top_inside.aspx' )
      {
	var name = a.innerHTML;
	delete links[name];
	GM_setValue( 'links', links.toSource() );
	if( a.previousSibling.nodeValue == ' \xB7 ' )
	  a.parentNode.removeChild( a.previousSibling );
	a.parentNode.removeChild( a );
      }
      else if( (name = prompt( 'Please name this shortcut:\n'+ a.href, '' )) )
      {
	var url = a.href;
	if( location.hostname == a.hostname )
	  url = url.replace( /^[^:]*:..[^/]*/, '' );
	for( var old in links )
	  if( links[old] == url )
	    delete links[old]; // remove any bookmarks duplicates

	links[name] = url;
	GM_setValue( 'links', links.toSource() );
	var td = $x( '(//td)[last()]', top[0].lunar_menu.document.body )[0];
	add_link( td, name, url );
      }
    }
  }
}

function sync_links() // sync links and GM_getValue( 'links' ), both ways
{
  try{
  var stored = GM_getValue( 'links', '' );
  if( stored )
    links = eval( stored );
  else
  {
    //GM_log( links.toSource() );
    GM_setValue( 'links', links.toSource() );
  }
  return links;
  }catch(e){GM_log( e );}
}

function add_link( td, name, href, n )
{
  try{
  var doc = td.ownerDocument;
  var a = doc.createElement('a');
  a.href = href;
  a.className = 'mlink';
  a.style.color = '#0A83A8';
  a.target = 'lunar_main';
  a.innerHTML = name;
  if( n )
    td.appendChild( doc.createTextNode(' \xB7 ') );
  td.appendChild( a );
  }catch(e){GM_log( e );}
}

function style( node, css )
{
  for( var name in css )
    node.style.setProperty( name, css[name], '' );
}

function add_links() //top/top_inside.aspx:
{
  try{
  var td = document.createElement( 'div' );
  style( td, { top:0, left:'216px', right:0, height:'23px',
	       position:'absolute', color:'#00537E', } );
  td.innerHTML = '<form name="quickfind" method="get" action="/src/src_quicksearch.aspx" target="lunar_main" style="display:inline;" onSubmit="document.quickfind.user.blur();document.quickfind.sent.value=\'1\';"><input type="text" name="user" style="color:#2C5362;background:#71ADC3;border:1px solid #000;padding:1px;width:92px;margin:0 4px -1px 0;" value="S\366k..." onFocus="if(this.form.sent.value == \'1\'){this.form.sent.value=\'0\'; this.value=\'\'}; if(this.value == \'S\366k...\')this.value=\'\';" onBlur="if(this.value == \'\')this.value=\'S\366k...\';" class="quickfind"><input type="hidden" name="sent" value="0"></form><a style="font-size:180%;" title="Ladda om ikonf\344ltet" href="javascript:location.reload()"><img style="margin:0 0 -2px -1px;" src="'+ icon +'" border="0" /></a> ';
  document.body.appendChild( td );
  EventMgr.add( td, 'click', bookmark_handler, true );

  links = sync_links();
  var n = 0;
  for( var name in links )
    add_link( td, name, links[name], n++ );
  }catch(e){GM_log( e );}
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function foreach( xpath, cb )
{
  var nodes = $x( xpath ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
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

init();

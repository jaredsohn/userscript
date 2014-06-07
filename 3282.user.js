// ==UserScript==
// @name            Spray Date semi deluxe; less cruft, more features.
// @version         1.9: Lowered CPU load noticably in combination with AdBlock.
// @version         1.8: Hover guestbook posts for image blowups and quick-access presentation / guestbook links.
// @version         1.7: Facial images in searches now larger and on the right.
// @namespace       http://www.lysator.liu.se/~jhs/userscript
// @description     Multi-purpose UI overhaul script to make Spray Date more user friendly and less full of cruft. * Drops lots of marketing junk, Deluxe teasers, irrelevant off-site links and static page headers/footer cruft. * Reorganizes views for readability, reformatting user links with fix-width columns first (sex, age) followed by name (bold, when the user has an image, unwound so >9 letter names are always shown in full) and optional deluxe stars and hearts. * Adds zoomable user images and hover images. * Gives tabs keyboard shortcuts, Alt+M for messages and Alt+1..N for your most recent visitors. * Adds a Visitors tab to other people. * Makes the visitors table dates ISO formatted. * Makes the visitors table sortable by clicking column headers. * Replaces the animated user banner with a zoomed-up version of the profile user image, when available. Otherwise just removed the banner. * Adds a client side "favourites" list to which you can add people by Alt-clicking their names in visitor lists et c. (This presently does not fetch their online status, except when you encounter their names somewhere by chance.)
// @include         http://spraydate.spray.se/spraydate/*
// ==/UserScript==

// Reinstate these to clean out your guestbook on view. VERY destructive.
// var deletep = $x( '//a[text()="Ta bort"]' );
// if( deletep.length )
// {
//   var n = Math.floor( Math.random()*deletep.length );
//   return location.href = deletep[n].href;
// }

var unknown_after_ms = 60*60*1e3; // after 1h, online colours go black

if( location.pathname.match( /login_interstitial/i ) )
  return location.pathname = unescape( location.search.exec( /target=([^&]+)/ )[1] );

// avoid ~177 setTimeout calls per second if AdBlock is running:
try { unsafeWindow.skyscraper_obj.floating = function() {}; } catch(e) {}

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

function init() {
  var me = document.forms.namedItem('changelist'), s; // 1: deluxe
  me = me ? me.elements.namedItem('id').value : '';
  var path = location.pathname;
  var profile_url = '"/spraydate/personal/personal.jsp?id="';
  var register_url = '"/spraydate/registration/vip_registration.jsp"';
  $x( 'id("site")/div[@class="header"]' )[0].style.display = 'none';
  foreach( '//*[@id="search_tabs"]', add_visitor_link );
  foreach( '//*[@id="banner_wrapper"]', function(x){ x.style.visibility = 'hidden'; } );
  s = foreach( '//a[starts-with(@href,'+ profile_url +')][text()]', fix_name );
  foreach( '//*[contains(text(),"...")][ancestor-or-self::*[@title]]',
  	   show_full_name );
  if( !s )
    foreach( '//img[starts-with(@id,"b:")]', make_zoomable );
  foreach( '//tr/td[4][contains(text(),":") and contains(text(),"/")]', time );
  foreach( '//td[@class="bold"][not(a)]', sort_by_column );
  foreach( '//div[@class="box"][.//a[@target]]', remove_node );
  foreach( '//div[@class="boxcontent"][a[@target]]', remove_node );
  foreach( '//i[text()="Spray Date \226 h\344r finns singlarna"]|//a[@href='+
 	   register_url +' or contains(@onclick,"DeluxeTeaser")]|'+
 	   '//h3[text()="Spray Date tipsar"]|*[@id="globalfooter"]/p|'+
 	   '//*[@id="globaltopcurve" or @id="globalheader" or '+
 	   '@id="globalwidebanner" or @id="bannerbottomcurve" or '+
 	   '@id="skyscraper" or @id="globalcopyright"]', remove_junk_link );
  foreach( '//div[@class="imageholder"][div[@class="unapproved_medium"]]',
 	   approve_guestbook_pictures );
  foreach( '//div[@class="unapproved_medium"]', approve_profile_picture );
  foreach( '//a[text()="\253"]', function(a) { a.accessKey = '<'; } );
  foreach( '//a[text()="\273"]', function(a) { a.accessKey = 'Z'; } );
  foreach( '//a[@href="/spraydate/personal/inbox.jsp"][1]',
 	   function( a ) { a.accessKey = 'M'; } );
  foreach( '//ul[@class="users"]/li/a[starts-with(@href,'+ profile_url +')]',
 	   add_numeric_visitor_access_key );
  setTimeout( process( '//*[@id="search_tabs"]/div/a', add_access_key ), 1000 );
  var noerror = document.createElement( 'div' );
  noerror.id = 'skyscraper';
  document.body.appendChild( noerror );
  if( !s )
  {
    redraw_favourites();
    setTimeout( function()
		{
		  unsafeWindow.USERLINK_IMAGE_ALLOWED = true;
		  try{ unsafeWindow.init(); }catch(e){}
		}, 200 );
  }
  switch( path )
  {
  case '/spraydate/search/search_result.jsp': return alter_search();
  case '/spraydate/search/search_advance.jsp': return search_many();
  case '/spraydate/personal/settings.jsp':
    var stad = $X( 'id("colorbox19")//div[@class="content"]//' +
		   'b[(preceding-sibling::text())[last()]' +
		   '[contains(.,"Stad")]]' );
    if( stad ) {
      var a = document.createElement( 'a' );
      a.href = '/spraydate/personal/about_me.jsp';
      stad.parentNode.replaceChild( a, stad );
      a.appendChild( stad );
    }
    return;
  case '/spraydate/personal/guestbook.jsp':
    foreach( '//div[@class="columns2l"]', link_gb_message ); // fall-through:
  default:
    if( path.match( /^\/spraydate\/personal\// ) )
      if( location.search && location.search != '?id='+me )
	replace_photo_ad_with_large_face();
  }
}

function link_gb_message( div ) {
  var events = gb_message_events( div );
  EventMgr.add( div, 'click', events.click, false );
  EventMgr.add( div, 'mouseover', events.mouseover, false );
}

function gb_message_events( div ) {
  function whichside( e ) {
    if( e.target == div )
      return e.layerX > 166 ? 1 : 0;
    return $x( 'ancestor::div[parent::div[@class="columns2l"]]/'+
	       'preceding-sibling::div', e.target ).length; // 0 or 1
  }
  var a = $X( 'div[1]//a[contains(@href,"/personal.jsp") and @title]', div );
  var pres = a.href, gb = pres.replace( '/personal.jsp', '/guestbook.jsp' );
  var img = $( 'zoomed' ), name = a.title;
  if( !img ) {
    GM_addStyle( 'div.columns2l:hover { cursor:pointer;cursor:hand; }' );
    img = document.createElement( 'img' );
    img.id = 'zoomed';
    document.body.appendChild( img );
    img.style.position = 'absolute';
    img.style.left = '0';
  }
  return { mouseover: function( e ) {
      img.setAttribute( 'width', div.offsetLeft - 11 );
      img.style.top = (div.offsetTop - 10) +'px';
      img.src = '/spraydate/userimages/_'+ name.charAt() +'/'+ name +'.jpg';
      if( e.target.nodeName.match(/^(a|img)$/i) ) return;
      unsafeWindow.status = [pres, gb][whichside( e )];
    }, click: function( e ) {
      if( e.target.nodeName.match(/^(a|img)$/i) ) return;
      location.href = [pres, gb][whichside( e )];
    }
  };
}

function process( xpath, callback )
{
  return function(){ return foreach( xpath, callback ); };
}

function approve_guestbook_pictures( node, n )
{
  var id = value( '../a[1]/@title', node ), i = 100+n;
  var url = '/spraydate/userthumbnails_small/_'+ id.charAt(0) +'/'+ id +'.gif';
  var full = url.replace(/thumbnails_small/, 'images').replace(/gif$/, 'jpg');
  setContent( <div style="width:50px; height:58px;" class="zoomImage">
    <div class="ziFull">
      <img id={'a:'+i} src={full}/>
    </div>
    <a href={'/spraydate/personal/personal.jsp?id='+id}>
      <img id={'b:'+i} alt={id} src={url}/>
    </a>
    <div style="display:inline;" id={'link:'+i} class="ziMagSmall">
      <a href="#" id={'click:'+i}>
        <img alt="F&#346;rstora bild" height="14" width="14"
  	   src="/spraydate/inc/images/magnify_small.gif"/>
      </a>
    </div>
  </div>, node );
  click_to_open( i );
}

function wrap( name, param, stop )
{
  return function( e )
  {
    if( stop ){ e.preventDefault(); e.stopPropagation(); }
    unsafeWindow[name]( param );
  };
}

function IMG(){ return 'IMG' }; // since somehow our e4x nodes are lowercased
unsafeWindow.Image.prototype.__defineGetter__( 'tagName', IMG );

function click_to_open( n )
{
  try{
  var i = $( 'b:'+n ), f = $( 'a:'+n ), a = $( 'click:'+n );
  EventMgr.add( i, 'load', wrap( 'ziTn', i ), false );
  EventMgr.add( f, 'load', wrap( 'ziFull', f ), false );
  EventMgr.add( a, 'click', wrap( 'ziImageMagnify', n, true ), true );
  EventMgr.add( f.parentNode, 'click', wrap( 'ziImageClose', n ), false );
  }catch(e){alert(e);}
}

function approve_profile_picture( node )
{
  var id = location.search.match( /id=([^&]+)/i )[1];
  var url = '/spraydate/userthumbnails/_'+ id.charAt(0) +'/'+ id +'.gif';
  var full = url.replace( /thumbnails/, 'images' ).replace(/gif$/, 'jpg');
  setContent( <img id="a:1" src={full}/>, $('a:1').parentNode );
  setContent( <div style="width:100px; height:108px;" class="zoomImage">
    <span><img id="b:1" alt={id} src={url}/></span>
    <div style="display:inline;" id="link:1" class="ziMag">
      <a href="#" id={'click:'+1}>
	<img alt="F&#246;rstora bild" height="18" width="18"
	     src="/spraydate/inc/images/magnify.gif"/>
      </a>
    </div>
  </div>, node );
  node.setAttribute( 'style', 'overflow:hidden; height:110px; width:102px; ' +
		     'float:left; padding-right:6px;' );
  node.className = '';
  click_to_open( 1 );
}

function add_visitor_link( div )
{
  with( location ) if( search.length )
  {
    var url = 'visitors_other.jsp'+ search, at = href.indexOf( url ) > -1;
    appendTo( <div class={at ? 'active' : ''}>
	      <a accesskey="B" href={url}><u>B</u>es&#246;kare</a></div>,
	      div );
  }
}

function add_numeric_visitor_access_key( a, n )
{
  if( ++n <= 9 ) a.accessKey = n;
}

function add_access_key( a )
{
  var rename = { '\326versikt' : 'Presentation' };
  var title = rename[a.textContent] || a.textContent, i, k;
  if( title == 'Statistik' && location.href.match( 'visitors_other.jsp' ) )
    a.parentNode.className = '';
  for( i=0; i<title.length; i++ )
  {
    k = title.charAt( i ).toUpperCase();
    a.setAttribute( 'accesskey', k );
    a.innerHTML = title.replace( new RegExp( '(.*?)('+ k +')(.*)', 'i' ),
				 '$1<u>$2</u>$3' );
    break;
  }
}

function replace_banner( x )
{
  x.style.visibility = 'hidden';
  var img = $('b:1'); if( !img ) return;
  var url = img.src.replace( /thumbnails(.*)gif/, 'images$1jpg' );
  img = document.createElement( 'img' );
  EventMgr.add( img, 'load',
		(function(x){return function(){show_face(x);};})(img), false );
  img.src = url;
}

function show_face( image )
{
  var me = $('large_face');
  var sw = image.width, sh = image.height;
  var ca = document.createElement( 'canvas' );
  var dw = ca.width = 158, dh = ca.height = 188;
  me.parentNode.replaceChild( ca, me );
  var ctx = ca.getContext( '2d' );
  var tow = dw, toh = dw * sh / sw;
  var tox = 0,  toy = (dh - toh)/2;
  if( toh > dh )
  {
    toh = dh;
    tow = dh * sw / sh;
    tox = (dw - tow)/2;
    toy = 0;
  }
  //prompt( sw+'x'+sh, tow+'x'+toh );
  ctx.drawImage( image, tox, toy, tow, toh );
}

function remove_node( node ) {
  node.parentNode.removeChild( node );
}

function remove_junk_link( a )
{
  var p = a.parentNode, c;
  p.removeChild( a );
  while( c = p.firstChild )
    if( c.nodeType == 3 && c.nodeValue.match( /^\s*$/ ) )
      p.removeChild( c );
    else
      break;
  if( !p.firstChild )
    remove_junk_link( p );
}

function show_full_name( node )
{
  if( node.parentNode.nodeName != 'LI' )
    node.innerHTML = node.title || node.parentNode.title;
}

function time( t )
{
  var x = t.textContent.split( /\D/ ), d = new Date;
  d.setDate( parseInt( x[0], 10 ) );
  d.setMonth( parseInt( x[1], 10 )-1 );
  d.setFullYear( parseInt( x[2], 10 )+2000 );
  d.setHours( parseInt( x[3], 10 ) );
  d.setMinutes( parseInt( x[4], 10 ) );
  t.setAttribute( 'key', d.getTime() );
  t.innerHTML = d.getFullYear()+'-'+x[1]+'-'+x[0]+' '+x[3]+':'+x[4];
}

function sort_by_column( th )
{
  var by = th.textContent, tr = th.parentNode, tb = tr.parentNode, span;
  th.style.cursor = 'pointer';
  EventMgr.add( th, 'click', function( e )
  {
    var c, i, ths = tr.getElementsByTagName( 'td' ), order, rows, table;
    for( i=0; i<ths.length; i++ )
      if( ths[i] == th )
	c = i;
    order = th.getAttribute( 'order' ) == 'desc' ? 'asc' : 'desc';
    th.setAttribute( 'order', order );
    span = document.createElement( 'span' );
    span.style.fontWeight = 'bold';
    span.innerHTML = order == 'desc' ? '&darr;' : '&uarr;';// '&#8679;' : '&#8681;';
    if( th.lastChild.nodeName == 'SPAN' ) th.removeChild( th.lastChild );
    th.appendChild( span );
    rows = tb.getElementsByTagName( 'tr' );
    table = Array.prototype.slice.call( rows, 2 ).sort( function( a, b )
    {
      var A = a.getElementsByTagName( 'td' );
      var B = b.getElementsByTagName( 'td' );
      a = A[c].innerHTML.toLowerCase();
      b = B[c].innerHTML.toLowerCase();
      return a > b ? -1 : a == b ? 0 : 1;
    } );
    if( order == 'desc' ) table = table.reverse();
    for( i=2; i<rows.length; i++ ) tb.removeChild( rows[i] );
    for( i=0; i<table.length; i++ ) tb.appendChild( table[i] );
  }, false );
}

// reorganize sex, age, name and deluxestar to that order
function fix_name( a, N )
{
  try{
  var p = a.parentNode, i, n, name = a, x = document.createRange(), h, s;
  if( name.getAttribute( 'xuserimg' ) == 1 )
    name.style.fontWeight = 'bold';
  x.selectNode( name );
  s = a.previousSibling;
  if( s && s.nodeType == 1 ) a = a.previousSibling;
  for( i=0; a && i<8; i++ )
  {
    if( a.nodeName == 'IMG' )
    {
      if( a.getAttribute( 'gender' ) )
      {
	a.style.paddingRight = '3px';
	p.removeChild( a );
	p.insertBefore( a, name );
	x.setStartBefore( a );
      }
      else if( a.getAttribute( 'match' ) )
	x.setEndAfter( a );
      else if( a.src.match( '/spraydate/inc/images/starsAnimated.gif$' ) )
      {
	a.style.paddingLeft = '3px';
	a.src += '#'; // don't move it twice
	p.removeChild( a );
	p.insertBefore( a, name.nextSibling );
	x.setEndAfter( a );
	continue;
      }
    }
    else if( a.nodeType == 3 && (n = parseInt(a.nodeValue)) )
    {
      p.removeChild( a );
      p.insertBefore( document.createTextNode( n+' ' ), name );
    }
    a = a.nextSibling;
  }
  EventMgr.add( name, 'click', (function( n, x )
  {
    var h = document.createElement( 'div' );
    h.appendChild( x.cloneContents() );
    h = h.innerHTML;
    update_favourites( n, h, 'update' );
    return function( e )
    {
      if( e.altKey )
      {
	e.preventDefault();
	e.stopPropagation();
	update_favourites( n, h, 'add' );
      }
    };
  })( name.title, x ), false );
  }catch(e){ /*prompt(e,name);*/ return 1; }
}

function get_favourites( name )
{
  var names = GM_getValue( '[favourites]', '' ), i, x;
  if( names )
  {
    x = names.split(',');
    names = {};
    for( i=0; i<x.length; i++ )
      names[x[i]] = GM_getValue( x[i], '' );
  }
  names = names || {};
  return name ? names[name] : names;
}

function update_favourites( name, html, action )
{
  var changed = false, fav = get_favourites(), i, names = [];
  if( action == 'add' ||
     (action == 'update' && fav[ name ]) )
  {
    GM_setValue( name, fav[name] = (new Date).getTime()+':'+html );
    changed = true;
    if( action == 'add' )
    {
      for( i in fav )
	names.push( i );
      GM_setValue( '[favourites]', names.join(',') );
    }
  }
  if( changed )
    redraw_favourites();
}

function redraw_favourites()
{
  foreach( '//div[@class="boxcontent"][preceding::div[text()="Favoriter"]]',
	   render_favourites );
}

function render_favourites( node )
{
  var all = get_favourites(), i, t, data, html = '', T = (new Date).getTime();
  //var names = GM_getValue( '[favourites]', '' ).split(',');
  for( i in all )
  {
    if( data = /^(\d+):(.*)$/.exec( all[i] ) )
    {
      t = T - data[1];
      data = data[2];
    }
    else
    {
      t = Infinity;
      data = all[i];
    }
    if( t > unknown_after_ms )
      data = data.replace( / class=["']?o(n|ff)line['"]?/gi, '' );
    html += data + '<br />';
  }
  node.innerHTML = html || 'Inga favoriter angivna';
}

function make_zoomable( img )
{
  var a = $( 'a'+ img.id.substr(1) );
  a.parentNode.innerHTML = '<img id='+ a.id +' onload=ziFull(this) src='+
    (img.src.replace( /thumbnails(_small)?(.*)gif/, 'images$2jpg') ) +' />';
}

function $( id ){ return document.getElementById( id ); }

function foreach( xpath, cb )
{
  var nodes = $x( xpath ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

function replace_photo_ad_with_large_face()
{
  var img, url;
  var node = get( '//div[@id="banner_wrapper"]/ancestor::div[4]' );
  erase( node );
  var root = '/html/body/div[1]/div[1]/div[6]/div[2]/div[2]/div[1]';
  //erase( root+'/div[2]/div[1]' );
  var img = get( '//img[@id="b:1"]' ), url, css;
  if( img )
  {
    if( $('large_face') ) replace_banner( $('large_face') );
    // url = img.src.replace( /thumbnails(.*)gif/, 'images$1jpg' );
    // css = 'background:url('+url+') no-repeat 50% 50%;height:200px;';
    // style( root+'/div[2]', css );
  }
  else
  {
    style( root + '/div[1]', 'width:auto;' );
    style( root + '//span[@class="topmiddle"]', 'width:446px;' );
    style( root + '//span[@class="bottommiddle"]', 'width:446px;' );
  }
}

function search_many()
{
  var howmany = $( 'PageSelectBox' ), input;
  if( howmany )
  {
    input = document.createElement( 'input' );
    input.value = howmany.value;
    input.name = howmany.name;
    input.type = 'text';
    input.size = 4;
    howmany.parentNode.replaceChild( input, howmany );
  }
}

function alter_search()
{
  search_many();
  var base = 'http://spraydate.spray.se/spraydate/', name, div, img;
  var people = $x( '//div[@class="result-name"]/a[1]' ), a, i;
  for( i=people.length-1; i>=0; i-- )
  {
    a = people[i];
    name = a.innerHTML;
    var parent = a.parentNode.parentNode.lastChild.previousSibling;
    var url = a.href;
    a = document.createElement( 'a' );
    a.href = url;
    img = document.createElement( 'img' );
    img.src = base +'userimages/_'+ name[0] +'/'+ name +'.jpg';
    img.setAttribute( 'style', 'max-height:250px;max-width:250px;display:block; clear:left;margin-bottom:11px;' );
    a.setAttribute( 'style', 'max-height:250px;max-width:250px;display:block; clear:left;' );
    a.appendChild( img );
    parent.appendChild( a );
    a.parentNode.style.height = 'auto';
    a.parentNode.style.width = '250px';
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

function get( xpath, root )
{
  if( typeof xpath != 'string' ) return xpath;
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var type = XPathResult.FIRST_ORDERED_NODE_TYPE, n = null;
  return document.evaluate( xpath, root||doc, n, type, n ).singleNodeValue;
}

function erase( node )
{
  if( !(node = get( node )) ) return ( 'no erase' );
  var h = node.offsetHeight;
  var w = node.offsetWidth;
  var div = node.ownerDocument.createElement( 'div' );
  div.setAttribute( 'style', 'height:'+ h +';width:'+ w +';' );
  node.parentNode.insertBefore( div, node );
  node.style.display = 'none';
  div.id = 'large_face';
  return div;
}

function style( node, style )
{
  if( !(node = get( node )) ) return ('no styling');
  node.setAttribute( 'style', style );
}

function value( xpath, root )
{
  var me = get( xpath, root );
  return me && me.nodeValue;
}

function setContent( e4x, node )
{
  while( node.firstChild )
    node.removeChild( node.firstChild );
  appendTo( e4x, node );
}

function appendTo( e4x, node, doc )
{
  return node.appendChild( importNode( e4x, doc || node.ownerDocument ) );
}

function importNode( e4x, doc )
{
  var me = importNode, xhtml, domTree, importMe;
  me.Const = me.Const || { mimeType: 'text/xml' };
  me.Static = me.Static || {};
  me.Static.parser = me.Static.parser || new DOMParser;
  xhtml = <testing xmlns="http://www.w3.org/1999/xhtml" />;
  xhtml.test = e4x;
  xhtml = xhtml.toXMLString().replace( /\n\s*/g, '' );
  domTree = me.Static.parser.parseFromString( xhtml, me.Const.mimeType );
  importMe = domTree.documentElement.firstChild;
  while( importMe && importMe.nodeType != 1 )
    importMe = importMe.nextSibling;
  if( !doc ) doc = document;
  return importMe ? doc.importNode( importMe, true ) : null;
}

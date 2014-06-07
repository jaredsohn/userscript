// ==UserScript==
// @name           Lunarstorm Blog touch-ups
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds hover hilighting of blog entries in the calendar panel, drops the McD footer, changes links to blogs to point to the blog list overview (and call it diary) as it was in old times, makes the blog log embolden visitors to the post whose visitors you tried to peek at, and expands entry titles in lists to their full, non-abbreviated length. Shift-click the Diary link to start writing a new entry, alt-click it to see recent visitors, alt+shift-click it to see recent comments, and shift-click an entry title (in your blog list overview) to edit its post contents. The visitors view also gets ads replaced with a view filter widget, and the whole visitor log is loaded into the same page.
// @include        http://www.lunarstorm.se/*
// ==/UserScript==

if( !is_normal_pageview() ) return;

var debug = 0 ? function( e ){ alert( e ); } : function(){};

var visitor_xpath = '//tr[starts-with(@class,"mlist")]' +
  '/td/a[contains(@href,"/usr/usr_presentation.aspx?")]';

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

// /blg/blg_view.aspx?UserID={id} to /blg/blg_viewList.aspx?userID={id}
function link_to_blog_view( a )
{
  a.pathname = a.pathname.replace( /\/blg\/blg_view\./, '/blg/blg_viewList.' );
  a.innerHTML = a.innerHTML.replace( /Blogg?/i, 'Dagbok' );
  EventMgr.add( a, 'click', diary_click, true );
}

function diary_click( e )
{
  var type = !!e.altKey * 2 + !!e.shiftKey;
  if( type )
  {
    e.preventDefault();
    e.stopPropagation();
    location.href = '/blg/blg_'+(['compose','log','comments'][--type])+'.aspx';
  }
}

function $( id ){ return document.getElementById( id ); }

function get( xpath, root )
{
  if( typeof xpath != 'string' ) return xpath;
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var type = XPathResult.FIRST_ORDERED_NODE_TYPE, n = null;
  return document.evaluate( xpath, root||doc, n, type, n ).singleNodeValue;
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

function remove( xpath )
{
  foreach( xpath, function( node ){ node.parentNode.removeChild( node ); } );
}

function parse_lunar_date( date )
{
  //alert( 'parse_lunar_date ' + date );
  var months = 'jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec'.split( ',' );
  var month = {}, y, m, d, H, M, i;
  for( i=0; i<months.length; i++ )
    month[months[i]] = i;
  if( i = /^\s*\S+\s+(\d+)\s+(\S\S\S)\s+(\d+)?\s*(\d\d):(\d\d)/.exec( date ) )
  {
    if( i[3] )
    {
      y = parseInt( i[3], 10 );
      if( y < 100 ) y += 2000;
    }
    else
      y = (new Date).getFullYear();
    m = month[i[2].toLowerCase()];
    d = i[1];
    H = i[4];
    M = i[5];
    //alert( '> ' + y + '-' +(m+1)+ '-' +d+ ' ' +H+':'+M );
    return new Date( y, m, d, H, M );
  }
  if( i = /^i(dag|g\345r|g&aring;r)\s+(\d\d):(\d\d)/i.exec( date ) )
  {
    var date = new Date();
    if( i[1] != 'dag' )
      date = new Date( date.getTime() - 864e5 );
    date.setHours( i[2] );
    date.setMinutes( i[3] );
    date.setSeconds( 0 );
    date.setMilliseconds( 0 );
    return date;
  }
}

function change_bg_cb( re, color, year, month, tr )
{
  return function( e )
  {
    if( tr ) unsafeWindow.hovering = tr;
    var urls = Array.prototype.slice.call( document.links ).filter( re ), a;
    if( urls.length )
      while( a = urls.shift() )
	a.parentNode.style.backgroundColor = color;
    else if( color && month && year >= 2000 )
      with(unsafeWindow)
      {
	currentYear = year;
	currentMonth = month;
	doCalenderRemoteCall();
	//setTimeout( change_bg_cb( re, color, year, month ), 0 );
      }
  };
}

var entry_dates = {}; // YYYY-M-D to matching (left) list tr node

function change_li_bg_cb( td, hoverp )
{
  return function()
  {
    var a = td.getElementsByTagName( 'a' ).item( 0 ), tr, date;
    if( !a ||
	!(date = a.search.match( /publishdate=([\d-]+)/i )) ||
	!(tr = entry_dates[date[1]]) )
      return;
    var synthetic_event = document.createEvent( 'MouseEvents' );
    synthetic_event.initEvent( hoverp ? 'mouseover' : 'mouseout', true, true );
    tr.dispatchEvent( synthetic_event );
  };
}

function shift_click_to_edit( e )
{
  var edit = '/blg/blg_compose.aspx';
  var a = e.target;
  if( e.shiftKey )
  {
    e.preventDefault();
    e.stopPropagation();
    location.href = edit + a.search.replace( /&UserID=.*/i, '' );
  }
}

// postlist: /blg/blg_view.aspx?postID={pid}&UserID={uid}
// calendar: /blg/blg_view.aspx?userID={uid}&publishDate=2006-3-14
function show_hover_colors()
{
  try {
  var url = 'td/a[contains(@href,"blg_view.aspx")]'; // post url xpath
  var rdc = 'td/a[contains(@id,"_hrfReadCount")]'; // post read count xpath
  var pat = 'td[contains(@id,"_d")]/text()'; // date node xpath pattern
  var lxp = '//tr[@onmouseover]['+ url +']'; // list item xpath pattern
  var cre = 'blg_view.aspx\\?userID=[^&]+&publishDate=';
  var trs = $x( lxp ), tr, td, re, a, r, t, y, m, d, x, y, i;
  var mep = !get( '//img[contains(@src,"_gfx/blg_nav_myblog.gif")]' );
  for( ; tr = trs.shift(); )
  {
    if( !(a = get( url, tr )) ||
        !(t = get( pat, tr )) ||
	!(d = parse_lunar_date( t.nodeValue )) )
      continue;
    a.innerHTML = a.title;
    a.title = '';
    if( (r = get( rdc, tr )) )
      r.href = '/blg/blg_log.aspx'+ a.search;
    d = [ y = d.getFullYear(), m = d.getMonth()+1, d.getDate()].join( '-' );
    entry_dates[d] = tr;
    re = new RegExp( cre + d + '$', 'i' );
    EventMgr.add( tr, 'mouseover', change_bg_cb(re,'#FFD6BD',y,m,tr), false );
    EventMgr.add( tr, 'mouseout',  change_bg_cb(re,''), false );
    if( !mep ) continue; // can't edit other people's posts
    EventMgr.add( a, 'click', shift_click_to_edit, false );
  }
  for( x=1; x<=7; x++ )
    for( y=1; y<=6; y++ )
    {
      td = $( 'd'+ x +'_'+ y );
      EventMgr.add( td, 'mouseover', change_li_bg_cb( td, 1 ), false );
      EventMgr.add( td, 'mouseout',  change_li_bg_cb( td, 0 ), false );
    }
  }catch(e){alert(e)};
}

function fix_post_title( td )
{
  td.innerHTML = td.title;
  td.style.whiteSpace = 'pre';
  td.style.paddingRight = '5px';
  var postid = location.search.match( /PostID={?([^&}]+)}?/i );
  var click = td.getAttribute( 'onclick' );
  if( postid && click && click.match( new RegExp('postid='+postid[1], 'i') ) )
    td.style.fontWeight = 'bold';
}

function fix_blog_log_links( a )
{
  foreach( '//a[starts-with(@href,"blg_log.aspx")]', function( a ) {
    a.search += location.search.replace( '?', '&' ).replace( /&page=\d+/, '' );
  });
}

function set_page_title()
{
  var date = $x( '//td[@class="mainraw"]//div[@class="mtext"]' )[0];
  var title = $x( '//td[@class="mainraw"]//div[@class="hds"]' )[0];
  date = parse_lunar_date( date.textContent );
  document.title = format_iso_date( date )+': '+title.textContent;
}

function format_iso_date( date )
{
  var y = date.getFullYear(), m = date.getMonth()+1, d = date.getDate();
  return [y, m<10?'0'+m:m, d<10?'0'+d:d].join( '-' );
}

try{
remove( '//img[@src="_gfx/blg_footer.jpg"]' ); // drop ugly McD footer.
foreach( '//a[contains(@href,"/blg/blg_view")][text()="Blogg"]',
	 link_to_blog_view );
switch( location.pathname.toLowerCase() )
{
  /*
  case '/blg/blg_compose.aspx': // set a decently large blog editor size
    $('txtTempEditor').setAttribute( 'rows', '22' ); break;
  */
  case '/blg/blg_list.aspx': dont_read_on_imagezoom(); break;
  case '/blg/blg_viewlist.aspx': show_hover_colors(); break;
  case '/blg/blg_view.aspx': // Point the blog log link to this post's entries
    fix_blog_log_links();
    set_page_title(); break;
  case '/blg/blg_log.aspx': // expand abbreviated post titles
    fix_blog_log_links();
    foreach( '//td[contains(@id,"_tdTitle")]', fix_post_title );
    hook_up_view_filter(); // add text input to filter visitors
    if( !location.search.match( /page=/i ) )
      pull_in_full_blog_log();
    break;
}
}catch(e){alert(e)}

function pull_in_full_blog_log()
{
  var xp = visitor_xpath + '/../..';
  var url = 'http://www.lunarstorm.se/blg/blg_log.aspx?page=', p;
  var next = $x( xp ).pop().nextSibling;
  for( p=2; p<5; p++ )
  {
    var tr = document.createElement( 'tr' );
    tr.id = 'page'+p;
    next.parentNode.insertBefore( tr, next );
    get_url_xpath( url + p, xp, inject_bloglog );
  }
}

function inject_bloglog( nodes, xhr, url )
{
  var page = parseInt( url.charAt( url.length-1 ), 10 );
  var here = $( 'page'+ page );
  // GM_log( 'inject_bloglog '+ page +' '+ nodes.length );
  while( nodes.length )
  {
    var node = document.importNode( nodes.shift(), true );
    node.style.display = 'none'; // temporarily hide
    here.parentNode.insertBefore( node, here );
  }
  here.parentNode.removeChild( here );
  filter_view(); // show by view filter
}

function get_url_xpath( url, xpath, cb/*( [DOMNodes], xhr, url )*/ )
{
  get_url_dom( url, function( xml, xhr, url )
  {
    cb( $x( xpath, xml ), xhr, url );
  } );
}

// returns false for pages fetched via get_url_dom()
function is_normal_pageview()
{
  return (window == top) || ('lunar_main' == window.name);
}

function get_url_dom( url, cb/*( xml, xhr, url )*/ )
{
  // GM_log( 'loading '+url );
  GM_xmlhttpRequest({ method:'GET', url:url, onload:function( xhr )
  {
    if( xhr.responseXML )
      cb( xhr.responseXML, xhr, url );
    else
      makeDOM( xhr.responseText, xhr, url, cb );
  } });
}

function makeDOM( html, xhr, url, cb )
{
  //GM_log( 'makeDOM['+ html.length +'] '+url );
  // create an IFRAME to write the document into. the iframe must be added
  // to the document and rendered (eg display != none) to be property 
  // initialized.
  var iframe = document.createElement( 'iframe' );
  iframe.style.height = iframe.style.width = '0';
  iframe.style.visibility = 'hidden';
  iframe.style.position = 'absolute';
  document.body.appendChild( iframe );

  // give it a URL so that it will create a .contentDocument property. Make
  // the URL be the current page's URL so that we can communicate with it.
  // Otherwise, same-origin policy would prevent us.
  iframe.contentWindow.location.href = url;

  html = html.replace( /[\n\r]+/g, ' ' ). // indefinite load time sans this(?!)
    replace( /<script.*?<\/script>/ig, '' ). // (not interested in script code)
    replace( /<body(\s+[^="']*=("[^"]*"|'[^']*'|[^'"\s]\S*))*\s*onload=("[^"]*"|'[^']*'|[^'"]\S*)/ig, '<body$1' );

  // write the received content into the document
  var doc = iframe.contentDocument;
  iframe.contentDocument.open( 'text/html' );
  iframe.contentDocument.write( html );
  iframe.contentDocument.close();

  // wait for the DOM to be available, then do something with the document
  iframe.contentDocument.addEventListener( 'DOMContentLoaded', function()
  {
    //GM_log( 'DOMContentLoaded!' );
    cb( iframe.contentDocument.documentElement, xhr, url );
    //GM_log( $x( '//td', iframe.contentDocument.documentElement ).length );
  }, false);

  //GM_log( 'written html' );
}

var filter_input;
var visible_visitors;

function hook_up_view_filter()
{
  $x( '//td[text()="Annons"]' )[0].innerHTML = 'Filtrera l\xE4sarlistan';
  var td = $( 'externalAdsFrame' ).parentNode;
  td.style.background = '#FFF';
  td.style.padding = '2px 0 1px';
  td.style.border = '1px solid #000';
  td.style.borderTop = '0';
  td.style.lineHeight = '25px';
  var inputs = ['Namn:', 'Ort:', 'Inl\xE4gg:', 'Tidpunkt:'], html = '';
  for( var i=0; i<inputs.length; i++ )
    html += '<div style="width:70px; text-align:right; float:left;">'+
	    '<u>'+ inputs[i].charAt(0) +'</u>'+ inputs[i].substr(1) +
	    '</div><div style="float:right; width:130px;">'+
	    '<input type="text" style="width:128px; margin:1px 0;" '+
	    'accessKey="'+ inputs[i].charAt(0) +'"></div><br />';
  td.innerHTML = html;
  filter_input = inputs = td.getElementsByTagName( 'input' );
  for( var i=0; i<inputs.length; i++ )
  {
    EventMgr.add( inputs[i], 'keyup', filter_view, false );
    EventMgr.add( inputs[i], 'onchange', filter_view, false );
  }
}

function filter_view( e )
{
  //GM_log( (new Date).getTime() );
  //if( location.pathname.toLowerCase() != '/blg/blg_log.aspx' )
  //  return;
  foreach( visitor_xpath, filter_visible_lines );
}

function filter_visible_lines( node, line )
{
  if( !line )
    visible_visitors = 0;
  var line = node.parentNode.parentNode;
  var cols = $x( 'td[text()]', line );
/*
  var data = node.nextSibling.nodeValue.substr( 1 );
  var name = node.textContent; name += data;
  var city = /^.\d*,? ?(.*)/.exec( data )[1];
  var age = parseInt( data.substr( 1 ), 10 );
  var sex = data.charAt( 0 );
*/
  var matches, matcher, data;
  for( var i=0; i<cols.length; i++ )
  {
    data = cols[i].textContent.replace( /\s+/g, ' ' );
    matcher = filter_input[i].value;
    if( matcher.toLowerCase() != matcher ) // case sensitive?
      matches = data.match( matcher );
    else
      matches = data.toLowerCase().match( matcher );
    if( !matches )
      break;
  }
  if( matches )
  {
    var oddp = visible_visitors++ & 1;
    line.style.backgroundColor = oddp ? '#FFF' : '#E9F0F2';
    line.className = 'mlist' + oddp;
    line.style.display = '';
  }
  else
    line.style.display = 'none';
}

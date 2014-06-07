// ==UserScript==
// @name         Google Dilbert browser
// @namespace    http://www.lysator.liu.se/~jhs/userscript
// @include      http://*google.*/
// @include      http://*google.*/#*
// @include      http://*google.*/webhp*
// @include      http://www.comics.com/*
// @description	 Adds the comic strip of the day from Dilbert.com or any other UnitedMedia comic of your preference from www.comics.com to Google's search page, just below the Search / "I'm feeling lucky" buttons. Clicking the left/right thirds of the strip browses the previous/next strip, center portion loads the full comics.com page for this strip (access keys [Alt+] P/N and T respectively work too). When on comics.com, click the "Show this comic at Google" link by the comic selection box to change to your preferred comic.
// ==/UserScript==

if( location.hostname == 'www.comics.com' )
  return configure();

if( !location.pathname.match( /^\/($|webhp)/ ) ||
    !location.hostname.match( /\bgoogle\.[a-z.]{1,10}$/i ) )
  return; // don't hook on to Google Reader, for instance.

var debug = 0; // 1 for call log, 2 for profiling, 3 for both
var inject_after = '//form'; // comic injection point XPath selector

foreach( '(//br)[position() >= last()-1]', remove_node ); // drop some padding

var hostname = 'http://www.comics.com';
var strip = GM_getValue( 'name', 'dilbert' );
var archive = GM_getValue( 'path', '/comics/' ) + strip +'/archive/';
var page_re = new RegExp( archive + strip +'-\\d+.html', 'gm' );
var strip_re = new RegExp( archive + 'images/'+ strip +'[^&"\']*' );

var urls = []; // page urls, by date
var strips = {}; // page url:strip url, populated incrementally
var strip = make_tag( 'img', { usemap:'#prev-next', vspace:14, border:0 } );
var prev = make_tag( 'area', { accessKey:'P',shape:'rect',coords:'0,0,0,0' } );
var curr = make_tag( 'area', { accessKey:'T',shape:'rect',coords:'0,0,0,0' } );
var next = make_tag( 'area', { accessKey:'N',shape:'rect',coords:'0,0,0,0' } );
var map = make_tag( 'map', { name:'prev-next' }, [prev, curr, next] );

var count = 0; // number of strips seen; only used for profiling

load_comic();

function configure()
{
  if( location.pathname.match( /\//g ).length > 2 )
    foreach( '(//select[count(option)>40])[1]', install_handler );
}

function install_handler( select )
{
  var link = document.createElement( 'a' );
  var space = document.createTextNode( ' ' );
  link.title = 'Show this comic at www.google.com';
  link.href = 'http://www.google.com/#'+ location.pathname;
  link.innerHTML = 'Show\xA0this\xA0comic\xA0at\xA0Google';
  select.parentNode.insertBefore( link, select.nextSibling );
  select.parentNode.insertBefore( space, select.nextSibling );
  link.addEventListener( 'click', save_preferences, false );
  window.addEventListener( 'unload', function() {
    link.removeEventListener( 'click', save_preferences, false );
  }, false );
}

function save_preferences()
{
  var bits = location.pathname.match( /^(.[^\/]+.)([^\/]*)/ );
  GM_setValue( 'path', bits[1] );
  GM_setValue( 'name', bits[2] );
}

function make_tag( name, attr, children )
{
  var tag = document.createElement( name );
  if( attr )
    for( var name in attr )
      tag.setAttribute( name, attr[name] );
  if( children )
    for( var i=0; i<children.length; i++ )
      tag.appendChild( children[i] );
  return tag;
}

function remove_node( node )
{
  node.parentNode.removeChild( node );
}

function $x( xpath, root )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
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

// Fetch a web page and call cb( http_response, args[0], ..., args[N] )
function get( url, cb, args )
{
  if( args ) cb = make_caller( cb, args );
  GM_xmlhttpRequest( { method:'GET', url:url, onload:function( rq )
		     { log( 'got %s', url ); cb( rq.responseText ); } } );
}

function log()
{
  if( !(debug & 1) ) return;
  var args = Array.prototype.slice.call( arguments );
  return unsafeWindow.console.log.apply( this, args );
}

function time( name, endp )
{
  if( debug & 2 )
    return unsafeWindow.console[ endp ? 'timeEnd':'time' ]( name );
}


function make_caller( f, args, self )
{
  return function()
  {
    args = Array.prototype.slice.call( arguments ).concat( args||[] );
    f.apply( self||f, args );
  };
}

function draw_comic( url )
{
  log( 'draw_comic( %s )', url );
  if( !strip.parentNode )
  {
    $x( inject_after )[0].appendChild( strip );
    document.body.appendChild( map );
    prev.addEventListener( 'click', load_comic, true );
    next.addEventListener( 'click', load_comic, true );
    strip.addEventListener( 'load', set_coords, false );
  }

  time( strips[ url ] );
  strip.src = strips[ url ];

  var i = urls.indexOf( url );
  prev.href = urls[ bound( i-1, urls.length ) ];
  curr.href = urls[ i ] || url;
  next.href = urls[ bound( i+1, urls.length ) ];
}

function bound( n, max )
{
  return n < 0 ? n + max : n % max;
}

function set_coords()
{
  time( 'Display comic '+ count, 1 );
  time( strip.src, 1 );
  var w = strip.width, W = Math.floor( w/3 ), h = strip.height;
  log( 'set_coords( %d, %d )', w, h );
  prev.coords = '0,0,'+ W +','+ h;
  curr.coords = W +',0,'+ (w-W) +','+ h;
  next.coords = (w-W) +',0,'+ (--w) +','+ h;
  //prev.title = 'Previous strip';
  //next.title = 'Next strip';
}

function parse_strip_url( html, page_url )
{
  log( 'parse_strip_url( %d bytes of HTML, %s )', html.length, page_url );
  var url = strip_re.exec( html );
  if( url )
    strips[page_url] = hostname + url[0];
  draw_comic( page_url );
}

function parse_page_urls( html, page_url )
{
  time( 'parse_page_urls' );
  log( 'parse_page_urls( %d bytes of HTML, %s )', html.length, page_url );
  for( var url; url = page_re.exec( html ); )
  {
    url = hostname + url[0];
    if( typeof strips[url] != 'undefined' )
      continue; // only add page once per page url
    if( !strips[url] ) // no image url stored yet?
      strips[url] = null; // to be had there later
    urls.push( url );
  }
  urls.sort();

  var today = new Date;
  if( today.getMonth()==3 && today.getDate()==1 && !page_url )
  {
    var url = 'http://www.sinfest.net/archive_page.php?comicID=73';
    strips[url] = 'http://sinfest.net/comikaze/comics/2000-04-07.gif';
    draw_comic( url );
  }
  else
    parse_strip_url( html, page_url || urls[ urls.length-1 ] );
  time( 'parse_page_urls', 1 );
}

function load_comic( e )
{
  time( 'Display comic '+ (++count) );
  log( 'load_comic(%o)', e );
  if( e && e.preventDefault )
  {
    e.preventDefault();
    e.stopPropagation();
  }
  var url = e && e.target && e.target.href;
  if( location.hash.length && !url )
    url = hostname + location.hash.substring( 1 );
  if( strips[ url ] )
  {
    log( 'already had '+url );
    draw_comic( url );
  }
  else
  {
    log( 'loading %s', url||'archive' );
    get( url || hostname+archive, parse_page_urls, url );
  }
}

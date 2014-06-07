// ==UserScript==
// @name          Allofmp3 search preview playlist
// @namespace     http://www.lysator.liu.se/~jhs/userscript
// @description   Makes m3u playlists of the search result set for the preview mp3:s, so you can easily stream them to your music player of choice without major click hassle.
// @include       http://music.allofmp3.com/search.shtml*
// @include       http://music.allofmp3.com/*
// ==/UserScript==

var search_preview_links = '//a[contains(@href, "preview.shtml")]';
var preview_mp3_location = '//a[text()="Download sample"]';

if( !is_normal_pageview() ) return; // needed for get_dom_url compliance.

var urls = [], names = {}; // gets populated from these pages:
var n = foreach( search_preview_links, fetch_mp3_url );

function fetch_mp3_url( a, n )
{
  var url = a.href;
  names[url] = [ a.textContent ]
  // unsafeWindow.console.log( url+':'+names[url] );
/*
  var info = $x( '../a', a ); // [artist/category, album/collection, song]
  names[url] = [];
  while( a = info.shift() )
    names[url].push( a.textContent );

  names[url] = [ info[0].textContent, info[1].textContent, info[2].textContent ];

  if( location.pathname == '/search.shtml' )
    names[url] = { artist:info[0].textContent,
		    album:info[1].textContent,
		     song:info[2].textContent };
*/
  get_url_xpath( url, preview_mp3_location, populate_mp3_urls );
  return 1;
}

function populate_mp3_urls( as, xhr, url )
{
  for( var a; a = as.shift(); )
  {
    names[a.href] = names[url];
    urls.push( a.href );
  }
  if( !--n ) // all mp3 urls collected?
  {
    inject_m3u( urls );
  }
}

function inject_m3u( urls, at )
{
  var a = document.createElement( 'a' );
  a.href = generate_m3u_playlist( urls );
  a.innerHTML = 'Play all previews';
  document.body.appendChild( a );
  // location.href = a.href;
  GM_registerMenuCommand( 'Play all', function(){ location.href = a.href; } );
}

function generate_m3u_playlist( urls )
{
  var data = '#EXTM3U', dups = {}, url, i = 0;
  while( url = urls.shift() )
    if( !dups[url] )
    {
      dups[url] = 1;
      //unsafeWindow.console.log( url+'?' );
      data += '\n#EXTINF:-1,'+ names[url].join(' | ') +'\n'+ url;
    }
  data = encodeURIComponent( data );
  return 'data:audio/x-mpegurl;charset=utf-8,' + data;
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
  return window == top;
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

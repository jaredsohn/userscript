// ==UserScript==
// @name         Case normalize all URLs at IIS driven web sites
// @namespace    http://www.lysator.liu.se/~jhs/userscript
// @description  This script lowercases parts of URLs within the same IIS web site, that IIS considers case insensitive, so you can easier see which pages you have already been to, regardless of how stupidly the site maintainer randomizes link capitalization throughout the site.
// @include      http://*
// ==/UserScript==

var count = 0; // number of changed URLs; exported as window.normalized_urls

var poll_threshold = 7 * 24 * 3600e3; // check the server header once a week

var now = (new Date).getTime();
var server = eval( GM_getValue( 'server', '({})' ) );
var last_seen = eval( GM_getValue( 'last_seen', '({})' ) );
var host = location.host.toLowerCase();

var same_site = location.host.replace( /\./g, '\\.' );
same_site = new RegExp( '^http://'+ same_site +'(?=/)', 'i' );
var authority = same_site.exec( location.href )[0].toLowerCase();

normalize_urls_if_IIS();

function normalize_urls_if_IIS()
{
  if( !server[host] || (now - (last_seen[host] || 0)) > poll_threshold )
    GM_xmlhttpRequest( { method:'HEAD', url:authority+'/',
			 onload:process_headers } );
  else if( server[host].match( /iis/i ) )
    case_normalize_urls();
}

/* example responseHeaders:

Server: Microsoft-IIS/5.0
Date: Mon, 14 Aug 2006 12:10:48 GMT
X-AspNet-Version: 2.0.50727
Pragma: no-cache, no-cache
Cache-Control: no-cache
Expires: -1
Content-Type: text/html; charset=Windows-1252
Content-Length: 7216

Date: Mon, 14 Aug 2006 12:08:34 GMT
Server: Apache
Last-Modified: Mon, 05 Dec 2005 17:52:42 GMT
Etag: "110c394-d27-95ecee80"
Accept-Ranges: bytes
Vary: Accept-Encoding,User-Agent
Content-Encoding: gzip
Content-Length: 1428
Connection: close
Content-Type: text/html; charset=utf-8

*/

function process_headers( xhr )
{
  var s = xhr.responseHeaders.match( /(?:^|[\r\n])server:\s*([^\r\n]*)/i );
  if( !s ) return;
  //prompt( xhr.responseHeaders, s[1] );
  server[host] = s[1];
  last_seen[host] = now;
  GM_setValue( 'server', server.toSource() );
  GM_setValue( 'last_seen', last_seen.toSource() );
  if( server[host].match( /iis/i ) )
    case_normalize_urls();
}

function case_normalize_urls()
{
  var l = document.links, i, a;
  for( i = 0; i<l.length; i++ )
  {
    a = l[i];
    if( !same_site.test( a.href ) )
      continue;
    var search = a.search.replace( /[?&][^=]*/g, downcase );
    var href = authority + a.pathname.toLowerCase() + search + a.hash;
    if( href != a.href )
    {
      count++;
      a.href = href;
    }
  }
  unsafeWindow.normalized_urls = count;
}

function downcase( param )
{
  return param.toLowerCase();
}

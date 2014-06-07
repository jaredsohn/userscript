// ==UserScript==
// @name          GoOgre
// @namespace     http://sniggle.net/
// @description   undoes the sneaky (some might say evil) google redirect
// @include       http://www.google.com/search*
// @include       http://google.com/search*
// ==/UserScript==
// Eliminate the sneaky redirect in google search results

var as = document.getElementsByTagName("a");
for( var i = 0; i < as.length; i++ )
{
  var a = as[i];
  var href = a.href
  if( href.indexOf( 'google.com/url' ) >= 0 )
  {
    var href = a.href;
// Form:
// http://www.google.com/url?sa=U&start=99&q=http://www.realurl.com/index.html?real=foo&alsoreal=bar&e=99999&ei=ABUNCHOFGARBAGE&sig=__MOREGARBAGE=
// From this we want to extract:
// http://www.realurl.com/index.html?real=foo&alsoreal=bar
    var beginning = href.indexOf( '&q=' ) + 3;
    var end = href.lastIndexOf( '&e=' );
    var realurl = href.slice( beginning, end );
    a.href = realurl;
  }
}

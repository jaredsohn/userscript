// ==UserScript==
// @name           Yahoo Fantasy Baseball Standings Link
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Adds standings link to every page
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
/*
   Updates:
   29-May-2007 - Changed include path to allow http://beta.
*/
(function() {

var subnav = document.getElementById( 'yspsubnav' );
if ( subnav == null )
    return;
    
var lis = subnav.getElementsByTagName( 'li' );
lis[ lis.length - 1 ].setAttribute( "class", "" );
var ul = lis[ 0 ].parentNode;

var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, '$1/standings' );
li.innerHTML = '<a href="' + url + '">Standings</a>';
if ( /\/standings$/i.test( location.href ) )
    li.setAttribute( "class", "last selected" )
else
    li.setAttribute( "class", "last" )
ul.appendChild( li );
})();
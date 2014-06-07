// ==UserScript==
// @name           Yahoo Fantasy Sports Home Button Remover
// @namespace      
// @description    Removes Home button
// @include        *.fantasysports.yahoo.com/*
// @author         Tim Harding (tjharding at gmail dot com)
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
/*
   Updates:

*/

(function() {
    
var yspNav = document.getElementById( 'yspnav' );
var yspNav2 = yspNav.getElementsByTagName( 'div' );
var target = yspNav2[ 0 ];
var lis = target.getElementsByTagName( 'li' );
lis[ 0 ].parentNode.removeChild( lis[ 0 ] );

})();
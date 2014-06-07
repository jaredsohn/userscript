// ==UserScript==
// @name           classicstattracker
// @namespace      classicstattracker.user.js
// @include        *baseball.fantasysports.yahoo.com/*
// ==/UserScript==

(function() {

var subnav = document.getElementById( 'yspsubnav');
if ( subnav == null )
    return;
    
var lis = subnav.getElementsByTagName( 'li' );
lis[ lis.length - 1 ].setAttribute( "class", "" );
var ul = lis[ 0 ].parentNode;

var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/([a-z]\d|hockey)\/\d+).*$/i, '$1/loadstattracker?classic=1' );
li.innerHTML = '<a href="' + url + '">Classic</a>';
ul.appendChild( li );

})();
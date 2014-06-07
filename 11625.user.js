// ==UserScript==
// @name           Yahoo Fantasy Baseball Add Players Links
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// @description    Add links for displaying probable starters and players stats over last month
// $LastChangedRevision: 438 $
// $LastChangedDate: 2008-06-24 20:44:16 -0500 (Tue, 24 Jun 2008) $
// ==/UserScript==
(function() {

var subnav = document.getElementById( 'yspsubnav' );
if ( subnav == null )
    return;

var lis = subnav.getElementsByTagName( 'li' );
lis[ lis.length - 1 ].setAttribute( "class", "" );
var ul = lis[ 0 ].parentNode;

GM_addStyle( '#yspsubnav a, #yspsubnav strong {padding:8px 5px 10px;}' );

// Probable pitchers
var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, '$1/players?status=A&pos=S_P&stat1=S_L30&sort=AR' );
li.innerHTML = '<a href="' + url + '">Starters</a>';
ul.appendChild( li );

// Batters ranked over the last month
var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, '$1/players?status=A&pos=B&cut_type=33&stat1=S_L30&sort=AR' );
li.innerHTML = '<a href="' + url + '">Batters</a>';
ul.appendChild( li );

// Today's batters
var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, '$1/players?status=ALL&pos=B&cut_type=33&stat1=S_D&sort=60' );
li.innerHTML = '<a href="' + url + '">Today\'s Batters</a>';
ul.appendChild( li );
})();
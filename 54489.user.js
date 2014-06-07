// ==UserScript==
// @name           Yahoo Fantasy Baseball Players Last Week
// @namespace      http://userscripts.org/users/101147
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Bill O'Shea
// @description    Links for pitchers/batters over the last week
// ==/UserScript==
(function() {

var subnav = document.getElementById( 'yspsubnav' );
if ( subnav == null )
    return;

var lis = subnav.getElementsByTagName( 'li' );
lis[ lis.length - 1 ].setAttribute( "class", "" );
var ul = lis[ 0 ].parentNode;

GM_addStyle( '#yspsubnav a, #yspsubnav strong {padding:8px 5px 10px;}' );

// Pitchers ranked over the last week
var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, '$1/players?status=A&pos=P&cut_type=33&stat1=S_L7&sort=AR' );
li.innerHTML = '<a href="' + url + '">Pitchers LW</a>';
ul.appendChild( li );

// Batters ranked over the last week
var li = document.createElement( 'li' );
var url = location.href.replace( /(^.*\/b\d\/\d+).*$/i, 
'$1/players?status=A&pos=B&cut_type=33&stat1=S_L7&sort=AR' );
li.innerHTML = '<a href="' + url + '">Batters LW</a>';
ul.appendChild( li );
})();
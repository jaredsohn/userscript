// ==UserScript==
// @name           Yahoo Fantasy Watch List Link
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Adds the Watch List link to the League and Players tabs
// @include        *.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 333 $
// $LastChangedDate: 2007-09-19 09:54:07 -0500 (Wed, 19 Sep 2007) $
// ==/UserScript==
/*
    Updates:
    19-Sep-2007 - Updated to work with football, and to add link to all pages, not just player page
*/
(function() {

var nav = document.getElementById( 'yspnav' );
if ( nav == null )
    return;
    
var playersPage = false;
var teamUrl = null;
var lis = nav.getElementsByTagName( 'li' );
for ( var i = 0; i < lis.length; i++ )
{
    var c = getClassName( lis[ i ] );
    var a = lis[ i ].getElementsByTagName( 'a' )[ 0 ];
    var atext = stripTags( a.innerHTML );
    if ( /selected/i.test( c ) )
    {
        if ( /^(league|players)/i.test( atext ) )
            playersPage = true;
    }
    if ( /^my team/i.test( atext ) && /\/[bf]\d\/\d+\/\d+/i.test( a.href ) )
        teamUrl = a.href;

    if ( teamUrl != null && playersPage )
        break;
}
if ( /* !playersPage || */ teamUrl == null )
    return;

lis = document.getElementById( 'yspsubnav' ).getElementsByTagName( 'li' );
lis[ lis.length - 1 ].setAttribute( "class", "" );
var ul = lis[ 0 ].parentNode;

var li = document.createElement( 'li' );
var url = teamUrl + '/playerswatch';
li.innerHTML = '<a href="' + url + '">Watch List</a>';
if ( /\/playerswatch$/i.test( location.href ) )
    li.setAttribute( "class", "last selected" )
else
    li.setAttribute( "class", "last" )
ul.appendChild( li );

function getClassName( el )
{
    var className = el.getAttribute( 'class' );
    if ( className == null )
        className = el.getAttribute( 'className' );
    return className;
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}
})();
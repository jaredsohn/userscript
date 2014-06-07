// ==UserScript==
// @name           Yahoo Fantasy Player Search
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Adds player search box to sub navigation if it doesn't already exist on the page
// @include        *.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 299 $
// $LastChangedDate: 2007-09-06 21:34:32 -0500 (Thu, 06 Sep 2007) $
// ==/UserScript==
/*
   Updates:
    25-May-2007 - Added check for sub-navigation which isn't there when viewing other owners' team rosters
    29-May-2007 - Changed include path to allow http://beta.
    06-Sep-2007 - Tweaked to work on sites other than baseball
    06-Sep-2007 - Fixed to work with hockey

   Idea came from this script by jk:
    http://userscripts.org/scripts/show/4100
*/
(function() {

if ( document.getElementById( 'playersearchtext' ) )
    return;

var nav = document.getElementById( 'yspnav' );
var yspsubnav = document.getElementById( 'yspsubnav' );
if ( nav == null || yspsubnav == null )
    return;

var teamUrl = null;
var lis = nav.getElementsByTagName( 'li' );
for ( var i = 0; i < lis.length; i++ )
{
    var a = lis[ i ].getElementsByTagName( 'a' )[ 0 ];
    var atext = stripTags( a.innerHTML );

    if ( /^my team/i.test( atext ) && /\/([a-z]\d|hockey)\/\d+\/\d+/i.test( a.href ) )
    {
        teamUrl = a.href;
        break;
    }
}
if ( teamUrl == null )
    return;
    
GM_addStyle( '\
#gnc_playersearch { margin-top:2px } \
#gnc_playersearch td { vertical-align:middle; } \
#gnc_playersearch .gnc_textfield { font-size:10px; width:40px } \
' );

var table = document.createElement( 'table' );
table.id = 'gnc_playersearch';
table.innerHTML = '\
<tr><td>\
    <form method="post" action="' + teamUrl + '/playersearch">\
    <input class="gnc_textfield" type="text" name="search" onfocus="this.style.width=\'80px\'"; onblur="this.style.width=\'40px\'"/>\
    <input class="button" value="Find Player" type="submit">\
    </form>\
</td></tr>';
yspsubnav.appendChild( table );

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}

function getClassName( el )
{
    var className = el.getAttribute( 'class' );
    if ( className == null )
        className = el.getAttribute( 'className' );
    return className;
}
})();

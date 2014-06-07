// ==UserScript==
// @name           Yahoo Baseball Team Subnavigation Links
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Adds subnavigation links to opposing team pages
// @include        *baseball.fantasysports.yahoo.com*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 328 $
// $LastChangedDate: 2007-09-19 09:20:09 -0500 (Wed, 19 Sep 2007) $
// ==/UserScript==
/*
    Updates:
    19-Sep-2007 - Get rid of extra whitespace at top of page 
*/

(function(){

if (!location.href.match(/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+\/(team(log)?\?mid=)?\d+.*/i))
    return;

var yspsubnav = document.getElementById( 'yspsubnav' );
if ( yspsubnav )
    return;

var yspnav = document.getElementById( 'yspnav' );
if ( !yspnav )
    return;

GM_addStyle( '#team-nav .wrapper { min-height: 0px }' );

yspsubnav = document.createElement( 'div' );
yspsubnav.id = 'yspsubnav';
yspsubnav.setAttribute( 'class', 'navlist' );

var myTeamUrl = document.evaluate(
        "//div[@id='yspnav']//a[contains(.,'My Team')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem( 0 );

var matches = location.href.match( /(^.+baseball\.fantasysports\.yahoo\.com\/b\d\/\d+\/)(?:team(?:log)?\?mid=)?(\d+).*/i );
var teamUrl = matches[ 1 ] + matches[ 2 ];

yspsubnav.innerHTML = '<ul><li class="first"><a href="' + teamUrl + '">Roster</a></li>';
yspsubnav.innerHTML += '<li><a href="' + myTeamUrl + '/proposetrade?stage=1&mid2=' + matches[ 2 ] + '">Propose Trade</a></li>';
yspsubnav.innerHTML += '<li><a href="' + teamUrl + '/teamlog">Team Log</a></li></ul>';
yspnav.parentNode.insertBefore( yspsubnav, yspnav.nextSibling );

var midselect = document.getElementById( 'midselect' );
if ( midselect )
{
    var teamNav = document.evaluate(
        "//div[@id='otherteamnav']/form/select[@id='midselect']/option[@selected]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var teamName = teamNav.snapshotItem( 0 ).innerHTML;

    var h1 = document.getElementById( 'linupanalysis' );
    if ( h1 )
    {
        h1 = h1.getElementsByTagName( 'h1' )[ 0 ];
        h1.innerHTML = teamName + ' ' + h1.innerHTML;
    }
}

})();
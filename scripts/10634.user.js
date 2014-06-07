// ==UserScript==
// @name           Yahoo Baseball Link MLB Probable Pitchers
// @namespace      http://glenncarr.com/greasemonkey/yahoobaseball
// @description    Add links under dates for MLB probably pitchers page
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 166 $
// $LastChangedDate: 2007-07-13 17:18:13 -0500 (Fri, 13 Jul 2007) $
// ==/UserScript==

(function(){

var dateNav = document.getElementById( 'datenav' );
if ( !dateNav )
    return;
    
var ul = dateNav.getElementsByTagName( 'ul' )[ 0 ];
if ( !ul )
    return;
    
var lis = ul.getElementsByTagName( 'li' );
if ( !lis )
    return;
    
for ( var i = 0; i < lis.length; i++ )
{
    var li = lis[ i ];
    var a = li.getElementsByTagName( 'a' )[ 0 ];
    var yyyymmdd = a.href.replace( /^.*date=(\d+)-(\d+)-(\d+)$/i, '$1$2$3' );
    li.innerHTML = '<table cellpadding="0" cellspacing="0" border="0"><tr><td>' + li.innerHTML + '</td></tr><tr><td><a style="padding-top: 0px; font-size: 9px" target="mlbprobablepitchers" href="http://mlb.mlb.com/news/probable_pitchers.jsp?c_id=mlb&ymd=' + yyyymmdd + '">MLB.com Pitchers</a></td></tr></table>';
}

GM_addStyle( '#dnd-status { top: 70px }' );

})();
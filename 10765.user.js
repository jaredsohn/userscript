// ==UserScript==
// @name           Yahoo Baseball Change Benched Colors
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasybaseball
// @include        *baseball.fantasysports.yahoo.com*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 204 $
// $LastChangedDate: 2007-07-23 15:16:59 -0500 (Mon, 23 Jul 2007) $
// ==/UserScript==
/*

Updates:
    23-Jul-2007 - Use stripe colors on standings table

*/
(function(){
/*
   about:config settings with default values:
*/
var BENCHED_BACKGROUND_COLOR = getConfigValue( 'benched_background_color', '#F1F2ED' );
var BENCHED_FOREGROUND_COLOR = getConfigValue( 'benched_foreground_color', '#000000' );
var TOTALS_BACKGROUND_COLOR = getConfigValue( 'totals_background_color', '#D8D9D5' );
var TOTALS_FOREGROUND_COLOR = getConfigValue( 'totals_foreground_color', '#000000' );
var STARTER_EVEN_BACKGROUND_COLOR = getConfigValue( 'starter_even_background_color', '#ffffff' );
var STARTER_ODD_BACKGROUND_COLOR = getConfigValue( 'starter_odd_background_color', '#ffffff' );

GM_addStyle( '\
.dragenabled tr.even td, .teamtable tr.even td, table#standingstable tr.even td { background: ' + STARTER_EVEN_BACKGROUND_COLOR + ' }\
.dragenabled tr.odd td, .teamtable tr.odd td, table#standingstable tr.odd td { background: ' + STARTER_ODD_BACKGROUND_COLOR + ' }\
.dragenabled tr.bench td, .dragenabled tr.dl td { background: ' + BENCHED_BACKGROUND_COLOR + '; color: ' + BENCHED_FOREGROUND_COLOR + '; }\
div.sumstats div.sum { background: ' + TOTALS_BACKGROUND_COLOR + '; color: ' + TOTALS_FOREGROUND_COLOR + ' }\
' );

var standingsTable = document.getElementById( 'standingstable' );
if ( standingsTable )
{
    for ( var i = 0; i < standingsTable.rows.length; i++ )
    {
        var row = standingsTable.rows[ i ];
        var rowClass = row.getAttribute( "class" );
        if ( !/\b(even|odd|selected)\b/.test( rowClass ) )
        {
            rowClass += ( i % 2 == 0 ) ? " even" : " odd";
            row.setAttribute( "class", rowClass );
        }
    }
}

function getConfigValue( pref, defValue )
{
    var configValue = defValue;
    
    try 
    {
        configValue = GM_getValue( pref, defValue );
        configValue = ( ( typeof configValue == 'string' && configValue != '' ) ? configValue : defValue );
    } 
    catch ( e ) { }
    GM_setValue( pref, configValue );
    return configValue;
}

})();
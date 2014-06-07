// ==UserScript==
// @name           Yahoo Fantasy Baseball Team Stat Totals
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Display totals for a Yahoo Fantasy Baseball team
// @include        *baseball.fantasysports.yahoo.com/*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 430 $
// $LastChangedDate: 2008-06-06 14:49:49 -0500 (Fri, 06 Jun 2008) $
// ==/UserScript==
/*
   about:config settings:
    - display_yahoo_totals - set this to false to hide the Yahoo totals.  
        I like my totals between my starters and my bench instead of under all players.  
        But, this script can't display all the totals for all the stats (e.g., OBP), 
        so you may want to keep the Yahoo totals displayed.

   Updates:
   04-Jun-2007 - Initial version
   04-Jun-2007 - Fixed bug where script was interfering with Yahoo script, and colspan was being incorrectly determined
   05-Jun-2007 - Fixed to only display totals on roster pages where it makes sense
   05-Jun-2007 - Fixed bug where totals weren't displayed in the correct column for opposing teams
   05-Jun-2007 - Fixed rounding error bug in ERA total calculation
   05-Jun-2007 - Fixed rounding error bug in SLG%; Fixed bug where totals row wouldn't display if no BN/DL players
   28-Jun-2007 - Added tooltip (title attribute) to display the number of earned runs allowed when hovering over the ERA value for a pitcher
   28-Jun-2007 - Added tooltip (title attribute) to display the number of hits/walks allowed when hovering over the WHIP value for a pitcher
   29-Jun-2007 - Added K/9 totals
   14-Jul-2007 - Fixed rounding error bug in WHIP calculation
   18-Jul-2007 - Add about:config option to hide Yahoo totals (display_yahoo_totals)
   24-Jul-2007 - Modify to show totals when Yahoo doesn't ('Week', etc.)
   06-Jun-2007 - Modify to not add totals line where it doesn't make sense
*/

(function(){

if ( !/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+\/(\d+(\/team)?|team\?mid=\d+)(\?\&?stat1=(S|AS|SPS)(&\S+=\S+)*)?$/i.test( location.href ) )
    return;

Number.prototype.toInningsPitched = function()
{
    return parseInt( this / 3, 10 ) + '.' + ( this % 3 );
}

window.setTimeout( function() {

var TOTALS_BACKGROUND_COLOR = GM_getValue( 'totals_background_color', '#ffffcc' );
GM_setValue( 'totals_background_color', TOTALS_BACKGROUND_COLOR );

var TOTALS_FOREGROUND_COLOR = GM_getValue( 'totals_foreground_color', '#000000' );
GM_setValue( 'totals_foreground_color', TOTALS_FOREGROUND_COLOR );

var DISPLAY_YAHOO_TOTALS = GM_getValue( 'display_yahoo_totals', true );
GM_setValue( 'display_yahoo_totals', DISPLAY_YAHOO_TOTALS );

GM_addStyle( '\
tr.total td { background: ' + TOTALS_BACKGROUND_COLOR + '; color: ' + TOTALS_FOREGROUND_COLOR + '; border-bottom: double 3px #ccc; border-top: solid 1px #ccc; font-weight: bold }\
tr.total { height: 1.75em; }\
' );

var yahooTotalsPresent = ( document.evaluate( '//div[@class="sum"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotLength > 0 );

if ( !DISPLAY_YAHOO_TOTALS )
    GM_addStyle( 'div.sum > * { display: none }' );

for ( var iTable = 0; ; iTable++ )
{
    var table = document.getElementById( 'statTable' + iTable )
    if ( !table )
        break;

    var totalsColSpan = -1;
    var iInningsPitched = -1;
    var statIndicesSynched = false;

    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];
        var rowClass = row.getAttribute( "class" );
        if ( /^headerRow1/i.test( rowClass ) )
        {
            var stats = new Array();
            for ( var iCell = 0; iCell < row.cells.length; iCell++ )
            {
                var cell = row.cells[ iCell ];
                var cellClass = cell.getAttribute( "class" );
                if ( /^stat\b/i.test( cellClass ) )
                    stats.push( { index:-1, caption:stripTags( cell.innerHTML ), total:null } );
            }
        }
        else if ( /^(odd|even)\b/i.test( rowClass ) )
        {
            if ( !/^(bn|dl)$/i.test( stripTags( row.cells[ 0 ].innerHTML ) ) )
            {
                if ( !statIndicesSynched )
                {
                    var iStat = 0;
                    for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                    {
                        var cell = row.cells[ iCell ];
                        var cellClass = cell.getAttribute( "class" );
                        if ( /^stat\b/i.test( cellClass ) )
                            stats[ iStat++ ].index = iCell;
                    }
                    statIndicesSynched = true;
                }

                for ( var iStat = 0; iStat < stats.length; iStat++ )
                {
                    var cell = row.cells[ stats[ iStat ].index ];
                    var cellClass = cell.getAttribute( "class" );
                    if ( totalsColSpan == -1 && ( /^stat\b/i.test( cellClass ) ) )
                    {
                        totalsColSpan = stats[ iStat ].index - 1;
                    }

                    var cellText = cell.innerHTML;
                    if ( /^(avg|fpct)/i.test( stats[ iStat ].caption ) )
                    {
                    }
                    else if ( /^h\/ab/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = { h:0, ab:0 };
                        var abThisBatter = null;
                        var matches = cellText.match( /(\d+)\/(\d+)/ );
                        if ( matches )
                        {
                            stats[ iStat ].total.h += parseInt( matches[ 1 ], 10 );
                            stats[ iStat ].total.ab += ( abThisBatter = parseInt( matches[ 2 ], 10 ) );
                        }
                    }
                    else if ( /^slg/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = 0; // total bases
                        var matches = cellText.match( /\.(\d+)/ );
                        if ( matches )
                        {
                            if ( abThisBatter != null )
                            {
                                var bases = Math.round( abThisBatter * parseFloat( cellText ) );
                                stats[ iStat ].total += bases;
                            }
                        }
                    }
                    else if ( /^ip/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = 0; // thirds
                        var ipThisPitcher = null;
                        var matches = cellText.match( /(\d+)\.(\d+)/ );
                        if ( matches )
                        {
                            stats[ iStat ].total += ( ipThisPitcher = ( parseInt( matches[ 1 ], 10 ) * 3 ) + parseInt( matches[ 2 ], 10 ) );
                        }
                        iInningsPitched = iStat;
                    }
                    else if ( /^era/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = 0; // earned runs
                        var matches = cellText.match( /(\d+)\.(\d+)/ );
                        if ( matches )
                        {
                            // era = 9 * ( er / ip )
                            // er = era / 9 * ip
                            if ( iInningsPitched != -1 )
                            {
                                var er = Math.round( ( parseFloat( cellText ) / 9.0 ) * parseFloat( ipThisPitcher ) / 3.0 );
                                stats[ iStat ].total += er;
                                cell.setAttribute( 'title', er + ' earned run' + (stats[ iStat ].total != 1 ? 's' : '') );
                            }
                        }
                    }
                    else if ( /^whip/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = 0; // w + h
                        var matches = cellText.match( /(\d+)\.(\d+)/ );
                        if ( matches )
                        {
                            // whip * ip = ( w + h )
                            if ( iInningsPitched != -1 )
                            {
                                var wh = Math.round( parseFloat( cellText ) * parseFloat( ipThisPitcher / 3 ) );
                                stats[ iStat ].total += wh;
                                cell.setAttribute( 'title', wh + ' hit' + (stats[ iStat ].total != 1 ? 's' : '') + ' and/or walk' + (stats[ iStat ].total != 1 ? 's' : '') );
                            }
                        }
                    }
                    else if ( /^k\/9/i.test( stats[ iStat ].caption ) )
                    {
                        if ( stats[ iStat ].total == null )
                            stats[ iStat ].total = 0; // Ks
                        var matches = cellText.match( /(\d+)\.(\d+)/ );
                        if ( matches )
                        {
                            // k9 = k / ip * 9
                            // k9 / 9 * ip = k
                            if ( iInningsPitched != -1 )
                            {
                                var k = parseInt( Math.round( parseFloat( cellText ) / 9.0 * ( ipThisPitcher / 3 ) ), 10 );
                                stats[ iStat ].total += k;
                                cell.setAttribute( 'title', k + ' K' + (stats[ iStat ].total != 1 ? 's' : '') + ' in ' + ipThisPitcher.toInningsPitched() + ' IP' );
                            }
                        }
                    }
                    else
                    {
                        var intVal = parseInt( cellText, 10 );
                        if ( !isNaN( intVal ) )
                        {
                            if ( stats[ iStat ].total == null )
                                stats[ iStat ].total = 0;
                            stats[ iStat ].total += parseInt( cellText, 10 );
                        }
                    }
                }
            }
            if ( /(bn|dl)/i.test( row.cells[ 0 ].innerHTML ) )
                break;
        }
    }
    if ( !yahooTotalsPresent || !DISPLAY_YAHOO_TOTALS )
        addTotalsRow();
}

function addTotalsRow()
{
    var tr = document.createElement( 'tr' );
    tr.setAttribute( "class", "total" );
    row.parentNode.insertBefore( tr, row );
    tr.innerHTML = '<td colspan="' + totalsColSpan + '" style="text-align: left">Starting Lineup Totals</td>';
    var iHitsAtBats = -1;
    for ( var iStat = 0; iStat < stats.length; iStat++ )
    {
        var td = document.createElement( 'td' );
        td.setAttribute( "class", "stat" );
        if ( /^(fpct)|(obp)|(ops)|(k\/bb)/i.test( stats[ iStat ].caption ) )
        {
        }
        else if ( /^h\/ab/i.test( stats[ iStat ].caption ) )
        {
            if ( stats[ iStat ].total.ab > 0 )
                td.innerHTML = stats[ iStat ].total.h + '/' + stats[ iStat ].total.ab;
            else
                td.innerHTML = '-/-';
            iHitsAtBats = iStat;
        }
        else if ( /^avg/i.test( stats[ iStat ].caption ) )
        {
            if ( stats[ iHitsAtBats ].total.ab > 0 )
                td.innerHTML = parseFloat( stats[ iHitsAtBats ].total.h / stats[ iHitsAtBats ].total.ab ).toFixed( 3 ).replace( /^0\./, '.' );
            else
                td.innerHTML = '-/-';
        }
        else if ( /^slg/i.test( stats[ iStat ].caption ) )
        {
            if ( stats[ iHitsAtBats ].total != null )
                td.innerHTML = parseFloat( stats[ iStat ].total / stats[ iHitsAtBats ].total.ab ).toFixed( 3 ).replace( /^0\./, '.' );
            else
                td.innerHTML = '-/-';
        }
        else if ( /^ip/i.test( stats[ iStat ].caption ) )
        {
            if ( stats[ iStat ].total > 0 )
                td.innerHTML = stats[ iStat ].total.toInningsPitched();
            else
                td.innerHTML = '-';
        }
        else if ( /^era/i.test( stats[ iStat ].caption ) )
        {
            // era = 9 * ( er / ip )
            if ( stats[ iInningsPitched ].total > 0 )
            {
                td.innerHTML = ( 9 * ( stats[ iStat ].total / ( stats[ iInningsPitched ].total / 3 ) ) ).toFixed( 2 );
                td.setAttribute( 'title', stats[ iStat ].total + ' earned run' + (stats[ iStat ].total != 1 ? 's' : '') );
            }
            else
                td.innerHTML = '-';
        }
        else if ( /^whip/i.test( stats[ iStat ].caption ) )
        {
            // whip = ( w + h ) / ip
            if ( stats[ iInningsPitched ].total > 0 )
            {
                td.innerHTML = ( stats[ iStat ].total / ( stats[ iInningsPitched ].total / 3 ) ).toFixed( 2 );
                td.setAttribute( 'title', stats[ iStat ].total + ' hit' + (stats[ iStat ].total != 1 ? 's' : '') + ' and/or walk' + (stats[ iStat ].total != 1 ? 's' : '') );
            }
            else
                td.innerHTML = '-';
        }
        else if ( /^k\/9/i.test( stats[ iStat ].caption ) )
        {
            // k9 = k / ip * 9
            // k9 / 9 * ip = k
            if ( stats[ iInningsPitched ].total > 0 )
            {
                td.innerHTML = ( stats[ iStat ].total / ( stats[ iInningsPitched ].total / 3 ) * 9.0 ).toFixed( 2 );
                td.setAttribute( 'title', stats[ iStat ].total + ' K' + (stats[ iStat ].total != 1 ? 's' : '') + ' in ' + stats[ iInningsPitched ].total.toInningsPitched() + ' IP' );
            }
            else
                td.innerHTML = '-';
        }
        else
        {
            if ( stats[ iStat ].total == null )
                td.innerHTML = '-';
            else
                td.innerHTML = stats[ iStat ].total;
        }

        tr.appendChild( td );
    }
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}

}, 200 );

})();

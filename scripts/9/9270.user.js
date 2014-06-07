// ==UserScript==
// @name           Yahoo Fantasy Baseball Trading Block
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Add abbreviated trading block to league overview page
// @include        *baseball.fantasysports.yahoo.com/*
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
/*
   Updates:
   16-May-2007 - Fixed some bugs, cleaned up
   29-May-2007 - Changed include path to allow http://beta.
*/
(function() {

if (!location.href.match(/^http\:\/\/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+/i))
    return;

var standings = document.getElementById( 'leaguehomestandings' );
if ( standings == null )
    return;

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

GM_addStyle('#tradingblock table td { font: 10px verdana, arial; }' );
GM_addStyle('.thStyle1 TH { background-color: #D5D6C6; font: 10px verdana, arial; } /*on overview page, used at row level*/');
GM_addStyle('.row1 {background-color: #FFFFFF;}');
GM_addStyle('.row2 {background-color: #F1F2ED;}');

var divTradingBlock = document.createElement( 'DIV' );
divTradingBlock.id = "tradingblock";
divTradingBlock.setAttribute( "class", "yspmainmodule" );
var viewAllHref = location.href.match(/^(http\:\/\/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+)/i)[1] + '/tradingblock';
divTradingBlock.innerHTML = '<h4 class="ysptitlebar yspsplit"><span>Trading Block</span><em><a href="' + viewAllHref + '">View All</a></em></h4><br/><div style="color: #666680; font-style: italic; text-align: center">Retrieving trading block... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/></div>';

standings.parentNode.insertBefore( divTradingBlock, standings.nextSibling );

GM_xmlhttpRequest({
    method: 'GET',
    url: location.href.match( /^(http\:\/\/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+)/i )[1] + '/tradingblock',
    onload: getTradingBlockHandler( handleTradingBlock ),
    });

function handleTradingBlock( responseText )
{
    var tables = responseText.split( /\<table[^>]+\>|\<\/table\>/i );
    for ( var i = 0; i < tables.length; i++ )
    {
        if ( tables[ i ].match( /wanted/i ) )
        {
            divTradingBlock.innerHTML = '<h4 class="ysptitlebar yspsplit"><span>Trading Block</span><em><a href="' + viewAllHref + '">View All</a></em></h4>';
            divTradingBlock.innerHTML += '<table id="tradingblocktable" width="100%" border="0" cellspacing="0" cellpadding="0">' + tables[ i ] + '</table>';

            var table = document.getElementById( 'tradingblocktable' );
            table.style.borderBottom = table.style.borderLeft = table.style.borderRight = "solid 1px"
            var tradeInfoColumns = new Array();
            var displayedRows = 0;
            for ( var iRow = 0; iRow < table.rows.length; iRow++ )
            {
                var row = table.rows[ iRow ];
                var rowClass = getClassName( row );
                if ( /^thStyle/i.test( rowClass ) )
                {
                    for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                    {
                        var cell = row.cells[ iCell ];
                        tradeInfoColumns.push( /wanted|available/i.test( stripTags( cell.innerHTML ) ) );
                    }
                }
                else if ( /^row\d+/i.test( rowClass ) )
                {
                    var displayRow = false;
                    for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                    {
                        if ( tradeInfoColumns[ iCell ] )
                        {
                            var cell = row.cells[ iCell ];
                            if ( stripTags( cell.innerHTML ) != '' )
                            {
                                displayedRows += 1;
                                displayRow = true;
                                row.setAttribute( "class", ( (displayedRows % 2) == 1 ? 'row1' : 'row2' ) );
                                break;
                            }
                        }
                    }
                    if ( !displayRow )
                        row.style.display = 'none';
                }
            }
            if ( displayedRows == 0 )
            {
                var tr = document.createElement( 'TR' );
                var td = document.createElement( 'TD' );
                td.setAttribute( "colspan", table.rows[ 0 ].cells.length );
                td.style.padding = "1em 1em";
                td.style.textAlign = "center";
                td.innerHTML = "There is currently nothing on the trading block.";
                tr.appendChild( td );
                table.appendChild( tr );
            }
            return;
        }
    }
}

function getTradingBlockHandler( responseHandler )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText );
    }
}

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
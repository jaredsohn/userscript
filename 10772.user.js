// ==UserScript==
// @name           Yahoo Baseball Move Starter Totals
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasybaseball
// @description    Move starter totals between starters and benched/DL'd players
// @include        *baseball.fantasysports.yahoo.com*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 196 $
// $LastChangedDate: 2007-07-19 14:19:41 -0500 (Thu, 19 Jul 2007) $
// ==/UserScript==
/*
Updates:
    19-Jul-2007 - Fixed bug, made smarter

*/

(function(){

if ( !document.getElementById( 'statTable0' ) )
    return;

window.setTimeout( function() {

GM_addStyle( 'div#oldSum > * { display: none } div#oldSum { border-width: 0px }' );

for ( var iTable = 0; ; iTable++ )
{
    var table = document.getElementById( 'statTable' + iTable )
    if ( !table )
        break;

    var totalsColSpan = -1;

    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];
        var rowClass = row.getAttribute( "class" );

        if ( /(bn|dl)/i.test( row.cells[ 0 ].innerHTML ) )
        {
            addTotalsRow( table, row );
            break;
        }
    }
}

function addTotalsRow( table, beforeRow )
{
    var sumDiv = table.parentNode.lastChild;
    if ( sumDiv.tagName == 'DIV' && sumDiv.getAttribute( "class" ) == 'sum' )
    {
        var tr = document.createElement( 'tr' );
        tr.setAttribute( "class", "total" );
        beforeRow.parentNode.insertBefore( tr, beforeRow );
        tr.innerHTML = '<td colspan="' + beforeRow.cells.length + '" style="text-align: right">&nbsp;</td>';

        tr.cells[ 0 ].style.padding = "0px 0px";
        tr.cells[ 0 ].innerHTML = (new XMLSerializer).serializeToString(sumDiv);
        tr.cells[ 0 ].firstChild.setAttribute( "style", "font-size: 13px; top: 0px; margin: 0px 0px" );
        sumDiv.id = 'oldSum';
    }
}

}, 20 );

})();

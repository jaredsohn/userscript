// ==UserScript==
// @name           Yahoo Baseball Standings Point Differences
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasybaseball
// @description    Display point differences on standings table
// @include        *baseball.fantasysports.yahoo.com*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 305 $
// $LastChangedDate: 2007-09-12 11:05:25 -0500 (Wed, 12 Sep 2007) $
// ==/UserScript==
/*
	Updates:
	12-Sep-2007 - Removed 'ahead' column, it was redundant
*/
(function(){

var standingsTable = document.getElementById( 'standingstable' );
if ( !standingsTable )
    return;

Number.prototype.toFixedEx = function( places )
{
    if ( Math.abs( this - Math.round( this ) ) > 0 )
        return this.toFixed( places );
    else
        return this;
}

var decimal = 0;
for ( var iRow = 0; iRow < standingsTable.rows.length && decimal == 0; iRow++ )
{
    var row = standingsTable.rows[ iRow ];
    for ( var iCell = 0; iCell < row.cells.length && decimal == 0; iCell++ )
    {
        var cell = row.cells[ iCell ];
        if ( /^team/i.test( cell.getAttribute( "class" ) ) )
        {
            if ( /^td$/i.test( cell.tagName ) )
            {
                var pointsCell = cell.nextSibling.nextSibling;
                if ( pointsCell.innerHTML.indexOf( '.' ) != -1 )
                {
                    var decimal = pointsCell.innerHTML.length - pointsCell.innerHTML.indexOf( '.' ) - 1;
                    break;
                }
            }
        }
    }
}

var prevPoints = null;
var highPoints = null;
for ( var iRow = 0; iRow < standingsTable.rows.length; iRow++ )
{
    var row = standingsTable.rows[ iRow ];
    for ( var iCell = 0; iCell < row.cells.length; iCell++ )
    {
        var cell = row.cells[ iCell ];
        if ( /^team/i.test( cell.getAttribute( "class" ) ) )
        {
            if ( /^td$/i.test( cell.tagName ) )
            {
                var pointsCell = cell.nextSibling.nextSibling;
                var points = parseFloat( pointsCell.innerHTML );

                var td = document.createElement( cell.tagName );
                row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );
                if ( prevPoints == null )
                {
                    td.innerHTML = '-';
                    highPoints = points;
                }
                else
                {
                    td.innerHTML = ( points - highPoints ).toFixedEx( decimal );
                }

                var td = document.createElement( cell.tagName );
                row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );
                if ( prevPoints == null )
                {
                    td.innerHTML = '-';
                }
                else
                {
                    td.innerHTML = ( points - prevPoints ).toFixedEx( decimal );
                }

                var td = document.createElement( cell.tagName );
                //row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );
                if ( iRow == standingsTable.rows.length - 1 )
                {
                    td.innerHTML = '-';
                }
                else
                {
                    var nextPoints = parseFloat( row.nextSibling.nextSibling.cells[ pointsCell.cellIndex ].innerHTML );
                    td.innerHTML = ( points - nextPoints ).toFixedEx( decimal );
                }

                prevPoints = points;
            }
            else
            {
                var td = cell.nextSibling.nextSibling.nextSibling.nextSibling;
                td.innerHTML = 'Pts<br/>Change';

                var td = document.createElement( cell.tagName );
                td.innerHTML = 'Behind<br/>Leader';
                row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );

                var td = document.createElement( cell.tagName );
                td.innerHTML = 'Behind';
                row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );

                var td = document.createElement( cell.tagName );
                td.innerHTML = 'Ahead';
                //row.insertBefore( td, cell.nextSibling.nextSibling.nextSibling );
            }
            break;
        }
    }
}

GM_addStyle( 'table#standingstable th { line-height: 0.6em; padding-top: 0px; padding-bottom: 3px }' );

})();

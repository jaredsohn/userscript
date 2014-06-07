// ==UserScript==
// @name           Yahoo Fantasy Baseball Show Batting Average
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Show batting average in H/AB column if there is no AVG stat displayed.
// @include        *baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 84 $
// $LastChangedDate: 2007-05-29 13:58:28 -0500 (Tue, 29 May 2007) $
// ==/UserScript==
/*
   Updates:
   16-May-2007 - Fixed bug that was causing batting average to show up even for leagues where it is already displayed
   29-May-2007 - Changed include path to allow http://beta.
*/

(function() {

var statsTable = document.getElementById( 'statTable0' );
if ( statsTable == null )
    return;

var habCell = null;
var habIndex = -1;
for ( var iRow = 0; iRow < statsTable.rows.length; iRow++ )
{
    var row = statsTable.rows[ iRow ];
    var rowClass = getClassName( row );
    if ( /^headerRow1/i.test( rowClass ) )
    {
        for ( var iCell = 0; iCell < row.cells.length; iCell++ )
        {
            var cell = row.cells[ iCell ];
            var cellClass = getClassName( cell );
            if ( /^stat/i.test( cellClass ) )
            {
                var statCaption = stripTags( cell.innerHTML );
                if ( /^avg$/i.test( statCaption ) )
                {
                    return; // Already displaying average
                }
                else if ( /^h\/ab$/i.test( statCaption ) )
                {
                    habCell = cell;
                    habIndex = iCell;
                }
            }
        }
        if ( habCell == null )
            return; // H/AB not found

        var div = habCell.getElementsByTagName( 'DIV' );
        if ( div )
        {
            div = div[ 0 ];
            div.innerHTML += ', <span style="color: #000080">AVG</span>';
        }
    }
    else if ( /^(odd|even)/i.test( rowClass ) )
    {
        var cell = row.cells[ habIndex ];
        if ( /\d+\/\d+/.test( cell.innerHTML ) )
        {
            var avg = ( '' + parseFloat( eval( cell.innerHTML ) ).toFixed(3) ).replace( /0\./, '.' );
            cell.innerHTML = '<span style="color: #aaaaaa">' + cell.innerHTML + ',</span> <span style="color: #000080">' + avg + '</span>';
        }
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
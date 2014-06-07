// ==UserScript==
// @name           Yahoo Fantasy Baseball Username Remover
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Removes the username that was recently added in recent transactions on the league overview page.
// @include        *baseball.fantasysports.yahoo.com/*
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
/*
   Updates:
   29-May-2007 - Changed include path to allow http://beta.
*/

(function() {
    
var recentTrans = document.getElementById( 'recenttransactions' );
if ( recentTrans )
{
    var rows = recentTrans.getElementsByTagName( 'TR' );
    for ( var i = 0; i < rows.length; i++ )
    {
        var row = rows[ i ];
        row.removeChild( row.cells[ row.cells.length - 2 ] );
    }
}

})();
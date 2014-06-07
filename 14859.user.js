// ==UserScript==
// @name           Yahoo Fantasy Sort League Managers Table
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Allows sorting on the columns of the league managers table
// @include        http://*.fantasysports.yahoo.com/*/teams
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 356 $
// $LastChangedDate: 2007-11-27 09:24:14 -0600 (Tue, 27 Nov 2007) $
// ==/UserScript==
(function()
{

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

var table = document.evaluate( '//table[@class="teamtable"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( table.snapshotLength == 0 )
    return;
    
var tableScript = document.createElement('script');
tableScript.src  = 'http://yahoofantasybrowsertools.googlecode.com/svn/trunk/TableSorter/src/sorttable.js';
document.body.appendChild( tableScript );

table = table.snapshotItem( 0 );
    
var iLastActivityCol = -1;
var iSortCol = -1;
var rows = new Array();

var class = table.getAttribute( "class" );
if ( class == null || class == "" )
    class = "sortable";
else
    class += " sortable";
table.setAttribute( "class", class );

var headerBackground = document.defaultView.getComputedStyle(table.rows[ 0 ].cells[ 0 ], '').getPropertyValue("color");
var headerColor = document.defaultView.getComputedStyle(table.rows[ 0 ].cells[ 0 ], '').getPropertyValue("background-color");

GM_addStyle( '\
table.sortable thead { cursor: pointer; } \
table.sortable th.sorttable_sorted_reverse, table.sortable th.sorttable_sorted { background: ' + headerBackground + '; color: ' + headerColor + ' } \
div#gncSortNote { font-size: 75%; font-style: italic; text-align: right; padding-bottom: 2px } \
' );

for ( var iRow = 0; iRow < table.rows.length; iRow++ )
{
    var row = table.rows[ iRow ];
    if ( row.cells[ 0 ].tagName == 'TH' )
    {
        for ( var i = 0; i < row.cells.length; i++ )
        {
            if ( /last league activity/i.test( row.cells[ i ].innerHTML ) )
            {
                iLastActivityCol = i;
            }
            row.addEventListener( 'click', function(e) {
                recolorRows( table );
            }, false );
        }
    }
    else
    {
        // Wed Nov 21 10:48pm PST -> Nov 21, 2007 22:48
        var dt = new Date();
        var rawDate = row.cells[ iLastActivityCol ].innerHTML.stripTags().replace( 
                /\s*\D{3}\s+(.+)\s+(\d+:\d+)([ap]m)/i, 
                function( str, date, time, ampm, offset, s ) 
                { 
                    var ret = date + ', ' + ( new Date() ).getFullYear();
                    if ( /pm/i.test( ampm ) )
                    {
                        var hhmm = time.match( /(\d+):(\d+)/ );
                        var hh = parseInt( hhmm[ 1 ], 10 );
                        if ( hh < 12 )
                            time = ( hh + 12 ) + ':' + hhmm[ 2 ];
                    }
                    return ret + ' ' + time;
                } 
            );
        dt.setTime( Date.parse( rawDate ) );
        row.cells[ iLastActivityCol ].setAttribute( "sorttable_customkey", dt.getTime() );
    }
}

var divNote = document.createElement( 'div' );
divNote.id = 'gncSortNote';
divNote.innerHTML = 'Click column headers to sort';
table.parentNode.insertBefore( divNote, table );

function recolorRows( table )
{
    for ( var iRow = 0; iRow < table.rows.length; iRow++ )
    {
        var row = table.rows[ iRow ];
        if ( /^td$/i.test( row.cells[ 0 ].tagName ) )
        {
            row.setAttribute( "class", ( iRow % 2 == 0 ) ? 'even' : 'odd' );
        }
    }
}

})();
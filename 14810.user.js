// ==UserScript==
// @name           RtSeverityOrdering
// @version        0.05
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Order RT bugs by severity
// @include        http://rt.cpan.org/Public/Dist/Display.html*
// @include        http://rt.cpan.org/Dist/Display.html*
// ==/UserScript==
//
// Changes
// 0.05 - Dec 31, 2007
// * put duct-tape over the id=\nXXX behavior of RT
//
// 0.04 - Dec 8, 2007
// * clicking a second time gives a reverse ordering
//
// 0.03 - Nov 27, 2007
// * adding 'Critical' level
//
// 0.02 - Nov 26, 2007
// * removed GM_logs
//
// 0.01 - Nov 26, 2007
// * initial release

// first, let's fix those pesky \n in the href
var links = document.evaluate( "//a[@href]", document, 
                   null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                   null );

for ( var i = 0; i < links.snapshotLength; i++ ) {
    links.snapshotItem(i).href = 
        links.snapshotItem(i).href.replace( /id=\n/, "id=" );
}


var table = document.getElementsByTagName( 'table' )[0];
var rows = table.rows;
var header_row = rows[0];

var ordering = 1;  // 1 => normal ordering, -1 => reverse

if ( header_row.cells[3].innerHTML.match( /Severity/ ) ) {
        header_row.cells[3].innerHTML = 
            "<a id='orderSeverity' href='#dummy'>Severity</a>";
}

document.addEventListener( 'click', function( event ) {
    if( event.target.id != "orderSeverity" ) {
        return;
    }
    order_by_severity();
    ordering *= -1;
    event.stopPropagation();
    event.preventDefault();
}, true );

// --- utility functions ----------------------------------

function order_by_severity() {

    var data_rows = new Array;
    for( var i = 1; i < rows.length; i++ ) { data_rows.push( rows[i] ); } 

    data_rows.sort( by_severity );

    var data_rows_content = new Array();   
    for( var i = 0; i < data_rows.length; i++ ) {
        data_rows_content.push( data_rows[i].innerHTML );
    }

    for( var i = 1; i < rows.length; i++ ) { 
        rows[i].innerHTML = data_rows_content[i-1];
    } 

    return;
}

function by_severity( a, b ) {
    return ordering * ( severity_level( b ) - severity_level( a ) );
}

function severity_level( row ) {
    var severity = row.cells[3].innerHTML;

    // GM_log( severity );

    // GM_log( severity.match( /Important/ ) );

    return   severity.match( /Critical/    ) ?  5
           : severity.match( /Important/   ) ?  4
           : severity.match( /Normal/      ) ?  3
           : severity.match( /Unimportant/ ) ?  2
           : severity.match( /Wishlist/    ) ?  1 
           :                                    0
           ;
}


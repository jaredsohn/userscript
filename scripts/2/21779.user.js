// ==UserScript==
// @name           CPAN_Dependencies
// @version        0.01
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Display a distribution's dependencies
// @include        http://search.cpan.org/*
// ==/UserScript==
//
// Changes
// 0.01 - Jan 27, 2008
// * Initial release
//

var moduleName = document.getElementsByTagName( 'h1' )[0].innerHTML;

            // cut the version number
moduleName = moduleName.replace( /-[0-9._]+$/, "" );   
            // change - for ::
moduleName = moduleName.replace( /-/g, "::" );

GM_log( moduleName );

var dep_url = 'http://cpandeps.cantrell.org.uk/?module=' 
                + escape( moduleName );
var dep_url_xml = dep_url + ';' + "xml=1" ;


var tables = document.getElementsByTagName( 'table' );

tables[0].innerHTML = tables[0].innerHTML.replace( 
    /<tr>.*?<td>.*?CPAN Testers/, "<tr id='dependencies'></tr>$&" );

tables[0].innerHTML = tables[0].innerHTML.replace( 
    /<tr>\s*<td.*?>CPAN Testers/i, 
      "<tr><td class='label'>"
    + "<a href='" + dep_url + "'>Dependencies</a>" 
    + "</td>"
    + "<td class='cell' colspan='3' id='deps'>"
    + "<a id='deps_click' href='#dummy'>click to show dependencies</a>" 
    + "</td></tr>$&" );

var d = document.getElementById( "deps" );

document.addEventListener( 'click', function( event ) {
    if( event.target.id != "deps_click" ) {
        return;
    }

    d.innerHTML = "<i>retrieving dependencies...</i>"; 

    GM_xmlhttpRequest({ 
        method: "GET",
        url: dep_url_xml, 
        onload: function ( resp ) { mashupDeps( resp ) }
    });

    event.stopPropagation();
    event.preventDefault();
}, true );


function mashupDeps ( resp ) {
    var xml = (new DOMParser()).parseFromString(
                                    resp.responseText, 
                                    "text/xml" );

    var direct_deps = xml.evaluate( 
        "//dependency/module[../depth/text()=1]", xml, null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    var deps = new Array();

    for ( var i = 0; i < direct_deps.snapshotLength; i++ ) {
        var m = direct_deps.snapshotItem(i).textContent;
        var distname = m.replace( /::/g, "-" );
        var url = "http://search.cpan.org/dist/"
                + escape( distname ) ;
        deps.push( "<a href='" + url + "'>" + m + "</a>" ); 
    }

    var depTable = "<table><tr class='distfiles'>";

    for ( i in deps ) {
        var j = 0 + i;   // numify i ?
        if ( (j>0) && !( j % 4 ) ) {
            depTable += "</tr><tr>";
        }
        depTable += "<td style='padding-right: 5px; padding-left: 5px;'>" 
                  + deps[i] + "</td>";
    }
    
    depTable += "</tr></table>";

    d.innerHTML = depTable;
}




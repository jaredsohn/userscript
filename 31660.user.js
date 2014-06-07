// ==UserScript==
// @name           CPAN_Show_Repository
// @version        0.03
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/
// @description    Show the distro's repository, if given in Meta.yml
// @include        http://search.cpan.org/*
// ==/UserScript==
//
// Changes
// 0.03 - Aug 13, 2008
// * match on 'repository' in META.yml is now case-insensitive.
//
// 0.02 - Aug 12, 2008
// * Comment out the GM_log
//
// 0.01 - Aug 12, 2008
// * Initial release
//

for each ( a in document.getElementsByTagName( 'a' ) ) {
    if ( a.innerHTML == "META.yml" ) {
        GM_xmlhttpRequest({ 
            method: "GET",
            url: a.href,
            onload: function( resp ) {
               // GM_log( resp.responseText );
               var result = resp.responseText.match( 
                    /repository:\s+(\S+)/i
                ); 

                var repo = result[1];
                if ( repo ) {
                    add_summary_item(
                        "Repository",
                        "<a href='" + repo + "'>"
                            + repo + "</a>"
                    );
                }
            }
        });
        break;
    }
}

function add_summary_item ( title, content ) {

    var tables = document.getElementsByTagName( 'table' );

    tables[0].innerHTML = tables[0].innerHTML.replace( 
        /<tr>\s*<td.*?>CPAN Testers/i, 
        "<tr><td class='label'>"
        + title + "</td>"
        + "<td class='cell' colspan='3'>"
        + content
        + "</td></tr>$&" );
}

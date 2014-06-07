// ==UserScript==
// @name           Schwartz Factor
// @namespace      http://babyl.dyndns.org/schwartz_factor
// @include        http://search.cpan.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    Calculate the Schwartz Factor of a CPAN author
// ==/UserScript==

var tds = $('td.label');
for ( var i = 0; i < tds.length; i++ ) {
    if ( tds.eq(i).text() == 'CPAN Directory' ) {
        schwartz( tds.eq(i) );
        break;
    }
}

function schwartz( x ) {
    var anchor = x.siblings().find('a').eq(0);
    var author = anchor.text();
    var bits = author.match( /(.)(.)/ );

    var url = "http://search.cpan.org/CPAN/authors/id/" + bits[1] + "/" + bits[0] + "/" + author;

    GM_xmlhttpRequest({                                                                                               
        method: "GET",                                                                                                
        url: url,                                                                                                  
        onload: function( resp ) { 
            var anchors = $(resp.responseText).find('a');
            var dists = new Object();
            for ( var i = 0; i < anchors.length; i++ ) {
                var file = anchors.eq(i).text();
                var m = file.match( /^(.*)-v?[\d_.]+\.tar\.gz$/ );
                if ( m != undefined ) {
                    if ( dists[m[1]] == undefined ) {
                        dists[m[1]] = 0;
                    }
                    dists[m[1]] += 1;
                }
            }

            var nbr_dists = 0.0;
            var nbr_tarballs = 0.0;

            for each ( var i in dists ) {
                nbr_dists++;
                nbr_tarballs += i;
            }

            var factor = nbr_dists / nbr_tarballs;

            anchor.parent().append( '<a href="http://use.perl.org/~brian_d_foy/journal/8314">Schwartz Factor</a>: ' 
                    + factor );
        }
           });

}

// ==UserScript==
// @name           CPAN_Ohloh
// @version        0.01
// @author         Yanick Champoux <yanick+gm@babyl.dyndns.org>
// @namespace      http://babyl.dyndns.org/greasemonkey/cpan_ohloh
// @description    Display the distribution's Ohloh badges
// @include        http://search.cpan.org/*
// ==/UserScript==
//
// Changelog:
//
//  0.01 - April 23rd, 2008
//      * initial release

var x = document.evaluate( "//td[contains( text(), 'This Release' )]", 
                            document, 
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
                            null );

if ( x.snapshotLength == 1 ) {   // it's a distro page
    add_ohloh_badge( x.snapshotItem(0).nextSibling.nextSibling.innerHTML );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function add_ohloh_badge ( distname ) {
    
    // cut the version number and lowercase
    distname = distname.replace( /-[\d._]+$/, "" ).toLowerCase();

    var gravatar = document.getElementsByTagName( 'img' )[1];

    var ohloh_badge = generate_ohloh_badge( distname );

    var x = gravatar.parentNode.innerHTML;

    x = x.replace( /<img.*?>/, "$&" + "\n" + ohloh_badge );

    gravatar.parentNode.innerHTML = x;
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function generate_ohloh_badge ( distname ) {

    return   '<div style="float: right; display: none; clear: '
             + 'right; padding: 5px 2px;" '
             + 'id="ohlohBadge" '
             + '>'
             + "<a href=\'http://www.ohloh.net/projects/"
             +  distname
             + "?ref=WidgetProjectPartnerBadge\'>"
             + "<img alt='Ohloh report' "
             + "height=\'33\' "
             + "onLoad='document.getElementById( \"ohlohBadge\").style.display = \"block\"' "
             + "src=\'http://www.ohloh.net/projects/"
             + distname
             + "/widgets/project_partner_badge.gif\' width=\'193\' />"
             + "</a>"
             + "</div>"
             ;

}

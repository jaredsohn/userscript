// ==UserScript==
// @name           MetaFilter Why Favorited
// @namespace      http://plutor.org/
// @description    Adds "why?" links to old stuff in Recent Favorites that were newly favorited. Links to a search for the URL, which will hopefully show you a link from another comment.
// @include        http://metafilter.com/contribute/activity/recentfavorites
// @include        http://*.metafilter.com/contribute/activity/recentfavorites
// ==/UserScript==
//

//
// mst_init
//
// Determines if this is a thread or not, and sets everything up
//
function mwf_init() {
    var allspans = document.getElementsByTagName('span');
    for (var i=0; i<allspans.length; ++i) {
        var thisspan = allspans[i];
        var m = thisspan.innerHTML.match(/favorited (\d+) times/);
        if (m && m.length > 1) {
            // This is a favorited thing
            var favecount = parseInt(m[1]);
            var names = thisspan.innerHTML.match(/<a href="/g);
            if (names != null && names.length > 1) {
                var namecount = names.length - 1; // The first link isn't to a name
                if (namecount < favecount) {
                    // Add the why? link
                    // Find the most-recent previous "more" link
                    var prevsib = thisspan;
                    while (prevsib && prevsib.tagName != 'a' && !prevsib.href) {
                        prevsib = prevsib.previousSibling;
                    }
                    if (prevsib && prevsib.href) {
                        var bits = prevsib.href.match(/^http:\/\/(www\.)?([^\/]*)\/(\d+)\/([^#]*)\/?#?(\d*)/);
                        thisspan.innerHTML += " ("
                                            + "<a href=\"http://www.metafilter.com/contribute/search.mefi?q="
                                            + bits[2] + "+" + bits[3] + "+" + bits[5] + "\">"
                                            + "why?"
                                            + "</a>)";
                    }
                }
            }
        }
    }
}

mwf_init();


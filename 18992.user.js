// ==UserScript==
// @name           MetaFilter Thread Highlights
// @namespace      http://plutor.org/
// @description    Adds tabs to comment listings on MetaFilter: "All comments", and "Favorited comments"
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// DONE 2009-10-19
// * Use jQuery
// * Fix
//
// TODO
// * Allow to change threshold

// Any comment with at least MINIMUMFAVORITES favorites will be displayed
// under the "Favorite comments" tab.
var MINIMUMFAVORITES = 5;

var tabset;

function mfc_init() {
    var styleprefix = 'mefi';

    var url = location.href.toLowerCase();
    var styleprefix = url.match(/^https?:\/\/([^\/]*\.)?metafilter.com/);

    styleprefix = styleprefix[1];
    if (mfc_use_plain_theme()) {
        styleprefix = "white";
    } else if (styleprefix == "metatalk." || styleprefix == 'podcast.') {
        styleprefix = "meta";
    } else if (styleprefix == "ask.") {
        styleprefix = "ask";
    } else if (styleprefix == "music.") {
        styleprefix = "mefi"; // No tabs stylesheet for music?
    } else {
        styleprefix = "mefi";
    }

    url = url.replace(/^https?:\/\/([^\/]*\.)?metafilter.com/, '');
    if (url.match(/^\/(\d+)/))
        mfc_init_thread(styleprefix);
}

function mfc_use_plain_theme() {
    var cookie = document.cookie.toString();
    var i = cookie.indexOf("THEME");
    if (i == -1) {
        return false;
    } else {
        var j = cookie.indexOf(';',i);
        if (j == -1) j=cookie.length;
        return (unescape(cookie.substring(i+6,j)) == 2);
    }
}

function mfc_init_thread(styleprefix) {
    // Find the comments section and add the tabs
    var post = $("div.copy").eq(0);
    if (!post || post.length < 1) return;

    // Add the tabs css
    $("head").append(
        '<link rel="stylesheet" type="text/css" ' +
        'href="http://styles.metafilter.com/mefi/tabs-' + styleprefix + '.css"></link>'
    );

    // Add the tabs right after the comments section
    var tabset = $( '<ul id="maintab"></ul>' )
        .addClass('shadetabs')
        .css({
            "text-align": "left",
            "margin": "10px 60px 0 60px",
            "padding-left": "10px"
        });

    $( '<li></li>' )
        .addClass('selected')
        .css({
            "cursor": "pointer"
        })
        .appendTo(tabset)
        .append( '<a>All comments</a>' )
        .find("a").click( mfc_show_all );

    $( '<li></li>' )
        .css({
            "cursor": "pointer"
        })
        .appendTo(tabset)
        .append( '<a>Favorite comments (&ge;' + MINIMUMFAVORITES + ')</a>' )
        .find("a").click( mfc_show_favorites );

    tabset.insertBefore( post.next() );
}

function mfc_show_favorites() {
    // Do it
    $("div.comments[id!=prevDiv][id!=prevDiv2]").each( function(i) {
        var comment = $(this);

        // Change all of the trailing brs into margin
        var br = comment.next();
        while (br.is("br")) {
            var toremove = br;
            br = br.next();
            toremove.remove();
        }
        comment.css('margin-bottom', '2em');

        // Find the metadata
        comment.find("span.smallcopy:contains('posted by')").eq(0).each( function(j) {
            var matches = $(this).html().match(/(\d+) favorites?/);
            if (matches && matches.length > 1 &&
                parseInt(matches[1]) >= MINIMUMFAVORITES) {
            } else {
                comment.hide();
            }
        } );
    } );

    // Update the tabs
    $("#maintab li:contains('All comments')").removeClass('selected');
    $("#maintab li:contains('Favorite comments')").addClass('selected');
}

function mfc_show_all() {
    // Do it
    $("div.comments[id!=prevDiv][id!=prevDiv2]").each( function(i) {
        $(this).show();
    } );

    // Update the tabs
    $("#maintab li:contains('All comments')").addClass('selected');
    $("#maintab li:contains('Favorite comments')").removeClass('selected');
}

mfc_init();


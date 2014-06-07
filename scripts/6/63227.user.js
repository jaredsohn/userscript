// ==UserScript==
// @name           MetaFilter Fuzzy Hearts
// @namespace      http://userscripts.org/
// @description    Change "nn favorites" on Metafilter to other stuff
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// "Liked" is at least 1 favorite
// "Loved" is at least this many favorites
var LOVED_THRESHOLD = 10;
// If there is more than 1 "loved" comment in a thread, the max one is "best"
// created by Plutor and tampered with by jessamyn

function mfc_init() {
    var url = location.href.toLowerCase();
    url = url.replace(/^https?:\/\/([^\/]*\.)?metafilter.com/, '');
    if (url.match(/^\/(\d+)/))
        mfc_init_thread();
}

function mfc_init_thread() {
    var mostloved;
    var mostlovedfaves = 0;
    var numloved = 0;

    // Do it
    // Find the metadata
    $("div.comments[id!=prevDiv][id!=prevDiv2] span.smallcopy:contains('posted by')")
        .each( function(i) {
            var text;
            var matches = $(this).html().match(/(\d+) favorites?/);

            if (matches && matches.length > 1) {
                var faves = parseInt(matches[1]);

                if (faves > LOVED_THRESHOLD) {
                    text = '<span title="' + faves
                         + ' favorite' + (faves != 1 ? "s" : "")
                         + '" class="favorites-count">&lt;3</span>';

                    numloved++;
                    if (faves > mostlovedfaves) {
                        mostloved = $(this);
                        mostlovedfaves = faves;
                    }
                } else if (faves > 0) {
                    text = '<span title="' + faves
                         + ' favorite' + (faves != 1 ? "s" : "")
                         + '"class="favorites-count">*</span>';
                }
            }

            if (text != undefined)
                $(this).html(
                    $(this).html().replace(/(\d+ favorites?)/, text)
                );
        } );

    if (numloved >= 2 && mostloved.length > 0) {
        mostloved.find(".favorites-count").html("<strong>&hearts;</strong>");
    }

    GM_log("numloved = " + numloved);
}

mfc_init();

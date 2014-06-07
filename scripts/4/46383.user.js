// ==UserScript==
// @name           MetaFilter Alphabet Thread Helper
// @namespace      http://plutor.org/
// @description    Detects and assists with MetaFilter alphabet threads
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// // ==/UserScript==

// DONE - 2009-04-14
// * Use percentage matching instead of fixed numbers

// At least matchperc% of the last $min..$maxchecknum or more deltas must be the same
var matchperc = 0.666;
var minchecknum = 10;
var maxchecknum = 50;

/* ======================================================================== */

function firstletterof(metadata) {
    var comment = metadata.parent();
    var content;

    content = new String(comment.html());
    content = content.replace(/<br>/ig, '');
    // Remove the trailing metadata
    content = content.slice(0,
                        content.lastIndexOf('<span class="smallcopy">posted by'));
    // Remove the player from music
    content = content.slice(0,
                        content.lastIndexOf('<object '));
    // Remove the more inside junk
    content = content.replace(/<\/?div[^>]*>/g, '');
    content = content.replace(/^[ \t\n]*/, '');
    content = content.replace(/[ \t\n]*$/, '');

    // Remove all remaining HTML
    content = content.replace(/<[^>]*>/g, '');
    // Remove all non-letters
    content = content.replace(/[^a-z]/gi, '');

    return content.substr(0, 1).toUpperCase();
}

function init_alphabet_thread(lastletter, step) {
    var letter = lastletter.charCodeAt(0) + step;
    letter = (letter - 65) % 26 + 65; // normalize
    letter = String.fromCharCode(letter);

    $("textarea#comment").text( letter );

    $("#commentform").prepend(
        '<p class="reason" style="padding: 0.2em; font-size: 120%">' +
        'This is an alphabet thread!  The next letter is: ' +
        '<strong>' + letter + '</strong></p>'
    );
}

/* ======================================================================== */

function xescape(str) {
    return str.replace(/"/g, '&quot;');
}

/* ======================================================================== */

function init_thread() {
    var commenttextarea = $("#comment");
    if (commenttextarea.length < 1) return;

    var steps = new Object();
    var prevletter;
    var lastletter;

    var comments = $('span.smallcopy:contains("posted by")');
    for (var i = comments.length-1; i >= 0; --i) {
        var curr = comments.eq(i);
        if (curr.parents('#prevDiv2, form').length == 0) {
            // curr is a metadata span
            var letter = firstletterof(curr);
            if (!lastletter) lastletter = letter;

            if (prevletter) {
                var diff = prevletter.charCodeAt(0) - letter.charCodeAt(0);
                if (diff > 13) diff -= 13;
                if (diff < -13) diff += 13;

                if (!steps[diff]) steps[diff] = 1
                else              steps[diff] ++;
                if (!steps.TOTAL) steps.TOTAL = 1;
                else              steps.TOTAL ++;
            }

            if (steps.TOTAL >= minchecknum) {
                // If at least matchperc% of the steps are the same
                // then this is an alphabet thread and we should help!
                var matchnum = Math.floor(steps.TOTAL * matchperc);
                for (var j in steps) {
                    if (j != "TOTAL" && steps[j] >= matchnum) {
                        // Yes!
                        init_alphabet_thread(lastletter, new Number(j));
                        return;
                    }
                }
            }

            prevletter = letter;
            if (steps.TOTAL >= maxchecknum) break;
        }
    }
}

function init() {
    var url = location.pathname;

    if (url.match(/^\/(\d+)/)) {
        init_thread();
    }
}

$(init);

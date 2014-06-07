// ==UserScript==
// @name            Fanfiction.net, clear the "Follow" checkboxes by default.
// @namespace       Fanfiction_net
// @description     Unchecks the "Follow Author" and "Follow Story" checkboxes, which FFN sets by default!
// @match           http://*.fanfiction.net/s/*
// @match           https://*.fanfiction.net/s/*
// ==/UserScript==

function ClearAnnoyingCheckboxes ($) {
    $("#q_follow_author")   .prop ("checked", false);
    $("#q_follow_story")    .prop ("checked", false);
    $("#review_authoralert").prop ("checked", false);
    $("#review_storyalert") .prop ("checked", false);
}

withPages_jQuery (ClearAnnoyingCheckboxes);

function withPages_jQuery (NAMED_FunctionToRun) {
    //--- Use named functions for clarity and debugging...
    var funcText        = NAMED_FunctionToRun.toString ();
    var funcName        = funcText.replace (/^function\s+(\w+)\s*\((.|\n|\r)+$/, "$1");
    var script          = document.createElement ("script");
    script.textContent  = funcText + "\n\n";
    script.textContent += 'jQuery(document).ready( function () {' + funcName + '(jQuery);} );';
    document.body.appendChild (script);
};

// ==UserScript==
// @name            Add Clear Button on CiNii
// @namespace       http://penguinlab.jp/
// @include         http://ci.nii.ac.jp/*
// ==/UserScript==

(function () {
    // set up jQuery variable
    var $, GM_JQ, checker, letsJQuery;

    // Add jQuery
    GM_JQ = document.createElement("script");
    GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
    GM_JQ.type = "text/javascript";

    document.body.appendChild(GM_JQ);

    // Check if jQuery's loaded
    checker = setInterval(function () {
        if (typeof ($ = unsafeWindow.jQuery) !== "undefined") {
            clearInterval(checker);
            letsJQuery();
        }
    }, 100);

    // All your GM code must be inside this function
    letsJQuery = function () {
        $('#art_srchbtn_adv').after('<input type="button" id="art_clrbtn_adv" value="クリア" />');
        $('#art_clrbtn_adv').click(function () {
            $("#searchform input[type='text']").val('');
            $("#filter_all_advanced").attr('checked', 'checked');
        });
    };
}());
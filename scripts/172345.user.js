// ==UserScript==
// @name            Ck101 - Auto Thank for Extra Content
// @namespace       http://tsai.it/project/gmscripts/ck101-auto-thank-for-extra-content/
// @version         0.2
// @description     Some articles on Ck101 hide the extra content and you have to "Thank" the author to get it. This script will automatically "Thank the author" at the first loading.
// @match           http://ck101.com/*
// @grant           unsafeWindow
// @copyright       2013+, I-Ta Tsai (http://tsai.it/)
// ==/UserScript==

// Use pre-loaded jQuery by ck101.
var $ = unsafeWindow.jQuery;

$( document ).ready(function() {
    if ($('.lockThankBtn').length) {
        $('#post_thank').click();

        var intervalId = setInterval(function() {
            if ($('#postform').length) {
                $('#postsubmit').click();
                clearInterval(intervalId);
            }
        }, 500);
    }
});
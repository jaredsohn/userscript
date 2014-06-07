// ==UserScript==
// @name        mTurk - Highlight Masters
// @namespace   thisisnotavalidnamespace
// @include	https://www.mturk.com/mturk/sortsearchbar*
// @include	https://www.mturk.com/mturk/searchbar*
// @include	https://www.mturk.com/mturk/viewsearchbar*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
$().ready(function() {
    $("td:Contains('Masters')").each(function(index) {
        if ($(this).next().next().is(":Contains('You meet this qualification requirement')")) {
            $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent()
//            .find("[bgcolor*='CCDDE9']").css('background-color', 'FFE0E0');
            .find("[bgcolor*='CCDDE9']").find("a").css('color', '8B0000');
        }
    });
});
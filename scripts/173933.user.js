// ==UserScript==
// @name            Reload captcha on Funnyjunk
// @namespace       FYXY
// @description     Press R to reload captcha
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *funnyjunk.com/*
// @version         1.0
// ==/UserScript==

$(document).on('keyup', function(e) {
    key = e.which;
    if (e.which == 82) {
        $(".captcha_reload").click();
    }
});
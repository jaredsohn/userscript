// ==UserScript==
// @name Songza hotkeys
// @description Adds keyboard shortcuts to Songza
// @namespace http://www.brandonpugh.com/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include http://songza.com/*
// ==/UserScript==
$(document).ready(function () {
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        switch (code) {
            case 32: //'space' key
                var $pauseBtn = $('.szi-pause-button');
                if ($pauseBtn.is(":visible")) {
                    $pauseBtn.click();
                }
                else {
                    $('.szi-play-button').click();
                }
                break;
            case 39: //right arrow key
                $('.szi-skip-button').click();
                break;
        }
        e.preventDefault();
    });
});


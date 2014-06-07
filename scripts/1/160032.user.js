// ==UserScript==
// @name        4fuckr Cleaner
// @author      Whoknowsit
// @namespace   http://www.elitepvpers.com
// @description Makes advertising images unclickable
// @version     1.0.0
// @run-at      document-end
// @grant       none
//
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js
//
// @include     /^https?://(www\.)?4fuckr.com/?$/
// @include     /^https?://(www\.)?4fuckr.com/page_([0-9]+)\.htm/
// ==/UserScript==

(function ($) {
    var box = '',
        bg = '',
        i;

    for (i = 0; i < 4; i += 1) {
        box = $('.box' + i);

        $(box).each(function () {
            bg = $(this).css('background-image').replace('url("', '').replace('")', '');

            if (bg.split('/')[4] !== 'video' && bg.split('/')[6] === undefined && $(this).html() !== '') {
                $(this).css({
                    opacity: 0.1
                });

                $(this).hover(
                    function () {
                        $(this).stop().animate({
                            opacity: 1.0
                        }, 800);
                    },
                    function () {
                        $(this).stop().animate({
                            opacity: 0.1
                        }, 800);
                    }
                );

                $(this).children('a').removeAttr('rel').attr('onclick', 'return false').html(function () {
                    $(this).children('img').attr('title', 'Blocked advertisement');
                });
            }
        });
    }
}(jQuery));
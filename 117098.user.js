// ==UserScript==
// @name                        instapaper_num
// @namespace              		instapaper_num
// @version                     1.3.2
// @author                      Mescoda on http://mescoda.com/
// @description              	Help showing the number of unread items on instapaper.com
// @include                     http://www.instapaper.com/*
// @include                     https://www.instapaper.com/*
// @reason						add archive all function
// @require                     //ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant                       GM_xmlhttpRequest
// ==/UserScript==

$(function() {
    var num = $('#article_list .article_item').length;
    $('#unread_nav span')[0].nextSibling.nodeValue += ' ('+num+')';
    $('<a class="top_button" id="m-archive-all">A-A</a>').appendTo($('.page_header .left'));
    $('#m-archive-all').click(function(e) {
        e.preventDefault();
        $('.action_link.archive_button').trigger('click');
    });
});
// ==UserScript==
// @name           HideFacebookNewsFeed
// @description    Saves you time by hiding Facebook news feed.
// @include        *://*.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/*
 * Author : Swapnil Agarwal
 */

 function blockAndDisplay() {
    var feed = $('[id^=topnews_main_stream], [id^=mostrecent_main_stream], [id^=pagelet_home_stream]');
    var message = $('#distracted');

    if (feed.length == 0) {
        message.remove();
    } else if (message.length == 0) {
        message = $('<h1>')
            .attr('id', 'distracted')
            .text("Don't get distracted by Facebook!")
            .css('font-size', '30px')
            .css('font-family', "'Helvetica Neue', Helvetica, Arial, 'lucida grande', tahoma, verdana, arial, sans-serif")
            .css('position', 'relative')
            .css('top', '75px');
        $('[data-location=maincolumn]').append(message);
     }

    feed.children().remove();
    $('.ticker_stream').remove();
}

function repeatFunction(func, delay) {
    func();
    setTimeout(function() {
        repeatFunction(func, delay);
    }, delay);
}

repeatFunction(blockAndDisplay, 100);
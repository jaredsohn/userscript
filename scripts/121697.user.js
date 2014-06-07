// ==UserScript==

// @name           noGag
// @description    Hides all tweets/statuses with links to 9gag in your twitter timeline and facebook news feed.
// @version        0.2
// @namespace      http://twitter.com/#!/davidmh

// @include        http*://twitter.com/
// @include        http*://www.facebook.com/*

// ==/UserScript==

var s = document.createElement('script');
s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
document.body.appendChild(s);
s.onload = function () {

    var containers = '#stream-items-id,#home_stream',
        items = '#stream-items-id div.js-stream-item,#home_stream li.uiStreamStory',
        seek = function (e) {
            $(containers).find("a[data-ultimate-url*=9gag],a[data-expanded-url*=9gag],a[href*=9gag]").parents(items).fadeOut('fast', function () {
                $(this).remove();
            });
            if (e) {
                e.stopPropagation();
            }
        };

    $(function () {
        seek();
        $(containers).bind('DOMNodeInserted', seek);
    });

};
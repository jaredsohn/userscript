// ==UserScript==
// @name        Better Tumblr tag scrolling
// @namespace   http://www.tumblr.com/
// @description Don't navigate to tag pages while dragging / scrolling through tags.
// @include     http://www.tumblr.com/*
// ==/UserScript==

function tagscroll($) {
    $('.tag').mousedown(function(e) {
        var tag = $(this);
        tag.data('left', tag.closest('.tags').css('left'));
    });
    $('.tag').click(function(e) {
        var tag = $(this);
        if (tag.data('left') != tag.closest('.tags').css('left')) {
            return false;
        }
    });
}

// http://stackoverflow.com/questions/11093759
if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = (function() {
        var dummyElem = document.createElement('p');
        dummyElem.setAttribute('onclick', 'return window;');
        return dummyElem.onclick();
    })();
}

check = setInterval(function() {
    if ('jQuery' in unsafeWindow) {
        clearInterval(check);
        tagscroll(unsafeWindow.jQuery);
    }
}, 500);

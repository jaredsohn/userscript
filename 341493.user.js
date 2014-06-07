// ==UserScript==
// @name        Hide Announcements
// @namespace   gaiarch_v3
// @include     http://www.gaiaonline.com/*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
(function () {
    var notifyBubble = $('#notifyBubbleContainer');
    var listItem = notifyBubble.find('li');
    if (listItem.length != 0) {
        $.each(listItem, function (idx, li) {
            if (li.classList.contains('notify_announcements')) {
                li.remove();
                listItem = notifyBubble.find('li');
                if (listItem.length == 0) {
                    notifyBubble.remove()
                }
            }
        })
    }
}())
// ==UserScript==
// @name       YouTube.com Default to Uploads
// @namespace  http://www.twitter.com/robtaylor84
// @version    0.2
// @description  This sets links in the YouTube sidebar to go to upload only pages by default.
// @match      *youtube.com/*
// @copyright  2012+, Rob Taylor
// ==/UserScript==
(function () {
    var guideItems = document.getElementById('guide-channels').getElementsByClassName('guide-item'),
        len = guideItems.length,
        i = 0;
    for (; i < len; ++i) {
        guideItems[i].setAttribute('href', guideItems[i].getAttribute('href') + '/u');
    }
    
    guideItems = document.getElementById('guide-main').getElementsByClassName('guide-system-feeds')[0].getElementsByClassName('guide-item');
    guideItems[1].setAttribute('href', guideItems[1].getAttribute('href') + '/u');
}());
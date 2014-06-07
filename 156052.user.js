// ==UserScript==
// @name useful youtube homepage
// @version 9/11
// @description redirect to feed/subscripts/u
// ==/UserScript==

setTimeout(yolo, 5)

function yolo() {
    if (window.location.href.match('youtube.com/$')) {
        sleep(5);
        window.location.href = 'https://www.youtube.com/feed/subscriptions/u';
    }
}
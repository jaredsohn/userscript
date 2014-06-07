// ==UserScript==
// @name       No Reply Girl
// @namespace  http://softwarebakery.com/frozencow/
// @version    0.1
// @description  Removes annoying related videos in YouTube.
// @match      http://*.youtube.com/*
// @copyright  2012+, FrozenCow
// ==/UserScript==

var blocked_users = ['TheReplyGirl','TheBestFailsDaily','TheReplyTeen'];
var blocked = {};
blocked_users.forEach(function(v) {
    blocked[v] = true;
});

var rs = Array.prototype.slice.call(document.getElementsByClassName('video-list-item'), 0);
for(var i=0;i<rs.length;i++) {
    var e = rs[i];
    var us = e.getElementsByClassName('yt-user-name');
    if (us.length > 0) {
        if (blocked[us[0].textContent]) {
            e.parentNode.removeChild(e);
        }
    }
}
// ==UserScript==
// @name        Twitter Dock Badge
// @namespace   http://fluidapp.com
// @description Display unread count for Twitter
// @include     http://twitter.com
// @include     http://twitter.com/*
// @author      Link Dupont
// ==/UserScript==

(function () {
    if(window.fluid) {
        updateBadge();
        var intervalID = window.setInterval(updateBadge,1000);
    }
})();

function updateBadge() {
    var numberOfUnread = document.getElementById("page_title").innerText.match(/\d+/);
    if (numberOfUnread && numberOfUnread[0] > 0) {
        window.fluid.dockBadge = numberOfUnread[0];
    } else {
        window.fluid.dockBadge = "";
    }
}
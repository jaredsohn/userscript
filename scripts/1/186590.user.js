// ==UserScript==
// @name        Hide Watched Youtube Videos
// @namespace   http://userscripts.org/users/61307
// @description Hide the watched videos on the feed page, simple.
// @author      Noam Karavany
// @include     http*.youtube.*/feed/subscriptions
// @version     3.1415.2
// @grant       none
// ==/UserScript==

delay = 1000; //The time to wait between checks for new videos on page in milliseconds

function HideWatched(pageindex) {
    var nodes = document.getElementsByClassName("feed-list")[pageindex];
    nodes = nodes.getElementsByClassName("feed-item-container  legacy-style vve-check");

    for (index = 0; index < nodes.length; ++index) {
        var node = nodes[index];
        var tohide = nodes[index];
        node = node.getElementsByClassName("feed-item-dismissable post-item ")[0];
        node = node.getElementsByClassName("feed-item-main")[0];
        node = node.getElementsByClassName("feed-item-main-content")[0];
        node = node.getElementsByTagName("div")[0];
        node = node.getElementsByTagName("div")[0];
        node = node.getElementsByTagName("a")[0];
        node = node.getElementsByClassName("watched-badge")[0];

        if (typeof node !== 'undefined') {
            tohide.style.display = 'none';
            //tohide.parentElement.removeChild(tohide);
        }
    }
}

setInterval(function () {HideWatched(0);}, delay);
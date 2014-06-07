// ==UserScript==
// @name       YouTube.com Logo to My Subscriptions
// @namespace  http://www.twitter.com/robtaylor84
// @version    0.1
// @description  Sets the YouTube logo in the top left corner to go to the "My Subscriptions" feed, rather than "What to Watch".
// @match      *youtube.com/*
// @copyright  2012+, Rob Taylor
// ==/UserScript==
(function () {
    document.getElementById('logo-container').href = '/feed/subscriptions/u';
}());

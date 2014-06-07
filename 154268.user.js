// ==UserScript==
// @name YouTube Subscription Google Bar Link
// @author Matt Eckert
// @description Makes the top Google bar YouTube link lead directly to your subscriptions page.
// @include http*://*.google.com/*
// ==/UserScript==

window.addEventListener('load', fixYoutubeLink, false)

function fixYoutubeLink() {
    document.getElementById('gb_36').setAttribute('href', 'https://www.youtube.com/feed/subscriptions');
}

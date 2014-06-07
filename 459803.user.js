// ==UserScript==
// @name        NoMoreSlashR
// @namespace   http://trulz.ca
// @include     https://pay.reddit.com/*
// @include     http://reddit.com/*
// @version     2
// @grant       none
// ==/UserScript==

function doClean() {
    $(".subreddit").each(function() {$(this).text($(this).text().replace("/r/",""))});
    $(".trending-subreddits").hide();
}
window.addEventListener('neverEndingLoad', function() {
    doClean();
});

$(doClean);
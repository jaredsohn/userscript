// ==UserScript==
// @name        AnimeTake: Mark Already Watched
// @namespace   http://userscripts.org/users/lordppm
// @include     http://www.animetake.com/*
// @version     1
// @grant       none
// ==/UserScript==

var alreadyWatchedAnimes = [];
if (localStorage["AlreadyDownloadedAnimes"] != undefined) {
    alreadyWatchedAnimes = JSON.parse(localStorage["AlreadyDownloadedAnimes"]);
}

$('.updateinfo h4 a').click(function () {
    var $animeLink = $(this);
    var animeTitle = $animeLink.attr('title');
    if (alreadyWatchedAnimes.indexOf(animeTitle) == -1) {
        alreadyWatchedAnimes.push(animeTitle);
        localStorage["AlreadyDownloadedAnimes"] = JSON.stringify(alreadyWatchedAnimes);
        $animeLink.html('<del style="color: grey">' + animeTitle + '</del>');
        //console.log(localStorage["AlreadyDownloadedAnimes"]);
    }
});


$('.updateinfo h4 a').each(function () {
    var $animeLink = $(this);
    var animeTitle = $animeLink.attr('title');
    $animeLink.attr('target', '_blank');
    if(typeof(Storage)!== "undefined" && localStorage["AlreadyDownloadedAnimes"] != undefined && 

alreadyWatchedAnimes.indexOf(animeTitle) > 0) {
        $animeLink.html('<del style="color: grey">' + animeTitle + '</del>');
    }
});


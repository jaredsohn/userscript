// ==UserScript==
// @name           Yahoo! Auction image only
// @description    The search result of Yahoo!Auction is made an image.
// @include        http://list*.auctions.yahoo.co.jp/*
// @include        http://openuser.auctions.yahoo.co.jp/*
// @include        http://search*.auctions.yahoo.co.jp/*
// @include        http://storeuser*.auctions.yahoo.co.jp/*
// @exclude        http://*.auctions.yahoo.co.jp/*category.html
// @exclude        http://*.auctions.yahoo.co.jp/*mode=1*
// ==/UserScript==
(function () {
    var url = window.location.href;

    function urlCheck(keyword) {
        return url.indexOf(keyword);
    }

    if (urlCheck('mode=') != -1) {
        url = url.replace(/mode=[02]/, 'mode=1');
        window.location.href = url;
    } else if (urlCheck('/search') != -1) {
        url += '&mode=1';
        window.location.href = url;
    } else {
        url += '?mode=1';
        window.location.href = url;
    }
})();

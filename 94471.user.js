// ==UserScript==
// @name           meters_show_numbers_of_nice_stars
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    読書メーター、鑑賞メーター、ゲームメーターでナイスした人の数を表示します。
// @include        http://book.akahoshitakuya.com/*
// @include        http://video.akahoshitakuya.com/*
// @include        http://gamemeter.net/*
// ==/UserScript==
(function () {
    var niceStarLists = document.getElementsByClassName('nice_star_list');
    if (!niceStarLists.length) {
        return;
    }
    var span = document.createElement('span');
    span.style.color = 'orange';
    var countStars = function (niceStarLists) {
        for (var i = -1, list; list = niceStarLists[++i]; ) {
            var count = list.childNodes.length;
            var s = span.cloneNode(true);
            s.innerHTML = '(' + count + ')';
            list.parentNode.insertBefore(s, list.nextSibling);
        }
    }
    document.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
        countStars(e.target.getElementsByClassName('nice_star_list'));
    }, false);
    countStars(niceStarLists);
})();

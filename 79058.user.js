// ==UserScript==
// @name           color_tweets_on_favstar
// @version        1.1.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Color each tweets on Favstar like Favotter. / Favstarをふぁぼったー風に色付けします。
// @include        http://favstar.fm/*
// @include        http://de.favstar.fm/*
// @include        http://es.favstar.fm/*
// @include        http://ja.favstar.fm/*
// ==/UserScript==
(function () {
    var favCounts = document.getElementsByClassName('favCount');
    for (var i = -1, favCount; favCount = favCounts[++i]; ) {
        var c = favCount.title.split(' ')[0];
        var theTweet = favCount.parentNode.parentNode.parentNode.getElementsByClassName('theTweet')[0];
        with(theTweet.style) {
            color = c > 4 ? '#EE0000' : c > 2 ? '#550099' : c > 1 ? '#008800' : '#000000';
            fontWeight = c > 1 ? '600' : '400';
            // もの足りない人は↓をコメントアウト
            // fontSize = (c > 9 ? 8 : c > 4 ? 7 : c > 3 ? 6 : c > 2 ? 5 : c > 1 ? 3 : 0) + 18 + 'px';
        }
    }
})();

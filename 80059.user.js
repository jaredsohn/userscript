// ==UserScript==
// @name           fix_favstar_links_on_tweets
// @version        1.0.2
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Fix incorrect links on tweets on favstar. / favstarで変になってるツイートのリンクを修正します。
// @include        http://favstar.fm/*
// @include        http://ja.favstar.fm/*
// @include        http://de.favstar.fm/*
// ==/UserScript==
(function () {
    var tt = document.getElementsByClassName('theTweet');
    for (var i = 0; i < tt.length; i++) {
        var links = tt[i].getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) {
            var txt = links[j].textContent;
            if (!txt.indexOf('@')) {
                continue;
            }
            var lidx = txt.indexOf('http://');
            if (lidx == -1) {
                lidx = txt.indexOf('https://');
            }
            links[j].href = links[j].textContent = txt.slice(lidx);
            links[j].parentNode.insertBefore(document.createTextNode(txt.slice(0, lidx)), links[j]);
        }
    }
})();

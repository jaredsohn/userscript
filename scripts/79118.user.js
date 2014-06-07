// ==UserScript==
// @name           find_tweets_on_twilog
// @version        1.1.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    対象の発言が行われた日付のTwilogへのリンクを追加します（発言者がTwilogに登録している場合のみ）。
// @include        http://twitter.com/*/status/*
// @include        https://twitter.com/*/status/*
// ==/UserScript==
(function () {
    var spanBase = document.createElement('span');
    spanBase.appendChild(document.createTextNode('['));
    var a = document.createElement('a');
    a.appendChild(document.createTextNode('Twilog'));
    spanBase.appendChild(a);
    spanBase.appendChild(document.createTextNode(']'));
    var addLinks = function (dom) {
        var time = dom.getElementsByClassName('timestamp')[0].getAttributeNode('data').textContent;
        var date = new Date(time.substring(time.indexOf("'")+1, time.lastIndexOf("'")));
        var screenName = dom.getElementsByClassName('screen-name')[0].textContent;
        var dateNum = (date.getYear() - 100) * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        var url = 'http://twilog.org/'+ screenName + '/date-' + (dateNum < 100000 ? '0' : '') + String(dateNum);
        var span = spanBase.cloneNode(true);
        span.childNodes[1].href = url;
        dom.getElementsByClassName('entry-meta')[0].appendChild(span);
    };
    addLinks(document);
    document.addEventListener('AutoPagerize_DOMNodeInserted', function (e) {
        addLinks(e.target);
    }, false);
})();

// ==UserScript==
// @name           twilog_to_favstar
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Link to Favstar from each tweet on Twilog. / Twilog上の各ポストにFavstarへのリンクを追加します。
// @include        http://twilog.org/*
// ==/UserScript==
(function () {
    var span = document.createElement('span');
    span.style.marginLeft = '5px';
    var tlPosted = document.getElementsByClassName('tl-posted');
    for (var i = -1, tp; tp = tlPosted[++i]; ) {
        var spl = tp.getElementsByTagName('a')[0].href.split('/');
        spl[2] = 'favstar.fm/users';
        var spanClone = span.cloneNode(true);
        spanClone.innerHTML = ['[ <a href="'
                          ,spl.join('/')
                          ,'">Favstar</a> ]'].join('');
        tp.appendChild(spanClone);
    }
})();

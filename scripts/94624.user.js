// ==UserScript==
// @name           fix_zurukko_layout_on_the_japan_times
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    ずるっこの表示がThe Japan Times ONLINEで崩れているのを修正します。
// @include        http://search.japantimes.co.jp.zurukko.jp/*
// ==/UserScript==
(function () {
    var main = document.getElementsByClassName('MainBlock')[0];
    var right = document.createElement('td');
    right.className = 'RightBlock';
    var rightAd = document.getElementById('RightAdBlock');
    right.appendChild(rightAd);
    main.parentNode.appendChild(right);
})();

// ==UserScript==
// @id             TEPCO F1 genkyo Oshirase Sugu Zenbu Yomu
// @name           TEPCO F1 genkyo Oshirase Sugu Zenbu Yomu
// @version        1.0.1
// @namespace      http://d.hatena.ne.jp/saitamanodoruji/
// @author         saitamanodoruji
// @description    「福島第一原子力発電所の現況」でお知らせのスクロールを止めて全て表示する
// @include        http://www.tepco.co.jp/nu/fukushima-np/f1/genkyo/index-j.html*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==

(function() {
  var lines = document.querySelectorAll('#f-ticker-body > div');
  GM_addStyle([
    '#f-ticker,',
    '#f-ticker:after,',
    '#f-ticker-body,',
    '#f-ticker-body_inner {',
      'height: ', lines.length * 20 + 12, 'px !important;',
    '}',
    '#f-ticker-body_inner {',
      'top: 0 !important;',
    '}'
  ].join(''));
})();

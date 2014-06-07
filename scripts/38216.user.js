// ==UserScript==
// @name           mac_de_mona
// @namespace      http://d.hatena.ne.jp/snaka72/
// @description    Change font style to 'IPA mona font' for 2ch blog 
// @include        http://yaruomatome.blog10.fc2.com/*
// ==/UserScript==
(function () {
  var s = document.createElement('style');
  s.type = 'text/css';
  s.innerHTML = "*{font-family:'IPA \u30E2\u30CA\u30FC P\u30B4\u30B7\u30C3\u30AF' !important;}";
  document.getElementsByTagName('head')[0].appendChild(s);
})();
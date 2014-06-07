// ==UserScript==
// @name           webclap_key
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    add a keybind for webclap
// @include        http://clap.webclap.com/clap.php?id=*
// ==/UserScript==
(function () {
  var key = 'c'; // key for clapping
  document.addEventListener('keypress', function (e) {
    if (String.fromCharCode(e.which) == key) {
      document.forms[0].submit();
    }
  }, true);
})();

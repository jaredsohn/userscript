// ==UserScript==
// @name           runscripttest
// @namespace      scripttest@kwierso.com
// @description    asdf
// @include        http://roosterteeth.com/podcast/episode.php?id=*
// ==/UserScript==

(function() {
  var script = document.createElement("script");
  script.src = "http://mediaplayer.yahoo.com/js";
  script.type = "text/javascript";
  document.head.appendChild(script);
})();
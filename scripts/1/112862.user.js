// ==UserScript==
// @name          YouTube Das Captcha
// @namespace     http://www.runerne.dk/
// @description   Skips the das captcha page on YouTube
// @version       1.0
// @author        YePpHa
// @include       http://*.youtube.com/das_captcha*
// @include       https://*.youtube.com/das_captcha*
// ==/UserScript==
(function(){
  if (document.location.search != "" && document.location.search != "?") {
    var pairs = document.location.search.substring(1).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i].split("=");
      if (p[0] == "next") {
        document.location.href = unescape(p[1]);
        return;
      }
    }
  }
  document.location.href = "/";
})();
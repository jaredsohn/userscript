// ==UserScript==
// @name           unescape html entity for favotter
// @revision       5
// @author         KID a.k.a. blueberrystream
// @description    ふぁぼったーで表示されるpost内のHTMLエンティティを正しく表示します。
// @namespace      http://kid0725.usamimi.info
// @include        http://favotter.net/*
// ==/UserScript==

void(function() {

var UNESC = function() {
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    var className = spans[i].className;
    if (className == null || className == undefined) {
      continue;
    }
    if (-1 < className.indexOf("status_text") && -1 < className.indexOf("description")) {
      spans[i].innerHTML = spans[i].innerHTML.split("&amp;").join("&");
    }
  }
};
setInterval(UNESC, 2000);

})();

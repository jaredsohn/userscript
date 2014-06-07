// ==UserScript==
// @name           Seesaa Ads Remover
// @namespace      http://www.kuribo.info/
// @description    To Remove Popup Links Of Seesaa Ads
// @include        http://*.seesaa.net/*
// ==/UserScript==

(function() {
  var tags = document.getElementsByTagName('a');
  for (var i = tags.length - 1; i >= 0; i--) {
    if (tags[i].className == "affiliate-link") {
      var a = tags[i];
      var s = document.createElement('span');
      s.innerHTML = a.innerHTML;
      a.parentNode.replaceChild(s, a);
    }
  }
})();
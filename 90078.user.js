// ==UserScript==
// @name           SerendImageLoader
// @namespace      http://www.helloproject.com/
// @description    セレンドのつぶやき画像を最初から表示状態にします。
// @version        1.01
// @include        http://serend.net/*
// ==/UserScript==
(function()
{
  var n = 0;
  var showImage = function() {
    var e = document.getElementsByClassName('data');
    for (; n < e.length; n++) {
      var a = e[n].getElementsByTagName('a');
      for (var j = 0; j < a.length; j++) {
        if (a[j].href.match(/javascript:pop_say_img\(\'([^\']*)/)) {
          var img = document.createElement('img');
          img.src = RegExp.$1;
          e[n].parentNode.insertBefore(img, e[n].nextSibling);
        }
      }
    }
  }
  var tid = 0;
  var load = function() {
    clearTimeout(tid);
    tid = setTimeout(showImage, 100);
  }
  document.addEventListener('load', load, true);
})();

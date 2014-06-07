// ==UserScript==
// @name           pretty printed grd
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    
// @include        http://youpy.jottit.com/grd*
// ==/UserScript==
//
// 2008-06-21 t.koyachi
//

(function(){
  var html = document.getElementById("content").innerHTML
  if (html.match(/<p>(.*?)<\/p>/)) {
    document.getElementById("content").innerHTML = RegExp.$1.split(/=/).join("<br>");
  }
})();

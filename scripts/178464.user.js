// ==UserScript==
// @name           投行先锋论坛网址替换
// @description    替换成打印版本的网址
// @include        http://www.thxflt.com/forum.php?mod=viewthread*
// @version        1
// ==/UserScript==

(function() {
  var url = document.location.toString();
  if(url.indexOf("action=printable") == -1)
  {
  url = url.replace("mod=viewthread","mod=viewthread&action=printable");
  document.location = url;
  }
})();
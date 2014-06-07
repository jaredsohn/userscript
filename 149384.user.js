// ==UserScript==
// @name        phpGenius
// @namespace   php
// @description YouTube
// @include     http://www.anieto2k.com/demo/genius.php
// @version     1
// ==/UserScript==

var links = document.getElementsByTagName("a"); //array
var regex = /^(http:\/\/)([^\.]+)(\.google\.es\/search\?hl\=es\&q\=\-inurl\:\(htm\|html\|php\)\+intitle\:\.index\+of\.\+\%2B\.last\+modified\.\+\%2B\.parent\+directory\.\+\%2Bdescription\+\%2Bsize\+\%2B\(wma\|mp3\)\+\.)(.+)(\&btnG\=Buscar\+con\+Google\&meta\=)$/i;
for (var i=0,imax=links.length; i<imax; i++) {
   links[i].href = links[i].href.replace(regex,"$1$2.youtube.com/results?search_query=$4 \Lyrics");
}
function linkToNewTab() {
  var anchors = document.getElementsByTagName("a");
  for(var i = 0; i < anchors.length; i++) {
    if(anchors[i].href.indexOf("http") == 0  
      && anchors[i].href.indexOf(window.location.host) == -1) {
      anchors[i].target = "_blank";
    }
  }
}

window.addEventListener("load",function(){linkToNewTab()},false);
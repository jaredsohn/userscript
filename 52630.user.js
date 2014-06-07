// ==UserScript==
// @name           AddLink2YoutubeRepeat
// @namespace      http://d.hatena.ne.jp/replication/
// @description    Youtubeの動画ページにYouTube Repeat!へのリンクを挿入します。
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// @version        0.2
// ==/UserScript==

(function() {
  var url = document.URL;
  url = url.replace("http://" + document.domain, "");
  redirectURL = "http://www.youtuberepeat.com" + url;
  
  var aTag = document.createElement("a");
  aTag.href = redirectURL;
  aTag.innerHTML = "Youtube Repeat!でリピート再生する。";
  
  document.getElementById("watch-headline-title").appendChild(aTag);
})();

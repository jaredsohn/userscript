// ==UserScript==
// @name           asahi.com Headline Reader
// @namespace      http://shabetter.appspot.com
// @description    "Read" headlines at asahi.com which is one of the most popular Japanese news site.
// @include        http://www.asahi.com/
// @require        http://shabetter.appspot.com/fire_shabelet_gm.js
// ==/UserScript==

// this script requires "Fire Shabelet" addon
// https://addons.mozilla.org/en-US/firefox/addon/54452

(function(){
  var headlines = fireShabeletGM.xpath ("//div[@id='HeadLine']/ul[@class='Lnk FstMod']/li/a/text()");
  var i;
  for (i = 0; i < headlines.length; i++){

    //fireShabeletGM.shabelet (data, translation, reader, speed)
    //    data:        words to be read
    //    translation: 1 (translate) or 0 (not translate)
    //    reader:      "TakashiJPm", "KeikoJPf" or "default"
    //    speed:       from "-10" (slowest) to "10" or "default"

    fireShabeletGM.shabelet (headlines[i].nodeValue, 0, i % 2 ? "KeikoJPf" : "TakashiJPm", "0");
  }
})();

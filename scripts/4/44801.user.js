// ==UserScript==
// @name           Spiegel Video Download
// @namespace      http://www.spiegel.de
// @description    add download link to spiegel.de videos
// @include        http://www.spiegel.de/video/*
// ==/UserScript==

(function() {
  var url = document.location.href;
  var re = new RegExp('http://www.spiegel.de/video/video-(.*).html');
  var m = re.exec(url);
  if (m) {
    var videoUrl = "http://video.spiegel.de/flash/" + m[1] + "_996x560_VP6_928.flv"
    var s = document.createElement('li');
    s.setAttribute('class', "spNaviSubNavigation");
    var link = document.createElement('a');
    link.setAttribute('class', "spNaviLevel1Link");
    link.setAttribute('href', videoUrl);
    link.appendChild(document.createTextNode('Download Video'));
    s.appendChild(link);
    var e = document.getElementsByClassName('spMainNavigationNextIsActive')[0].nextSibling;
    e.insertBefore(s, e.firstElementChild);
  }
})();

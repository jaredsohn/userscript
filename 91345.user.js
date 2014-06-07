// ==UserScript==
// @name JutarnjiBannerFix
// @author Miljenko
// @namespace http://jutarnji.hr/
// @version 1.1
// @description removes banners in photo streams
// @include http://jutarnji.hr/*foto=*
// @include http://*.jutarnji.hr/*foto=*
// ==/UserScript==

(function () {

function removeFotoBanners() {
  fotoPattern = /foto=(\d+)/
  var match = fotoPattern.exec(document.URL)
  if (match == null) {
    return;
  }

  var current = parseInt(match[1])
  if (current % 5 == 0) {
    var replacement = current + 1
  } else if (current % 5 == 1) {
    var replacement = current - 1
  } else {
    return;
  }
  
  var links = document.getElementsByTagName('a')
  var n = links.length

  for (var i = 0; i < n; i++) {
    if(links[i].href.indexOf('banner=true') > -1) {
      links[i].href = links[i].href.replace(/banner=true&foto=(\d+)/, 'foto=' + replacement)
    }
  }
}

removeFotoBanners();

})(document);

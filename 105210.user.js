// ==UserScript==
// @name           Nico Sound Download Linker for Nico Douga
// @description    Creates a link after aa####### links that points to the http://nicosound.anyap.info/ page for that video.  This is perticularly useful for youtube vids that link to nico douga.
// @author         Joseph Marikle
// @include        http://*
// @version        1.0
// ==/UserScript==

(function(){
var anchors = document.getElementsByTagName("a");

for (var i in anchors)
{
  var fullURL = anchors[i].href;
  if (fullURL.indexOf("www.nicovideo.jp") !== -1) {
    var regex=/^[A-Za-z][A-Za-z][0-9]+$/;
    if (regex.test(fullURL.substr(fullURL.lastIndexOf("/") + 1))) {
      var DOMel = document.createElement("a");
      DOMel.target = "_blank";
      DOMel.href = 'http://nicosound.anyap.info/sound/' + fullURL.substr(fullURL.lastIndexOf("/") + 1);
      DOMel.innerHTML = '<img style="padding:0.1em 0.1em 0.1em 0.4em" src="http://img543.imageshack.us/img543/2990/50066159.gif" alt="download" />';
      anchors[i].parentNode.insertBefore(DOMel, anchors[i].nextSibling );
    }
  }
}
})();
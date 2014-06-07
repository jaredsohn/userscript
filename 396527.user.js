// ==UserScript==
// @name ex.ua links extractor
// @description Get video links from ex.ua
// ==/UserScript==

var list = [];
var links = document.querySelectorAll('table a[title][rel=nofollow]');
for(var i=0;i<links.length;i++) {
  var t = links[i].innerHTML
  if (t.indexOf('.mkv') == t.length - 4) {
    list.push('http://www.ex.ua' + links[i].getAttribute('href'));
    };
}
alert(list.join("\n"));

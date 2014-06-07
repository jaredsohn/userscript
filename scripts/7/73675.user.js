// ==UserScript==
// @name           HatenaFotolife direct link
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://f.hatena.ne.jp/*
// @version        0.0.4
// ==/UserScript==

function addLink(doc) {
  Array.prototype.forEach.call(doc.querySelectorAll('.fotolist li a'), function(e) {
    GM_xmlhttpRequest({
      method: "GET",
      url: e.href,
      onload: function(res) {
        var div = document.createElement('div');
        div.innerHTML = res.responseText;
        var orig = div.querySelector('.fotoinfo>.edit img[src*="original.gif"]');
        var fotoSrc = orig ? orig.parentNode.href : div.querySelector('img.foto').src.replace(/\?\d+/,"");
        var link = document.createElement("a");
        link.href = fotoSrc;
        link.appendChild(document.createTextNode("ORIG"));
        link.style.backgroundColor = 'pink';
        e.parentNode.insertBefore(link, e);
      }
    });
  });
}
addLink(document);
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
  addLink(evt.target);
}, false);

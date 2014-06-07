// ==UserScript==
// @name           github charcode converter
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        https://github.com/*
// @version        0.1
// @date           2011051805
// ==/UserScript==

var rawUrl = document.getElementById('raw-url');

if (!rawUrl) return;

var btn = document.createElement('button');
btn.textContent = 'euc-jp -> utf-8';
btn.setAttribute('style', 'position:fixed; bottom:10px; right:10px;');
btn.addEventListener('click', function() { convert('euc-jp', 'utf-8'); }, false);
document.body.appendChild(btn);


function convert(a, b) {
  var url = 'http://miscapis.appspot.com/webiconv?from=' + a + '&to=' + b + '&url=' + encodeURIComponent(rawUrl.href);
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
    onload: function(res) {
      document.querySelector('.highlight>pre').textContent = res.responseText;
    }
  });
}
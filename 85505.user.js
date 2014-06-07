// ==UserScript==
// @name           gist.github - display file name
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://gist.github.com/*
// @include        https://gist.github.com/*
// @version        0.2
// @date           20110305
// ==/UserScript==

function disp(doc) {
  Array.forEach(doc.querySelectorAll(".meta .info a:first-child"), function(e) {
    var id = e.href.replace(/^https?:\/\/gist\.github\.com\//,"");
    GM_xmlhttpRequest({
      method: "get",
      url: "http://gist.github.com/api/v1/json/" + id,
      headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
      onload: function(res) {
        var gists = JSON.parse(res.responseText).gists[0];
        var fileName = document.createElement("span");
        fileName.style.fontStyle = "italic";
        fileName.appendChild(document.createTextNode(gists.files.join()));
        e.parentNode.parentNode.insertBefore(fileName, e.parentNode.nextSibling);
      }
    });
  });
}
if(!document.getElementById("repos")) {
  disp(document);
  document.addEventListener("AutoPagerize_DOMNodeInserted", function(evt) {
    disp(evt.target);
  }, false);
}
// ==UserScript==
// @name           Google News with Hatena Bookmark
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @description    Add Hatena::Bookmark Users Icons to Google News
// @include        http://news.google.co.jp/*
// @include        http://www.google.co.jp/news*
// @include        http://www.google.co.jp/nwshp*
// ==/UserScript==
//

function appendImg(elm) {
  var a = document.createElement("a");
  a.href = "http://b.hatena.ne.jp/entry/" + elm.href;

  var img = a.appendChild(document.createElement("img"));
  if (elm.parentNode.nodeName == "FONT") { // <font color="#6f6f6f" size="-1">
    img.src = "http://b.hatena.ne.jp/entry/image/small/" + elm.href;
  } else {
    img.src = "http://b.hatena.ne.jp/entry/image/" + elm.href;
  }
  img.alt = "\u00ad";
  img.style.borderWidth = "0";

  if (elm.nextSibling) {
    elm.parentNode.insertBefore(a, elm.nextSibling);
  } else {
    elm.parentNode.appendChild(a);
  }
}

var links = document.evaluate("//A[starts-with(@href, 'http://') and not(contains(@href, 'google'))]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < links.snapshotLength; i++) {
  setTimeout(appendImg, 0, links.snapshotItem(i));
}

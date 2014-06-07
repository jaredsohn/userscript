// ==UserScript==
// @name           Hatena::Serif with Hatena::Bookmark
// @description    Add Hatena::Bookmark Users Icons to Hatena::Serif
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://serif.hatelabo.jp/*
// @exclude        http://serif.hatelabo.jp/
// ==/UserScript==

var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
  if (divs[i].className == "serif_data") {
    var url = divs[i].getElementsByTagName("a")[0].href;
    var link = document.createElement("a");
    link.href = "http://b.hatena.ne.jp/entry/" + url;
    var img = link.appendChild(document.createElement("img"));
    img.src = "http://b.hatena.ne.jp/entry/image/" + url;
    divs[i].getElementsByTagName("div")[0].appendChild(link);
  }
}

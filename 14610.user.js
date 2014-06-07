// ==UserScript==
// @name           Nico Nico Douga with Hatena Bookmark
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @description    Add Hatena::Bookmark Users Icons to "Nico nico douga"
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

function appendImg(elem, url, size) {
  var a = document.createElement("a");
  a.href = "http://b.hatena.ne.jp/entry/" + url;

  var img = a.appendChild(document.createElement("img"));
  img.src = "http://b.hatena.ne.jp/entry/image/" + (size ? size + "/" : "") + url;
  img.style.borderWidth = "0";

  elem.appendChild(a);
}

if (document.getElementsByName("paste_url").length > 0) {
  var video_title = document.getElementsByTagName("h1")[0];
  var video_link = document.getElementsByName("paste_url")[0].getElementsByTagName("input")[0];
  appendImg(video_title, video_link.value, "large");
}

var h3 = document.getElementsByTagName("h3");
for (var i = 0; i < h3.length; i++) {
  if (h3[i].firstChild.nodeName == "A") appendImg(h3[i], h3[i].firstChild.href);
}

// ==UserScript==
// @name           Hatena::Bookmark Violation Notify Link
// @description    Add "Notify the violation" links in Hatena::Bookmark
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

if (!document.getElementById("bookmarked_user")) {
  var editlink = document.getElementsByTagName("h1")[0].nextSibling.nextSibling.firstChild;
  if (editlink.nodeName == "A") {
    var eid = editlink.href.match(/eid\=\d*$/)[0];

    var info = document.createElement("div");
    info.className = "info";

    var box = info.appendChild(document.createElement("div"));
    box.className = "box-r font-s";

    var violink = box.appendChild(document.createElement("a"));
    violink.className = "icon-page";
    violink.href = "/violation?" + eid;
    violink.appendChild(document.createTextNode("\u5229\u7528\u898F\u7D04\u9055\u53CD\u3092\u901A\u77E5\u3059\u308B"));

    document.getElementById("body").appendChild(box);
  }
}

// ==UserScript==
// @name           AddLink2HatenaDiary
// @namespace  http://d.hatena.ne.jp/replication/
// @include        http://b.hatena.ne.jp/entry/*
// @description  はてなブックーマックのエントリページにて、ブクマしているユーザのはてなダイアリーへのリンクを追加します。
// @version        0.1
// ==/UserScript==

function $id(id) { return document.getElementById(id); }

// bookmarked_userというidのulリストを取得
var bookmarkUserList = $id("bookmarked_user");
// 配下のli要素の数だけ繰り返し。
var li = bookmarkUserList.getElementsByTagName("li");
for(var i=0, len = li.length; i<len; i++) {
  
  // はてブへのリンクを取得し、はてダへのリンクに書き換える
  var url = li.item(i).getElementsByTagName("a").item(0).href;
  url = url.replace("http://b.", "http://d.");
  var aTag = document.createElement("a");
  aTag.href = url;
  
  var img = document.createElement("img");
  img.src = "http://favicon.hatena.ne.jp/?url=http://d.hatena.ne.jp/";
  aTag.appendChild(img);
  
  li.item(i).appendChild(aTag);
}

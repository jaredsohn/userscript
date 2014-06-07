// ==UserScript==
// @name           translate JK slangs
// @namespace      org.shokai
// @description    convert slangs of Japanese school girls. JK => 女子高生
// @include        http://*
// @include        https://*
// author: Sho Hashimoto
// http://shokai.org
// ==/UserScript==

var slang_dic = [
["JK", "女子高生"],
["KY", "空気読めない"],
["HK", "話変わるよ"],
["IW", "意味わからない"],
["HD", "暇な時電話する"],
["KZ", "からみづらい"],
["MT", "まさかの展開"],
["MA", "まじありえない"],
["DK", "大事なとこで噛む"],
["BY", "場が読めない"],
["OD", "お肉大好き"],
["WH", "話題変更"],
["KB", "空気ぶち壊し"],
["TK", "とんだ勘違い"],
["KK", "過剰な勘違い"],
["CC", "超かわいい"],
["HP", "はみだしパンツ"],
["WK", "しらける"],
["MM", "マジめんどくさい"],
["KI", "カラオケ行こう"],
["MS", "みんなに避けられてる"],
["DK", "男子高校生"],
];

function translate_jk(){
  var body = document.body.innerHTML;
  for(var i = 0; i < slang_dic.length; i++){
    var reg = new RegExp(slang_dic[i][0], "g");
    body = body.replace(reg, slang_dic[i][1]);
  }
  document.body.innerHTML = body;
}
window.addEventListener('load', translate_jk, true);

// ==UserScript==
// @name           ニコニコ大百科NGワード
// @namespace      http://userscripts.org/users/497722
// @description    ニコニコ大百科の不快な単語を(*´ω｀*)に変えます。
// @version        1.0.1d
// @grant          none
// @include        http://dic.nicovideo.jp/*
// ==/UserScript==

// ↓ここの検索文字列を書き換えただけ！
// http://www14.plala.or.jp/campus-note/javascript/replace.html
// 選択中の文字をNGにできたらいいですよね？ﾁﾗｯ

/*
カスタマイズ方法
|←この記号の右に入力した文字が下から3行目の''で囲まれた文字に変わります。初期では'(*\u00b4\u03c9\uff40*)'に変わります。
巻き込まれやすい・人によっては不快に思わないかも知れない単語はわざと日本語で記しておきます。

http://dic.nicovideo.jp/id/338831
のいくつかの単語を下のサイトで変換したものが初期で含まれています。自由に追加・削除してください。
そのまま日本語の文字で入力しても問題ありませんが、見たくない文字は下記のサイトで変換してください。巻き込みで消えてしまうときもあるので注意してください。
http://code.cside.com/3rdpage/jp/javaUnicode/converter.html
*/

(function(){
  document.body.innerHTML=document.body.innerHTML.replace(/おまえ|お前|ばか|バカ|馬鹿|\u982D\u60AA|\u3086\u3068\u308A|\u30A2\u30F3\u30C1|\u4FE1\u8005|\u30AA\u30CA\u30CB|\u30AA\u30CA\u30CB\uFF0D|\u30AA\u30CA\u308B|\u81EA\u6170|\u30DE\u30B9\u30BF\u30FC\u30D9\u30FC\u30B7\u30E7\u30F3|\u5C04\u7CBE|\u3057\u3053\u3057\u3053|\u81A3|\u598A\u5A20|\u30EC\u30A4\u30D7|\u30EC.\u30D7|\u51E6\u5973|\u30AF\u30EA\u30C8\u30EA\u30B9|\u30AF\u30EA.+\u25CB.+\u30EA\u30B9|\u30C1\u30E7\u30F3|\uFF81\uFF6E\uFF9D|\u534A\u5CF6\u4EBA|\u30D5\u30A1\u30D3\u30E7|\u30DE\u30B9\u30B4\u30DF|\u30CD\u30C8\u30A6\u30E8|\u30A6\u30E8\u30AF|\u53F3\u7FFC|\u717D|\u7CDE|\u304F\u305D|\u30AF\u30BD|\uFF78\uFF7F|\u3046\u3093\u3053|\u30A6\u30F3\u30B3|\uFF73\uFF9D\uFF7A|\u304D\u3061\u304C\u3044|\u30AD\u30C1\u30AC\u30A4|\uFF77\uFF81|\u57FA\u5730\u5916|\u30DE\u30B8\u30AD\u30C1|\^q\^|\uFF3E\uFF51\uFF3E|\u6C60\u6CBC|\u30D3\u30C3\u30C1|\u53A8|\u53A8\u623F|\u5AC9\u59AC|\u59AC\u307F|\u8AD6\u7834|\u30C9\u30E4\u9854|ks/gi,'(*\u00b4\u03c9\uff40*)');focus();
})();
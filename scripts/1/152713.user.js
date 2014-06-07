// ==UserScript==
// @name BDPB NG Manager
// @description BRAVELY DEFAULT PRAYING BRAGEのチャットにNGなどを追加
// @id BdpbNg
// @include http://w*.bravely.jp/player*
// @version 2012.11.21
// ==/UserScript==

(function() {


////////// ↓設定↓ //////////

/* NGname (正規表現)
   例: ngName = "名前A|名前B|名前C";
   NGは行ごと隠します */
var ngName = "";

/* NGword (正規表現)
   例: ngWord = "単語A|単語B|単語C"; */
var ngWord = "";

/* NGwordの表示切替
   true:NGの発言を行ごと隠す
   false:発言内容を書き換える(マウスオーバーで確認) */
var ngWordHide = false;

/* NGwordの書き換え文字
   上の設定ngWordHide=falseのときに発言全体を以下の文字へ書き換える */
var ngWordReplace = " *** ";

/* イベントログ以外のシステムログの表示切替
   true:システムログを行ごと隠す
   false:システムログを隠さない */
var ngSystemlog = false;

/* イベントログ以外のシステムログの文字色
   上の設定ngSystemlog=falseのときにシステムログの色を変更する */
var ngSystemlogColor = "#AAAAAA";

////////// ↑設定↑ //////////



var timer, id = function(s) { return document.getElementById(s) };
var reName = new RegExp(ngName, "i");
var reWord = new RegExp(ngWord, "i");
var target = id("chat_tabs");
var config = { childList:true, subtree:true };


//勢力・ギルド・マップのチャットでNG処理する
function ngCheck() {
  clearTimeout(timer);
  timer = setTimeout(function() {
    ["faction", "guild", "battlefieldfaction"].forEach(function(a) {
      var item = document.evaluate("id('chat_" + a + "')/li", document, null, 7, null);
      if (item) {
        for(var i=0,j=item.snapshotLength; i<j; i++) {
          var user = "", text = "", nText = 0, ss = item.snapshotItem(i);
          for (var m=1,n=ss.childNodes.length; m<=n; m++) {
            if (ss.childNodes[m]) {
              if (ss.childNodes[m].className && ss.childNodes[m].className === "user") user = ss.childNodes[m].textContent;
              if (ss.childNodes[m].className && ss.childNodes[m].className === "text") {
                text = ss.childNodes[m].textContent;
                nText = m;
              }
            }
          }
          
          //システムログ
          if (!user) {
            if (ngSystemlog) {
              ss.style.display = "none";
              continue;
            } else if (ngSystemlogColor) {
              ss.style.color = ngSystemlogColor;
              continue;
            }
          }
          
          //NGネーム
          if (ngName && user) {
            if (reName.test(user)) {
              ss.style.display = "none";
              continue;
            }
          }
          
          //NGワード
          if (ngWord && text) {
            if (reWord.test(text)) {
              if (ngWordHide) ss.style.display = "none";
              else if (nText) ss.childNodes[nText].innerHTML = "<div style='cursor:help;' title='" + text + "'>" + ngWordReplace + "</div>";
            }
          }
          
        }
      }
    });
  }, 50);
}


//読み込み時に実行
(function ngStartup() {
  ngCheck();
  setTimeout(function(){
    if (typeof MutationObserver === "undefined" && typeof WebKitMutationObserver === "function")
      window.MutationObserver = WebKitMutationObserver;
    new MutationObserver(ngCheck).observe(target, config);
  }, 200);
})();


})();
// ==UserScript==
// @name          devquiz2011_resolve_webgame
// @namespace     http://userscripts.org/users/kawaz
// @description   GDD2011のDevQuizのWebGameを解く
// @include       http://gdd-2011-quiz-japan.appspot.com/webgame/problem
// ==/UserScript==

var click = document.createEvent('MouseEvents');
click.initEvent('click', true, true);
var cards = Array.prototype.slice.apply(document.querySelectorAll(".card"));
var colors = cards.map(function(){return ""});

(function(){
  //次の空き地を探す
  var i = colors.indexOf("");
  if(i < 0) {
    //クリア
    return;
  }
  //空き地を開く
  cards[i].dispatchEvent(click);
  //開いたカードの色を取得
  var c = cards[i].style.backgroundColor;
  var j = colors.indexOf(c);
  console.log("" + i + "," + j + "," + colors);
  if(j < 0) {
    //初めてなら覚える
    colors[i] = c;
  } else {
    //既出なら同色のカードを取る
    cards[j].dispatchEvent(click);
    if(!cards[i].style.backgroundColor) {
      cards[i].dispatchEvent(click);
    }
    //取ったカードにフラグ立て
    colors[i] = colors[j] = 'OK';
  }
  //次手へ再帰ループ
  //arguments.callee();
  setTimeout(arguments.callee, 100); //アニメーションを楽しむ為にゆっくり化
})();

// ==UserScript==
// @name           replace censored text
// @revision       5
// @author         blueberrystream a.k.a. KID
// @namespace      http://kid0725.usamimi.info
// @include        http://favotter.net/*
// ==/UserScript==

void(function() {

/* 定数定義 */
// <censored>に代わる文字列
var ALTERNATIVE = "*禁則事項*";
// 太字にするか (true: する, false: しない)
var BOLD = false;
// 斜体にするか (true: する, false: しない)
var ITALIC = false;
// 下線をひくか (true: ひく, false: ひかない)
var UNDERLINED = false;
// 文字の色 (#RRGGBB形式or色名/空っぽにするともとの色になります)
var COLOR = "";

/* 置き換え */
var REPLACE = function() {
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    var className = spans[i].className;
    if (className == null || className == undefined) {
      continue;
    }
    if (-1 < className.indexOf("censored")) {
      spans[i].className = "";
      if (BOLD) {
        spans[i].style.fontWeight = 'bold';
      }
      if (ITALIC) {
        spans[i].style.fontStyle = 'italic';
      }
      if (UNDERLINED) {
        spans[i].style.textDecoration = 'underline';
      }
      if (COLOR != "") {
        spans[i].style.color = COLOR;
      }
      spans[i].innerHTML = ALTERNATIVE;
    }
  }
};
setInterval(REPLACE, 2000);

})();
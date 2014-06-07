// ==UserScript==
// @name           それはあなたです！
// @revision       1
// @author         blueberrystream a.k.a. KID
// @namespace      http://kid0725.usamimi.info
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

void(function() {

// 置き換える文字列を定義
var REPLACE_TARGET = new Array();
REPLACE_TARGET.push("それはあなたです！:あなたはそれです！");
REPLACE_TARGET.push("ツイート:ツイート(笑)");


////// こっから先は変えないでください ////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < REPLACE_TARGET.length; i++) {
  var replaceArray = REPLACE_TARGET[i].split(":");
  document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML.split(replaceArray[0]).join(replaceArray[1]);
}
})();
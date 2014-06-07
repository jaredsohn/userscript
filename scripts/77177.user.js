// ==UserScript==
// @name           Navitime NO SHINKANSEN
// @revision       2
// @author         KID a.k.a. blueberrystream
// @description    Navitimeの乗り換え検索で新幹線だとかそういうののチェックを外します
// @namespace      http://kid0725.usamimi.info
// @include        http://www.navitime.co.jp/*
// ==/UserScript==

void(function() {

var ids = new Array("ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7");

for (var i = 0; i < ids.length; i++) {
  var element = document.getElementById(ids[i]);
  if (element != null && element != undefined) {
    element.checked = false;
  }
}

})();
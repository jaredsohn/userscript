// ==UserScript==
// @name           bro3_hei100
// @namespace      http://xxx.tonton.ton.jp/
// @description	   兵作成のテキストボックスに初期値100を入れる
// @include        http://*.3gokushi.jp/facility/facility.php*
// ==/UserScript==

var ken = new Array('unit_value[301]', 100); // 剣兵
var yari = new Array('unit_value[303]', 100); // 槍兵
var yoho = new Array('unit_value[304]', 100); // 矛槍兵
var kihe = new Array('unit_value[305]', 100); // 騎兵  
var kono = new Array('unit_value[307]', 100); // 近衛騎兵
var yumi = new Array('unit_value[308]', 100); // 弓兵
var dohe = new Array('unit_value[309]', 100); // 弩兵
var u = new Array(ken, yari, yoho, kihe, kono, yumi, dohe);
for (var i = 0; i < u.length; i++) {
  var e=document.getElementById(u[i][0]);
  if (e) {
    e.value=u[i][1];
  }
}

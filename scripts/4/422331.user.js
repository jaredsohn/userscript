// ==UserScript==
// @name           bro3_favoritetrade
// @namespace      http://chaki.s27.xrea.com/br3/
// @include        http://*.3gokushi.jp/*
// @description    ブラウザ三国志 トレード関連ツール詰め合わせ by きの。
// @author         kino.
// @version        2.40
// @icon	   http://chaki.s27.xrea.com/br3/icon.png
// ==/UserScript==

//出品処理修正（SSID追加）
//トレード画面の翌日分の出品をグレーがけ（0時～10時）

( function(){

var version = "2.40";

var AH_list = ["仁君","弓腰姫の愛","神医の術式","神医の施術","皇后の慈愛","傾国","優雅な調べ","城壁補強"];


///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright 2009, James Campos



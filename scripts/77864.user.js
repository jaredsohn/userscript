// coding: utf-8
// ==UserScript==
// @name           Ikariam kChen Overview
// @namespace      Ikariam
// @author         kChen
// @description    Ikariam kChen Overview for v.0.3.2
// @version        v0.3.2.002
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/config.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/lang.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/tools.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/lib.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/data.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/view.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/scoreinfo.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/table.js
// @require        http://kchenoverview.ihost.tw/js/0.3.2.002/kc.js
// @resource icon_speed         http://kchenoverview.ihost.tw/js/pic/icon_speed.gif
// @resource icon_academy       http://kchenoverview.ihost.tw/js/pic/icon_academy.gif
// @resource icon_warehouse     http://kchenoverview.ihost.tw/js/pic/icon_warehouse.gif
// @resource icon_wall          http://kchenoverview.ihost.tw/js/pic/icon_wall.gif
// @resource icon_palaceColony  http://kchenoverview.ihost.tw/js/pic/icon_palaceColony.gif
// @resource icon_forester      http://kchenoverview.ihost.tw/js/pic/icon_forester.gif
// @resource icon_stonemason    http://kchenoverview.ihost.tw/js/pic/icon_stonemason.gif
// @resource icon_glassblowing  http://kchenoverview.ihost.tw/js/pic/icon_glassblowing.gif
// @resource icon_winegrower    http://kchenoverview.ihost.tw/js/pic/icon_winegrower.gif
// @resource icon_alchemist     http://kchenoverview.ihost.tw/js/pic/icon_alchemist.gif
// @resource icon_carpentering  http://kchenoverview.ihost.tw/js/pic/icon_carpentering.gif
// @resource icon_architect     http://kchenoverview.ihost.tw/js/pic/icon_architect.gif
// @resource icon_optician      http://kchenoverview.ihost.tw/js/pic/icon_optician.gif
// @resource icon_vineyard      http://kchenoverview.ihost.tw/js/pic/icon_vineyard.gif
// @resource icon_fireworker    http://kchenoverview.ihost.tw/js/pic/icon_fireworker.gif

// ==/UserScript==
// Summary:
//   1.This script automatically refreshes the page in Ikariam (5 minutes to 10 minutes per time)
//   2.New message or attack will give warning by sound
//   3.List all information of towns
//
//
// Patch Content:
//   2009.05.13 v0.3.2.002
//    - ??:??????? 32 ? (tiger ??)
//    - ??:??????? (ashram ??)
//    - ??:????????????????? (watasiku ??)
//    - ??:0.3.2 ????? (fucu ??)
//    - ??:Score Information ? Ally Members ???? (mango ??)
//   2009.05.11 v0.3.2.001
//    - ??:?? v0.3.2 (PTT??)
//    - ??:????????
//
// History:
//   please refer to http://userscripts.org/scripts/show/35879
//
// =============================================================

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config     = getConfig();
var players    = getPlayers();
var _startTime    = new Date().getTime();
var scriptversion = "v0.3.2.002";

kChenOverview();

// You can merge other scripts in here.
<div style="text-align: center;"><div style="position:relative; top:0; margin-right:auto;margin-left:auto; z-index:99999">
<font size="1">Copyright &#169; 2007 <a href="http://ihost.tw/">ihost.tw</a>  All rights reserved. Tech Support: <a href="http://coz.tw/"><span style="font-weight: bold;">coz.tw</span></a></font>
</div></div>
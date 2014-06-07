// coding: utf-8
// ==UserScript==
// @name           Ikariam kChen Overview
// @namespace      Ikariam
// @author         kChen
// @description    Ikariam kChen Overview for v.0.3.0
// @version        v0.3.0.036
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// @require        http://kchenoverview.ihost.tw/js/036/config.js
// @require        http://kchenoverview.ihost.tw/js/036/lang.js
// @require        http://kchenoverview.ihost.tw/js/036/tools.js
// @require        http://kchenoverview.ihost.tw/js/036/lib.js
// @require        http://kchenoverview.ihost.tw/js/036/data.js
// @require        http://kchenoverview.ihost.tw/js/036/view.js
// @require        http://kchenoverview.ihost.tw/js/036/scoreinfo.js
// @require        http://kchenoverview.ihost.tw/js/036/table.js
// @require        http://kchenoverview.ihost.tw/js/036/kc.js
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
// @resource sound_alarm        http://kchenoverview.ihost.tw/js/sound/alarm.wav
// @resource sound_warning      http://kchenoverview.ihost.tw/js/sound/warning.wav
// ==/UserScript==
// Summary:
//   1.This script automatically refreshes the page in Ikariam (5 minutes to 10 minutes per time)
//   2.New message or attack will give warning by sound
//   3.List all information of towns
//
//
// Patch Content:
//   2009.02.18 v0.3.0.036
//    - 新增：芬蘭語系
//            Finnish translation by DeFe
//    - 新增：塞爾維亞語系
//            Serbian translation by MJT
//    - 更新：美化積分資訊表
//    - 更新：斯洛伐克語系
//            update Slovak translation by pretorians1
//    - 更新：越南語系
//            update Vietnamese translation by vutl
//    - 修正：學院建築物所需資源錯誤，顯示成大理石，應該為水晶
//    - 修正：噴火船成本錯誤
//    - 修正：多個倉庫升級時顯示錯誤
//
// History:
//   please refer to http://userscripts.org/scripts/show/35879
//
// =============================================================

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config     = getConfig();
var players    = getPlayers();
var _startTime    = new Date().getTime();
var scriptversion = "v0.3.0.036";

kChenOverview();

// You can merge other scripts in here.
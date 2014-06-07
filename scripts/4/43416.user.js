// coding: utf-8
// ==UserScript==
// @name           Ikariam kChen Overview
// @namespace      Ikariam
// @author         kChen
// @description    Ikariam kChen Overview for v.0.3.0
// @version        v0.3.0.036
// @include        http://s*.ikariam.*/
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
//    - æ–°å¢žï¼šèŠ¬è˜­èªžç³»
//            Finnish translation by DeFe
//    - æ–°å¢žï¼šå¡žçˆ¾ç¶­äºžèªžç³»
//            Serbian translation by MJT
//    - æ›´æ–°ï¼šç¾ŽåŒ–ç©åˆ†è³‡è¨Šè¡¨
//    - æ›´æ–°ï¼šæ–¯æ´›ä¼å…‹èªžç³»
//            update Slovak translation by pretorians1
//    - æ›´æ–°ï¼šè¶Šå—èªžç³»
//            update Vietnamese translation by vutl
//    - ä¿®æ­£ï¼šå­¸é™¢å»ºç¯‰ç‰©æ‰€éœ€è³‡æºéŒ¯èª¤ï¼Œé¡¯ç¤ºæˆå¤§ç†çŸ³ï¼Œæ‡‰è©²ç‚ºæ°´æ™¶
//    - ä¿®æ­£ï¼šå™´ç«èˆ¹æˆæœ¬éŒ¯èª¤
//    - ä¿®æ­£ï¼šå¤šå€‹å€‰åº«å‡ç´šæ™‚é¡¯ç¤ºéŒ¯èª¤
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
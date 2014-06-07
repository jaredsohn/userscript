// ==UserScript==
// @name           سكربت تعديل اسماء القرى
// @namespace      
// @description    السكربات خاص في تعديل اسماء القرى على اساس الاحدثيات  او عشواي او وقت الوصول كثير اي يحتوي على اشكال مختلفه
// @include        http://ae*.tribalwars.ae/game.php?*village=*&screen=overview_villages*
// @include        http://ae*.tribalwars.ae/game.php?*village=*&screen=settings&mode=settings*
// @include	   http://ae*.tribalwars.ae/*screen=main*
// @include        http://zz*.beta.tribalwars.net/game.php?*village=*&screen=overview_villages*
// @include        http://zz*.beta.tribalwars.net/game.php?*village=*&screen=settings&mode=settings*
// @include	   http://zz*.beta.tribalwars.net/*screen=main*
// @include        http://ch*.staemme.ch/game.php?*village=*&screen=overview_villages*
// @include        http://ch*.staemme.ch/game.php?*village=*&screen=settings&mode=settings*
// @include        http://ch*.staemme.ch/*screen=main*
// ==/UserScript==


var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.getScript('http://www.tw4me.com/village_renamer.js');
// ==UserScript==
// @name           Scrap.tf Sorter
// @author         NMGod
// @description    Scrap.tf Item Sorter
// @version        1.4
// @include        http://scrap.tf/weapons/*
// @include        http://scrap.tf/hats/*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// @require        http://nmgod.com/backpack/js/jquery.tinysort.min.js
// @updateURL      http://userscripts.org/scripts/source/155077.meta.js
// @installURL     http://userscripts.org/scripts/source/155077.user.js
// @copyright      NMGod
// ==/UserScript==

$(".item").tsort({attr:"data-original-title"});
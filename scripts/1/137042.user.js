// ==UserScript==
// @name           nexusmods
// @description    make nexusmods lighter
// @author         Me
// @include        http://skyrim.nexusmods.com/*
// @match          mods
// @version        1.0
// ==/UserScript==

$("div.announcement").hide();
$("div#horizontal-ad").hide();
$("div#ad-right").hide();

$("div.footer-content").hide();
$("ol.files-tab-files-list").hide();

// ==UserScript==
// @name		Google Calendar "hide morning and night" lab - hide night
// @version		1.0
// @description	Hides "night" part of lab
// @match		https://www.google.com/calendar/*
// ==/UserScript==

GM_addStyle("\
.crd-bottom, \
.cgd-col-last, \
.tg-hourmarkers > div:last-child { display:none; } \
.crd-col.tg-times-pri { top:-62px !important; } \
");

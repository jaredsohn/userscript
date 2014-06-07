// ==UserScript==
// @name           Google Calendar Change Todays Color
// @namespace      Made by Anders Dahlgren @ adahlgren.com
// @description    Google Calendar Change Todays Color
// @include        http://calendar.google.tld/*
// @include        https://calendar.google.tld/*
// @include        http://www.google.tld/calendar*
// @include        https://www.google.tld/calendar*
// @include        http://google.tld/calendar*
// @include        https://google.tld/calendar*
// @date           2008-02-16
// @version        0.0.1
// @GM_version     0.5.3
// ==/UserScript==

//To change color: edit "background:#FFFF7F" where FFFF7F is the color
//Default color is FFFFCC


ss = document.styleSheets[0];

ss.insertRule('div.currentDayDec {background:#FFFFB2 none repeat scroll 0%;}', ss.cssRules.length);


// ==UserScript==
// @name          Ограничение ширины текста
// @version       0.6
// @namespace     http://glesik.ru/
// @description   Ограничивает ширину текста на ряде сайтов для комфортного чтения. Поддерживает Dirty/d3, LiveJournal, Slashdot, форумы "Проектов Петербурга" и ВелоПитера.
// @icon          http://glesik.ru/playground/greasemonkey/text_width_limit.png
// @copyright     Copyright 2012 Alexander Inglessi http://glesik.ru/
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include       http://dirty.ru/*
// @include       http://*.dirty.ru/*
// @include       http://d3.ru/*
// @include       http://*.d3.ru/*
// @include       http://*.livejournal.com/*
// @include       http://spb-projects.ru/forum/*
// @include       http://velopiter.spb.ru/forum/*
// @include       http://slashdot.org/*
// @include       http://*.slashdot.org/*
// @include       http://*.opennet.ru/*
// @include       http://opennet.ru/*
// @grant         GM_addStyle
// ==/UserScript==

// 0.6  opennet.ru support.
// 0.5  d3.ru (brave new dirty.ru) support.
// 0.4  Slashdot.org rules, updated @include.
// 0.3  New LiveJournal.com rules.
// 0.2  New LiveJournal.com rules, @grant and @icon directives.

max_width = "40em";

var host = window.location.host

if (host.indexOf("dirty.ru") !=-1) {
  GM_addStyle(".dt { width: " + max_width + "; }");     // posts
  GM_addStyle(".c_body { width: " + max_width + "; }"); // comments
}

if (host.indexOf("d3.ru") !=-1) {
  GM_addStyle(".dt { width: " + max_width + "; }");     // posts
  GM_addStyle(".comment_inner { width: " + max_width + "; }"); // comments
}

if (host.indexOf("livejournal.com") !=-1) {
  GM_addStyle(".b-singlepost-body { display: inline-block; width: " + max_width + ";}"); // posts
  GM_addStyle(".H3Holder { display: inline-block; width: " + max_width + ";}");
  GM_addStyle("TD.entry { display: inline-block; width: " + max_width + ";}");
  GM_addStyle("table.entry { display: inline-block; width: " + max_width + ";}");
  GM_addStyle("div.entry-content { display: inline-block; width: " + max_width + ";}");
  GM_addStyle(".b-leaf { display: inline-block; width: " + max_width + ";}");            // comments
  GM_addStyle("tr div div { display: inline-block; width: " + max_width + ";}");
  GM_addStyle("div.comment-text { display: inline-block; width: " + max_width + ";}");
}

if (host.indexOf("spb-projects.ru") !=-1) {
  GM_addStyle(".postbody { display: block; width: " + max_width + ";}"); // posts
  GM_addStyle(".quote { display: block; width: " + max_width + ";}");    // quotes
}

if (host.indexOf("velopiter.spb.ru") !=-1) {
  GM_addStyle(".MsgBodyText { display: inline-block; width: " + max_width + ";}");
}

if (host.indexOf("slashdot.org") !=-1) {
  GM_addStyle(".body { display: inline-block; width: " + max_width + ";}"); // posts
  GM_addStyle(".commentBody { display: inline-block; width: " + max_width + ";}"); // comments
}

if (host.indexOf("opennet.ru") !=-1) {
  GM_addStyle("td.chtext { display: inline-block; width: " + max_width + ";}"); //posts
  GM_addStyle("td.ctxt { display: inline-block; width: " + max_width + ";}"); //comments
}

// ==UserScript==
// @name       Nu arata torrentele inchise in lista
// @namespace  tmd
// @version    0.1
// @description  enter something useful
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*/*
// @include     *torrentsmoldova.*/*
// @copyright  2014, drakulaboy
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// ==/UserScript==

$('.tableTorrents b[title="Închis"]').closest('tr').hide();
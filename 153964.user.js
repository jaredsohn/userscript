// ==UserScript==
// @name          Image size limit
// @version       0.3
// @namespace     http://glesik.ru/
// @description   Limits image size. Works on LiveJournal, Google Reader, spb-projects.ru and velopiter.spb.ru forums. When enabled on other websites, limits image width to browser window width.
// @icon          http://glesik.ru/playground/greasemonkey/image_size_limit.png
// @copyright     Copyright 2012 Alexander Inglessi
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include       http://*.livejournal.com/*
// @include       http*://*google.com/reader/*
// @include       http://spb-projects.ru/forum/*
// @include       http://velopiter.spb.ru/forum/*
// @grant         GM_addStyle
// ==/UserScript==

// 0.3  velopiter forum fix
// 0.2  spb-projects forum fix
// 0.1  Initial version

window_width = window.screen.availWidth;      // brwoser window width

max_size = window_width;                      // default limit

var host = window.location.href;

if (host.indexOf("livejournal.com") !=-1) {
  max_size = window_width - 50;               // padding (default style)
}

if (host.indexOf("google.com/reader") !=-1) {
  max_size = window_width - 313;              // sidebar & padding
}

if (host.indexOf("spb-projects.ru") !=-1) {
  max_size = window_width - 220;              // userpic & padding
}

if (host.indexOf("velopiter.spb.ru") !=-1) {
  max_size = window_width - 232;              // rough estimation for 1280px display
}

GM_addStyle("img {max-width:" + max_size + "px !important; height: auto !important;}");

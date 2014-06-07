// ==UserScript==
// @name           Digg Menu
// @namespace      http://loucypher.wordpress.com/
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// @description    Change behavior of the new Digg menu
// ==/UserScript==

/* This script has been deprecated */

var xpath = "//ul[starts-with(@id, 'submenu-news-list-')]";
var submenus = document.evaluate(xpath, document, null, 6, null);

if (!submenus.snapshotLength) return;

var css = "\
#submenu-news-list a.expand-closed { display: none !important; }\
#submenu-news-list > li:hover > ul { display: block !important; }\
#submenu-news-list > li > a {\
  background-image: url(data:image/gif;base64,\
R0lGODlhCwALALMAAP///5i+5Jm+5Jm/5AAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAA\
AAALAAsAQAQWEMhJ6RA1j5BBGB0lgGFpSuO5detJRQA7) !important;\
  background-position: center right !important;\
  background-repeat: no-repeat !important;\
}\
ul[id^=\"submenu-news-list-\"] {\
  position: absolute;\
  margin-left: 13em !important;\
  margin-top: -2em !important;\
  padding-bottom: 0 !important;\
  background-color: #fff !important;\
  border: 1px solid #b2d281 !important;\
  min-width: 14em !important;\
  z-index: 32768 !important;\
}\
.submenu-drop:not(#submenu-friends),\
.submenu-drop ul ul { padding: 0 !important; }"

GM_addStyle(css);

var submenu, menu;
for (var i = 0; i < submenus.snapshotLength; i++) {
  submenu = submenus.snapshotItem(i);
  menu = submenu.previousSibling;
  menu.appendChild(submenu);
}


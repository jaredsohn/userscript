// ==UserScript==
// @name        Kra v6 - Thème standard sable
// @namespace    
// @include     http://www.kraland.org*
// @version     1
// @UpdateVersion 3
// @downloadURL http://userscripts.org/scripts/source/155939.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155939.meta.js
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

css = "body, #framemenu,#left, #right {background:#E0D69D}"
+ " #central-content table.forum {background:#D6CC98;border:1px solid gray} "
+ " #central-content, #header, #foot, .right-newsbox-img, .left-box, .right-boxprofile-img {background:none!important}"
+ " #left table{background:#E0D69D} "
+ "#left .table-counters, div.submenu, div.divider+div img, .right-boxprofile-button img {border:1px solid #665533} "
+ ".sl a{border:1px solid #665533;background:#E0D69D}"
+ ".sl .on a{border:1px solid #665533;background:white}"
+ "td.tdb, td.tdbc, tr.forum-c2, .rbx {background:rgb(232, 224, 192)}"
+ "th.ths {background:rgb(214, 204, 152)}"
+ ".submenu li {border:none;border-bottom:1px solid #665533; }"
+ ".submenu li:last-child {border:none}"
+ ".submenu p{ color :#665533}"
+ "textarea {background:rgb(232, 224, 192)}"
+ "table.forum td {border:1px solid #665533} "
+ "td.forum-cartouche {background:rgb(224, 214, 157)} "
+ "#right-img, #left-img {display:none} "
+ ".right-boxprofile-button img {margin-top:1px}"
;

GM_addStyle(css);
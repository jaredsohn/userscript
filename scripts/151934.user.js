// ==UserScript==
// @name           Aaaa
// @namespace      aaaa
// @description    aaaa
// @version        1
// @author         Titus
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include        http://*ogame.*/game/index.php?page=galaxy
// ==/UserScript==

alert($("moon").class);
$("moon").children('a').toggleClass('tooltipRel');
// ==UserScript==
// @name           GaiaOnline - Fix Forum Coloring
// @namespace      http://userscripts.org/users/126924
// @description    Fixes any messed up colours caused by my other scripts
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".forum-list tbody tr").removeClass();
$(".forum-list tbody tr:even").addClass("rowon");
$(".forum-list tbody tr:odd").addClass("rowoff");
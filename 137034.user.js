// ==UserScript==
// @name           3DM
// @description    make 3DM Lighter
// @author         Whany K. Thunder
// @include        http://bbs.3dmgame.com/*
// @mathc          forum
// @version        1.0
// ==/UserScript==

$("body#nv_forum>table:lt(3)").hide();
$("div#postlist>div:gt(0)").hide();
$("div.wp.a_h").hide();
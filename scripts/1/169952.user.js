// ==UserScript==
// @name        LeetGamerz
// @namespace   kranack
// @include     http://www.leetgamerz.net/* 
// @include 	http://forum.leetgamerz.net/*
// @version     1.1
// ==/UserScript==

//	Site web

var pub_left = document.getElementById("adLeft");
var pub_top = document.getElementById("pub_top");
var pub_right = document.getElementById("pub_right");

//	Forum
var pub_forum_top = document.getElementById("ad_global_below_navbar");
var pub_forum_bottom = document.getElementById("ad_global_above_footer");

(pub_left != null) ? pub_left.style.display = 'none' : null;
(pub_top != null) ? pub_top.style.display = 'none' :  null;
(pub_right != null) ? pub_right.style.display = 'none' : null;
(pub_forum_top != null) ? pub_forum_top.style.display = 'none' : null;
(pub_forum_bottom != null) ? pub_forum_bottom.style.display = 'none' : null;
// ==UserScript==
// @name           Clay Magnet
// @namespace      Basilmarket
// @description    For keeping ClayGray at bay; why doesn't he want to stay, anyway?
// @include        http://basilmarket.com/*
// @include        *.basilmarket.*
// @exclude        http://www.basilmarket.com/bye.*
// ==/UserScript==

var Banner = "back2.gif";
document.head.innerHTML = document.head.innerHTML.replace(Banner, "back.gif");

var Start = document.head.innerHTML.indexOf(".clay");
var End = document.head.innerHTML.indexOf("#999}") + 5;
var Graymap = document.head.innerHTML.substring(Start, End);

document.head.innerHTML = document.head.innerHTML.replace(Graymap, " ");
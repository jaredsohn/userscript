// ==UserScript==
// @name           clien shortcut [d] block
// @namespace      clien d
// @description   단축키 D 막기
// @include        http://clien.career.co.kr/*
// ==/UserScript==


var intervalID;

intervalID = window.setInterval("if(keydata['d'] != null) { delete keydata['d'];}", 200);
setTimeout("window.clearInterval("+intervalID+");", 3000);
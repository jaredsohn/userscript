// ==UserScript==
// @name Board.RaidRush.ws - Make visted topicslinks Gray
// @namespace nanobyte.board.raidrush.ws.make.visted.topicslinks.gray
// @description Make links of visted topics grey
// @version 1.0
// @author Matthias Ruchay
// @include http://board.raidrush.ws/*
// ==/UserScript==

var s = document.createElement('style');
s.setAttribute('type','text/css');
s.innerText='a[href*="showthread.php?t="]:visited{color:#939393!important;}';
document.getElementsByTagName('head')[0].appendChild(s);v
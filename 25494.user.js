// ==UserScript==
// @name           Oz Time Display For Whirlpool.net.au
// @namespace      userscripts.org
// @description    Oz Time Display For Whirlpool.net.au
// @include        http://whirlpool.net.au/*
// @include        http://*.whirlpool.net.au/*
// ==/UserScript==

$=unsafeWindow.jQuery;
var lT = $('#left>dl:eq(2) dd')
var saveC = lT.html().split('&nbsp; ')[2];
lT.children('a:first').remove();
var t = lT.text();
var sT = t.split(' ');
var hS = sT[0].split('-');
lT.text(hS[2]+'-'+hS[1]+'-'+hS[0]+'  '+sT[1]+'  '+sT[2]);
lT.append('&nbsp; '+saveC);
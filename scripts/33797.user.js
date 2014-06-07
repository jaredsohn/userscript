// ==UserScript==
// @name           Hide Banner
// @namespace      www.goallineblitz.com
// @description    Hide the GLB Banner
// @include        http://goallineblitz.com/*
// @exclude        http://goallineblitz.com/game/replay.pl*
// ==/UserScript==



document.getElementById('header').setAttribute ("style","height:0px;");
document.getElementById('toolbar').setAttribute ("style","positioning: absolute; top: 0px;");
document.getElementById('content').setAttribute ("style","positioning: relative; top: -75px;");

// ==UserScript==
// @name        HPCraft
// @namespace   /hpcraft/
// @description Hpcraft little menu
// @include     http://*.hpminecraft.de/*
// @include     http://hpcraft.de:404/*
// @version     1
// ==/UserScript==    
var style='position:fixed;top:100px;background:#D7D7D7;width:130px;height:180px;border:2px solid rgb(156,112,77);color: #3A506B;font: 16px/22px blockstyle,Arial,Helvetica,sans-serif;text-shadow: 1px 1px #767676, -1px -1px #E5E5E5;text-align:center';  
var code='<div id="toolbar" style="'+style+'"><a href="http://www.hpminecraft.de/">HPCraft<a> <br><a href="http://www.hpminecraft.de/world/"><img width="120" src="http://www.hpminecraft.de/img/hpmap.gif"></a> <br><a href="http://www.hpminecraft.de/stats/"><img width="120" src="http://www.hpminecraft.de/img/hpstats.gif"></a><br><a href="http://board.hpminecraft.de/">Board<a></div>';
document.body.innerHTML+=code;
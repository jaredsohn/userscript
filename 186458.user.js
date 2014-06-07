// ==UserScript==
// @name        去广告
// @namespace   baidu
// @description 去百度贴吧广告
// @include     http://tieba.baidu.com/*
// @version     1
// @grant       none
// ==/UserScript==

function DeleteNode(str)
{
var element=document.getElementsByClassName(str);
//console.log(element);
while(element.length>0)
{
//console.log(element.length);
//console.log(element[0]);
element[0].parentNode.removeChild(element[0]);
}
}
DeleteNode("frs_game_spread");
DeleteNode("game_spread_thread");

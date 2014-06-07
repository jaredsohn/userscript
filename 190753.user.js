// ==UserScript==
// @name       紫荆全部频道链接
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://zijingbt.njuftp.org/*
// @copyright  2014+, Hsinchu
// ==/UserScript==

var allchannel;
var td_talk=document.getElementById("tdTalk");

allchannel=document.createElement("a");
allchannel.setAttribute("class","top_menu");
allchannel.setAttribute("href","/talk.html?channel=%E5%85%A8%E9%83%A8%E9%A2%91%E9%81%93");
allchannel.innerText="全部频道";

td_talk.appendChild(allchannel);   
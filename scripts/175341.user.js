// ==UserScript==
// @name        Scheveningenlive.nl blijflekkeropdewebcampaginaverdikkie
// @namespace   http://userscripts.org/users/88278
// @description Disables the redirect that occurs after 900 seconds of watching beach webcams on scheveningenlive.nl
// @include     http://www.scheveningenlive.nl/*
// @version     1
// @grant       none
// ==/UserScript==

//override "move" function with one that does nothing ;-)
//allow some time for original fn to appear, otherwise the switch takes place the other way around

document.onload(setTimeout('function move(){}',10000))

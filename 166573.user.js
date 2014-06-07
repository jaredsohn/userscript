// ==UserScript==
// @name       Disables static Toolbar on Meme Center + AdBlock
// @version		   1.0
// @namespace      http://userscripts.org/users/514417
// @author         MrAndroidster
// @description    No static Toolbar on Top
// @include 		http://memecenter.*/*
// @include 		http://*.memecenter.*/*
// @run-at         document-end
// ==/UserScript==

//Made by MrAndroidster
//Disables static/fixed Bar on Top and hides ad on right side
GM_addStyle(".header-b {position: relative!important;}");
GM_addStyle(".right-adv {display: none!important;}");
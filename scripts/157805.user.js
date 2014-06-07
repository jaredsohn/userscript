// ==UserScript==
// @name WildOnes Helper
// 
// @namespace      http://userscripts.org/scripts/show/157805
//
// @author         Nathan Harvey
//
// @license        Public domain 
//
//Version Number
// @version        0.1.4.4
//
// Urls to process this user script on
// @include	https://actiongames.playdom.com/games/*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @grant          unsafeWindow
//
// ==/UserScript==

unsafeWindow.setInterval(function(){
$('a.action-link').click();
},1000);
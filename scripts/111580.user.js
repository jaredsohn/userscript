// ==UserScript==
// @name More space! For G+
// @version 0.1
// @description More important space in Google+
// @author Мусаткин Роман
// @include https://plus.google.com/
// @include https://plus.google.com/*
// @include http://plus.google.com/
// @include http://plus.google.com/*
// ==/UserScript==
var sheet = document.createElement('style');sheet.innerHTML = ".a-ha-dh-R{opacity:0.8;margin-left:500px; position:fixed; top:40px; z-index:10} .a-ha-xg-R, .a-pu-R {display:none;} .a-ha-R  {border:none; background:none;} .a-ha-dh-R:hover {opacity:1} .a-ha-B, .a-ha-R {height:60px; padding:0; border:none;} .a-o-R {border-top:none; margin-top:-50px;}";document.body.appendChild(sheet);return false;
// ==UserScript==
// @name           kotoriko on the ad
// @namespace      kotoriko on the ad
// @description    なんとそこには元気に広告欄を埋めるコトリコの姿が!!!!!
// @include        http://twitter.com/*
// ==/UserScript==

( function(){

var ad = "kotoriko";
ad = '<div><a href="http://twitter.com/kotoriko"><img style="width: 185px; height: 185px; overflow: hidden; vertical-align: bottom; alt="kotori" src="http://a1.twimg.com/profile_images/20335122/boku.png" /></a></div>'
document.getElementById("side_ad_base").innerHTML = ad;

}) ();
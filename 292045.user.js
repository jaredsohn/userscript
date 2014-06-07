// ==UserScript==  
// @name        Torrentday Banner  
// @namespace   fr.kergoz-panic.watilin  
// @description Changes the banner.  
// @include     http://www.torrentday.com/*  
// @version     1  
// @grant       none  
// ==/UserScript==

var $banner = document.querySelector("div a img");  
$banner.src = "http://static.torrentday.me/td/banners/lone.jpg";
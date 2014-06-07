// ==UserScript==
// @name       AirDroid v. 2.0 as Default Site
// @namespace  v2.airdroid.com
// @version    1.0
// @description  When going on www.AirDroid.com it will make www.v2.AirDroid.com
// @include    *v2.AirDroid.com*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright  LouisTheTipper
// ==/UserScript==

var AirDroid_default = "www.web.AirDroid.com";
var AirDroid_homepage = "http://v2.AirDroid.com/";

if (window.location.hostname+window.location.pathname == AirDroid_default){
  window.location.replace(AirDroid_homepage);
}
var AirDroid_full = window.location.protocol + "//" + AirDroid_default;
var AirDroid_links = document.querySelectorAll("a[href='/'], a[href='"+AirDroid_full+"']");
for (var AirDroid_i = 0; yt_i < AirDroid_links.length; AirDroid_i++) {
  AirDroid_links[yt_i].setAttribute("href",AirDroid_homepage);
}

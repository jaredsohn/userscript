// ==UserScript==
// @name           hideListingAd
// @description    hideListingAd
// @namespace      kuroao_cats
// @include        http://detail.chiebukuro.yahoo.co.jp/*
// @include        http://list.chiebukuro.yahoo.co.jp/*
// @include        http://chiebukuro.yahoo.co.jp/dir/*
// @grant          none
// @version        1.0.0
// ==/UserScript==

var doc = document;
var im_head = doc.getElementById("im_head");
var im_main = doc.getElementById("im_main");
var im_main1 = doc.getElementById("im_main1");
var im_main2 = doc.getElementById("im_main2");
var im_sub = doc.getElementById("im_sub");
var pager = doc.getElementById("yschpg");
var sqb_main = doc.getElementById("sqb_main");
var iframe = doc.getElementsByTagName("iframe");

if (null != im_head) im_head.innerHTML = null;
if (null != im_main) im_main.innerHTML = null;
if (null != im_main1) im_main1.innerHTML = null;
if (null != im_main2) im_main2.innerHTML = null;
if (null != im_sub) im_sub.innerHTML = null;
if (null != pager) {
   
   var div = pager.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
   div.innerHTML = null;

}


if (null != sqb_main) {
   sqb_main.innerHTML = null;
}

if (null != iframe) {
   for (var i=0,len=iframe.length;i<len;i++) {
      if (-1 < iframe[i].src.indexOf("yjaxc-iframe")) {
         iframe[i].parentNode.innerHTML = null;
      }
   }
}

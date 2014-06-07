// ==UserScript==
// @name           iphone reservation
// @namespace      random
// @description    a little hack
// @include        https://reserve.apple.com/HK/zh_HK/reserve/iPhone
// @require https://reserve.apple.com/rprcustomer/11093/scripts/jquery-1.6.js
// ==/UserScript==

$("#store").removeAttr("disabled");

var iphoneskus = jQuery('[plansenabled="true"]');
iphoneskus.each(function (i) {
    jQuery(this).attr("plansenabled", false);
});
// ==UserScript==
// @name        Yahoo HK News AD Remover
// @namespace   www.nightrail.com
// @description Remover the AD
// @include     https://hk.news.yahoo.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.1
// @grant       none
// ==/UserScript==


//Avoid jQuery conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

// alert("jq ok");
$("#umu_ysm_container").remove();
// $("#yom-ad-NP4").remove();
// $("#yom-ad-LREC2").remove();
// $("#yom-ad-NP3").remove();
// $("#yom-ad-POP").remove();
// $("#yom-ad-N2").remove();
// $("#yom-ad-AS1").remove();

//$(".yom-ad.yom-ad-LREC").remove();
//$(".yom-ad.yom-ad-NP1").remove();
//$(".yom-ad.yom-ad-NP2").remove();
$(".yom-ad").remove();
$("#adx_ldo0_310309").remove();



// ==UserScript==
// @name        Mobile01 AD Remover
// @namespace   www.nightrail.com
// @description Remove advrtisement form mobile.com
// @include     http://www.mobile01.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// @grant       none
// ==/UserScript==


//Avoid jQuery conflicts
this.$ = this.jQuery = jQuery.noConflict(true);

// Top header AD
//$("#ad_46139").html("");

// Middle AD
//$("#ad_45955").html("");
//$("#ad_45861").html("");

$('div[id^="ad_"]').html("");

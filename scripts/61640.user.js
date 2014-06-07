// ==UserScript==
// @version     1.0
// @name        VeryCD Subtitle Helper
// @author      Meng Zhou
// @description Show the real URL of subtitle on VeryCD.
// @include     http://www.verycd.com/files/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

jQuery("#subtitle a:first-child").each(function(i, a) {
  var href = jQuery(a).attr("href");
  var realUrl = href.replace(/.+\|s=(.+)\|.+/, "$1");
  jQuery(a).after("<span>&nbsp;</span><a href=\"" + realUrl + "\">http</a>");
});

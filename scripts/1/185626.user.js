// ==UserScript==
// @name	  RB.com
// @namespace	  http://userscripts.org/users/130612
// @description   Direct image display
// @match         http://redblow.com/*
// @version       0.1
// ==/UserScript==

jQuery('img.attachment-medium').each(function(ix, element){
   var $element = jQuery(element);
   $element.parent().attr('href', $element.attr('src').replace(/(-\d+x\d+)/, ''));
});
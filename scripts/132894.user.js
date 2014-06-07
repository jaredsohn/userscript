// ==UserScript==
// @name         GitHub AutoMore
// @namespace    http://ngsdev.org/
// @version      1.0
// @description  Hits more button automaticallly
// @match        https://github.com*
// @copyright    2012, Atsushi Nagase
// ==/UserScript==

!function(window, $, $window, div){
  $ = window.jQuery;
  $window = $(window).bind("scroll", function(){
    div = $(".ajax_paginate");
    if(!div.hasClass("loading") && $window.scrollTop()+ $window.height() > div.offset().top)
      div.find("a").trigger("click");
  });
}(window.parent);
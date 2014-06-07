// ==UserScript==
// @name           Ma Petite Mercerie
// @namespace      com.mapetitemercerie
// @description    Améliorations Ma petite mercerie
// @include        http://www.mapetitemercerie.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

(function($) {
  $('#categories_block_left ul li ul li a').each(function(index) {
    var navElementHref = $(this).attr('href');
    $(this).attr('href', navElementHref + '?n=999');
  });

  $('#product_list a.product_img_link').each(function(index) {
    var smallProductImgSrc = $(this).children('img').attr('src');
    var bigProductImgSrc = smallProductImgSrc.replace('home', 'large');
    $(this).bind('mouseenter', function() {
      $('body').append('<div id="overlay" style="position: fixed; top: 0; left: 0">'
          + '<img src="'+ bigProductImgSrc + '" />'
        + '</div>');
    });
    $(this).bind('mouseleave', function() {
      $('#overlay').remove();
    });
  });
})(jQuery)


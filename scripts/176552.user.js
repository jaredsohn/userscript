// ==UserScript==
// @name       Sahibinden.com Print View
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  Sahibinden.com ilan sayfalarinda kucuk fotolari buyuk olarak
// alt alta gosterir, header blogunu ortadan kaldirir. Bu script duzgun PDF
// print alip ilani saklamak icindir. Ilanlarin suresi bir sure sonra bitiyor
// tekrar baktigimizda ozellikleri goremiyoruz, halbuki ilgili ilandaki meta
// halen satista olabiliyor.
// @match      http://www.sahibinden.com/ilan/*
// @copyright  2012+, R. Tolga Korkunckaya <tolga@profelis.com.tr>
// ==/UserScript==

$(document).ready(function($) {
   
  $('.adThumbContainer').each(function() {
      $(this).attr('style', 'width:480px; height:360px;');
  });

  $('.adThumbContainer img').each(function() {
    
    var src = $(this).attr('src');
    $(this).attr('src', src.replace('thmb_', ''));
    $(this).attr('style', 'width:480px; height:360px;');
    $(this).removeAttr('width');
    $(this).removeAttr('height');
    
  });
  $('#header').remove();
  $('#footer').remove();
  $('#yourSecurity').remove();

});
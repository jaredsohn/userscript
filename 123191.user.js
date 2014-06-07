// ==UserScript==
// @name           Maximize MTBR Forum Page Content
// @namespace      http://userscripts.org/users/74338
// @include        http://forums.mtbr.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

// CHANGELOG
// 1.0.0 (01-24-2012)
//   Initial Release
// 1.0.1 (02-18-2012)
//   Support for updated mtbr layout
// 1.0.1a(02-21-2012)
//   Fixed stupid mistake in @include
// 1.1   (02-26-2012)
//   Added grip to toggle header visibility

try {
  $('<style>' + 
    '.forums-sidebar, .forums-sidebar .widget-area, .forums-sidebar .facebook, .forums-sidebar .list-wrap, #interbike-sidebar, .forums-sidebar .mpu { width: 150px !important; }' +
    '.forums-sidebar .facebook, .forums-sidebar .hotdeal-one { overflow-x: scroll; }' + 
    '.forums-sidebar .widget-title { font-size: 10px; font-weight: bold; }' + 
    '.forums-sidebar .index-box { width: 20px !important; }' +
    '.forums-sidebar .review-index-margin .index-box img { width: 40px !important; height: 40px; }' +
    '.forums-sidebar .review-index-margin h4 span, #interbike-sidebar a { font-size: 9px !important; }' + 
    '#logo, #top-container .full-bg03 { display: none; }' + 
    '#hdr-grip { border-top: 3px solid #999; cursor: pointer; height: 8px; background-color: #fff; width: 100%; text-align: center; background-image: url("http://i41.tinypic.com/11lrgx4.jpg"); background-repeat: no-repeat; background-position: top center; }' +
    '</style>').appendTo('head');
  
  $('.review-index-margin h4').css('margin-bottom', '0');  
  $('.review-index-margin h4 span').css('font-size', '9px');
  
  // video w/ flashblock
  $('.forums-sidebar > p > div').css({
    width: 150,
    height: 125
  });
  // regular video
  $('.forums-sidebar > p > obj').each(function() {
    $(this).attr('width', '150').attr('height', '125');
  });
  
  $('#interbike-sidebar > table').attr('width', '150');
  $('.forums-sidebar div[id*="google_ads"] iframe').attr('width', '150');
  
  $('#side-bar-box iframe').width(150).css('overflow-x', 'scroll');
  $('h3[id="title-bar"],div[id="side-bar-box"]').width(150);
  
  $('<div id="hdr-grip"/>').insertAfter('#top-container .new-forums-bg-full').click(function(){
    $('#logo, #top-container .full-bg03').toggle();
  });
  
} catch(e) {
  alert('Could not apply customization: ' + e);
}
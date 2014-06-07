// ==UserScript==
// @name           Simpler Hacker News
// @namespace      hackernews
// @description    Hide stuff that's not strictly necessary on Hacker News
// @license        BSD
// @include        http://news.ycombinator.com/*
// ==/UserScript==

function jQueryIsReady($) {
  $('body').css('font', 'medium verdana, arial, helvetica, sans-serif');
  $('a').css('font-size', 'medium');
  $('.pagetop a').css('font-size', 'small');
  $.each($('.pagetop a'), function (i, v) {
   if (/threads|comments|jobs/.test(v.text)) {
    $(v).hide();
   }
  });
  $('.pagetop').css('padding-left', '10px');
  $('.pagetop').css('color', '#fff');
  $('.subtext a').css('display', 'none');
  $('.subtext').css('color', '#fff');
  $('.subtext span').css('color', '#999');
  $('a').css('color', 'blue');
  $('a:visited').css('color', '#581C90');
  $('center:nth-child(4)').hide();
  $('table').css('background-color', '#fff');
  $('td:first').css('background-color', '#fff');
  $('table table:first').css('background-color', '#fff');
  $('table table:first').css('border-bottom', '1px dotted #999');
  $('table table:first').css('margin-bottom', '8px');
  $('tr:nth-child(4):last').hide();
  $('.pagetop a:first').text('HN    ');
  $('.pagetop a:first').css('font-weight', 'normal');
  $('center table:first').css('width', '60%');
  $('a img:first').hide();
}


// -----------------------------------------------------------------
// Greasemonkey/GreaseKit compatibility
// -----------------------------------------------------------------

if (typeof(unsafeWindow) === 'undefined') {
 unsafeWindow = window;
}

// -----------------------------------------------------------------
// jQuery
// -----------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://jquery.com/src/jquery-latest.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  unsafeWindow.jQuery.noConflict();
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);




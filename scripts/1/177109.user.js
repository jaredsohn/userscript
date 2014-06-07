// ==UserScript==
// @name       Simple lightbox for Wikipedia
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Adding simple lightbox for images on Wikipedia
// @grant       none
// @match      http://*.wikipedia.org/*
// @copyright  2013+, You
// ==/UserScript==

$(document).ready(function() {
  $('body').append('<div id="lightbox" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);text-align:center;z-index:9999"></div>');
  $('a.image').click(function(e) {
    e.preventDefault();
      if ($(this).find('img').attr('src').match('/thumb/')) {
      	var src = 'http:' + $(this).find('img').attr('src').replace('/thumb','').replace(/\/[\-_.%\w]*$/, '');
      } else {
        var src = $(this).find('img').attr('src');
      }
    $('#lightbox')
      .html('<img src="'+src+'" style="background:#fff;box-shadow: 0 0 25px #111;max-height:100%;max-width:100%;vertical-align:middle;cursor:pointer;" />')
      .css('line-height', $(window).height()+'px')
      .fadeIn('fast')
      .live('click', function() {
        $(this).fadeOut('fast');
    });
  });
});
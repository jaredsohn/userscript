// ==UserScript==
// @name           Lafa hide read posts
// @namespace      http://userscripts.org/users/zhekanax
// @include        http://lafa.garin.su/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
if($) init();

function init() {
  $('.lenta-block').each(function() {
    if ($(this).find('a.post-comment strong').length != 1 && $(this).find('a.post-comment').length) {
      $(this).hide();
      $('<a href="#" style="display: block; margin: 0 0 20px 35px; font-size: 0.8em;">'+$(this).find('h3').text()+'</a>')
        .click(function() {
          $(this).next().show();
          $(this).remove();
          return false;
        })
        .insertBefore(this);
    }
  });
}

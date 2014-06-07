// ==UserScript==
// @name           VK_NewsCommentsDefaultHide
// @namespace      http://amse.ru
// @include        http://vkontakte.ru/newsfeed.php
// @include        http://vkontakte.ru/newsfeed.php?section=statuses
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var divS = 'div[class="replies_wrap"]';

$(divS).each(function() {
  var a = $('<a href="javascript:void(0);">[+]</a>');
  a.click(function() {
    var div = $(this).parent().children(divS);
    if (div.css('display') == 'none') {
      a.text('[-]');
      div.css('display', 'block');
    } else {
      a.text('[+]');
      div.css('display', 'none');
  }    
  });
  $(this).before(a);
  $(this).css('display', 'none');
});
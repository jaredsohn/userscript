// ==UserScript==
// @name           PtP - Dark bg for forum icons
// @namespace      http://notsecret.dyndns.org
// @description    makes sticky and lock bg dark on light themes
// @author         p4lindromica
// @include        http://*passthepopcorn.me/forums*
// @include        https://*passthepopcorn.me/forums*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


$('img').each(function() {
  if ($(this).attr('src') == 'static/forums/sticky.png' || 
      $(this).attr('src') == 'static/forums/lock.png' ||
      $(this).attr('src').match(/\/images\/go_last_read.png/))
  {
    $(this).css('background', '#231f20').css('padding', '3px');
  }
});
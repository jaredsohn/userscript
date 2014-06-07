// ==UserScript==
// @name           TheMarker Cafe Junk Remover
// @namespace      http://userscripts.org/users/605
// @description    Removes junk elements from TheMarker cafe pages (bottom bar, top haaretz navigation bar and news scroller, welcome message, discussion arrow, transparent boxes).
// @include        http://cafe.themarker.com/*
// @include        http://*.cafe.themarker.com/*
// @include        http://cafe.mouse.co.il/*
// @include        http://*.cafe.mouse.co.il/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* no offence, guys! but this was too stupid. */

(function ($) {
  // hide some stupid junk
  $('#bottom_navigator, #outer_news_wrapper, .top_header .outer_content, .go_to, .cafe_welcome, .footer tr:gt(0), .mouse_footer ul:gt(0), a.tour, .financed_linked_content, .twitter_link, .banner_92008').hide();

  // remove the fscking ARROW pointing to where the reply button is
  $('.thread_arrow').css({'background': 'none', 'height': 'auto', 'margin': '0'}).find('.action_bar').css('padding', '0');

  // fix some spacing and bg images
  $('.footer, .mouse_footer, p.pager').css({'margin': '0', 'padding': '0'});
  $('.mouse_footer').css('background', 'white');
  $('.body.mouse').css('background-position', '50% 62px');
  $('body').css('background-position', '50% -171px');

  // fix the top personal navigation bar in firefox
  $('.user_nav').width(380);

  // not homepage
  if (!$('.body.hmpg').length)
  {
    // fix those stupid transparent boxes
    $('.a_box').each(function()
    {
      if ($(this).css('background-color') == 'transparent')
      {
        $(this).css('background-color', $('body').css('background-color'));
      }
    });
  }
  else
  {
    // fix homepage posts box tabs (broken width)
    $('#tab_ajax_blog_0, #tab_ajax_blog_2').width(110);
  }
}(jQuery));
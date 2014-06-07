// ==UserScript==
// @name           Croudia AutoPager
// @namespace      http://yungsang.com/croudia
// @description    Click "More" button in a timeline automatically
// @include        https://*croudia.com/*
// @author         YungSang
// @version        0.1
// ==/UserScript==
// 0.1 : 2013/10/17 : First release 

(function(window) {
  var $ = window.jQuery;

  var REMAIN_HEIGHT    = 0;
  var REQUEST_INTERVAL = 2000;

  var more_buttons = [
    '#timeline_more',
    '#all_voice_more',
    '#user_voice_more',

    '#following_more',
    '#follower_more',
    '#user_album_more',
    '#spreadia_more',
    '#favodia_more',

    '#search_voice_list_more',
    '#search_friend_list_more',
    '#search_profile_list_more',
    '#tag_user_list_more',
    '#beginners_list_more',

    '#unit_user_more',
    '#unit_voice_more',
    '#gold_history_more',
    '#reply_list_more',
    '#secretmail_more',
    '#favorite_more'
  ];

  var requested = 0;

  function onscroll () {
    var now = (new Date()).getTime();
    var remain = getScrollHeight() - window.innerHeight - window.scrollY;
    if (!(requested && ((now - requested) < REQUEST_INTERVAL)) && (remain <= REMAIN_HEIGHT)) {
      requested = (new Date()).getTime();
      $(more_buttons.join(',')).trigger($.Event("tap"));
    }
  }

  window.addEventListener("scroll", onscroll, false);

  function getScrollHeight() {
    var document = window.document;
    return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  }
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           fb_buttons
// @namespace      http://userscripts.org/users/285367
// @include        http://www.facebook.com/*
// @include        http://facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        https://github.com/malsup/form/raw/master/jquery.form.js?v2.43
// ==/UserScript==

if (window == parent) {
  window._fb_buttons_actions = [
    {
      'name': 'dislike',
      'title': 'Dislike',
      'label': 'Dislike',
      'like': 'false',
      'comment': '*dislike* :('
    },
    {
      'name': 'congrats',
      'title': 'Congratulations',
      'label': 'Congrats!',
      'like': 'true',
      'comment': 'Congratulations! :D'
    },
    {
      'name': 'boo',
      'title': 'Boo',
      'label': 'Boo',
      'like': 'false',
      'comment': 'Boooooooooo -____-'
    },
    {
      'name': 'pwn',
      'title': 'PWNED!!',
      'label':' PWNAGE',
      'like': 'false',
      'comment': 'PWNED!'
    },
    {
      'name': 'win',
      'title': 'EPIC WIN',
      'label': 'EPIC WIN',
      'like': 'true',
      'comment': 'EPIC WIN!!!'
    },
    {
      'name': 'fail',
      'title': 'EPIC FAIL',
      'label': 'EPIC FAIL',
      'like': 'false',
      'comment': 'EPIC FAIL!!!'
    },
    {
      'name': 'sad',
      'title': 'sad',
      'label': ':(',
      'like': 'false',
      'comment': 'Oh no!! :('
    }
  ];
  window._fb_buttons_alter = function() {
    for (i in window._fb_buttons_actions) {
      if (i == 0) {
        $('form.commentable_item  span.UIActionLinks:not(._fb_buttons_processed-' + window._fb_buttons_actions[i].name + ')').addClass('_fb_buttons_processed-' + window._fb_buttons_actions[i].name).append('<br /><label title="' + window._fb_buttons_actions[i].title + '" onclick="return window._fb_buttons_clicked(this, \'' + window._fb_buttons_actions[i].comment + '\', ' + window._fb_buttons_actions[i].like + ');" class="comment_link">' + window._fb_buttons_actions[i].label + '</label>');
      }
      else {
        $('form.commentable_item  span.UIActionLinks:not(._fb_buttons_processed-' + window._fb_buttons_actions[i].name + ')').addClass('_fb_buttons_processed-' + window._fb_buttons_actions[i].name).append(' · <label title="' + window._fb_buttons_actions[i].title + '" onclick="return window._fb_buttons_clicked(this, \'' + window._fb_buttons_actions[i].comment + '\', ' + window._fb_buttons_actions[i].like + ');" class="comment_link">' + window._fb_buttons_actions[i].label + '</label>');
      }
    }
    setTimeout(window._fb_buttons_alter, 1000);
  };
  unsafeWindow._fb_buttons_clicked = function(self, str, like) {
    if (like) {
      // Throws exception on firefox. Catch it.
      try {
        $(self).parents('form:first').find('.like_link:first').filter(function() {
          return $(this).attr('name') == 'like';
        }).click();
      }
      catch (e) { }
    }
    if (str) {
      var postData = {};
      $(self).parents('form:first').find(':input').each(function() {
        if ($(this).attr('name') != 'like') {
          postData[$(this).attr('name')] = $(this).val();
        }
      });
      postData.add_comment_text = str;
      postData.post_form_id_source = 'AsyncRequest';
      $.post($(self).parents('form:first').attr('action') + '?__a=1', postData);
      
    }
    return false;
  }
  window._fb_buttons_alter();
}

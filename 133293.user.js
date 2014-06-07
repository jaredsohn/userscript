// ==UserScript==
// @name        Gaia - Shorten Friends List Page
// @author      Knight Yoshi (http://www.gaiaonline.com/p/7944809)
// @description   Remove empty <tr> elements
// @include        http://www.gaiaonline.com/friends/*
// @include        http://www.gaiaonline.com/profile/friendlist.php?*
// @require        http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==
$(function shorten() {
      var rmtr = $('#listdetail tr');
      var listdetail = $('#listdetail');

      $(rmtr).filter(function() {
        return $.trim($(this).text()) === '';
      }).remove();

      $(listdetail).css('margin', '0');
});
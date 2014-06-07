// ==UserScript==
// @name        DeeJayz Bugzilla Filtering Script
// @version     0.3
// @namespace   http://nagwani.in/greasemonkey/bugzilla/
// @description Allows you to filter the bugs from the list of displayed bugs. Filtering works on all columns visible in the list. You need to setup the include (@include) URL to point to your bugzilla installation root, e.g., http://bugzilla.server.ip.or.name/*
// @author      DeeJay (deejay@nagwani.in)
// @homepage    http://blogs.nagwani.in
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://*bugzilla.*
// ==/UserScript==

var filteredCol = {};

$(document).ready ( function () {
  count = 0;

  $('.bz_buglist_header').children().each (function () {
    filteredCol[count++] = false;
  });

  $('.bz_bugitem > td').not('.first-child').css('cursor', 'pointer');

  $('.bz_bugitem > td').not('.first-child').click (function () {
    item = $(this).html().trim();

    count = 0;
    $(this).parent().children().each (function () {
      col = $(this).html().trim();
        if (item == col) {
          return false;
        } else {
          count++;
        }
    });

    if (!filteredCol[count]) {
      i = 0;
      hiddenItems = {};
      $('.bz_bugitem').each (function () {
        $(this).children().eq(count).each (function () {
          sameItem = $(this).html().trim() == item;
          if (!sameItem) {
            hiddenItems[i++ + $(this).html().trim()] = $(this).parent();
            $(this).parent().hide();
          }
        });
      });

      $(document).data('' + count, hiddenItems);
      $('.bz_buglist_header').children().eq(count).css('border', '1px solid red');
    } else {
      hiddenElements = $(document).data('' + count);
      for (key in hiddenElements) {
        $(hiddenElements[key]).show();
        delete hiddenElements[key];
      };

      $('.bz_buglist_header').children().eq(count).css('border', '');
    }

    filteredCol[count] = !filteredCol[count];

    for (key in filteredCol) {
      if (filteredCol[key]) {
        hiddenElements = $(document).data('' + key);
        for (element in hiddenElements) {
          $(hiddenElements[element]).hide();
        };
      };
    };

    $('.bz_result_count').html($('.bz_bugitem:visible').length + ' bugs found. ');
  });
});

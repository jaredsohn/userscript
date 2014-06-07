// ==UserScript==
// @name       Literotica De-Pager
// @namespace  http://www.literotica.com/depager
// @version    1.0
// @description  De-pages stories on literotica.com
// @match      http://www.literotica.com/s/*
// @copyright  2013+, cm42
//
// @require http://code.jquery.com/jquery-2.0.1.min.js
// ==/UserScript==

(function ($) {
  $(function () {
    var $root = $('#root'),
        offset = 560, // calculate this rather than hardcoded
        $body = $('.b-story-body-x'),
        $jump = $('<div id="jump" class="b-sidebar"><div style="position:fixed; width: 200px; background-color: white;"><a href="#root">Top</a></div></div>').prependTo($root),
        $pages_menu = $('<div id="pages_menu" style="margin-top: 2em;" />').appendTo($jump),
        $pages = $('select[name="page"]').find('option.current').nextAll(),
        $last_page = $pages.last();
    
    $('head link[rel="stylesheet"][href="/sc/css/page-submission/vK.css"]')
      .after('<link rel="stylesheet" href="/sc/css/page-submission-pages/vK.css" type="text/css">');
    
    // Page separator
    $('<h3 class="page_separators" style="margin: 2em auto; font-weight: bold;" id="top" />')
      .prependTo($body);
    
    var dfd_pages = [];
    
    $pages.each(function () {
      
	  var $current_page = $(this),
          page_number = $current_page.attr('value'),
          page_id = 'page-' + page_number,
          page_text = 'Page ' + page_number,
          $this_page;
      
      // Page separator
      $('<h3 class="page_separators" style="margin: 2em auto; font-weight: bold;" />')
        .text(page_text)
        .attr('id', page_id)
        .appendTo($body);
      
      $('<a />').text(page_text).attr('href', '#' + page_id).wrap('<p />').parent().appendTo($pages_menu);
      
      $this_page = $('<div />').appendTo($body);
      
      var dfd_page = $.get('', {page: page_number}).done(function (data) {
        
        var $data = $(data);
        
        $data.find('.b-story-body-x > div > p').appendTo($this_page);
        
        // Grab the other chapters in story
        if ($current_page.is($last_page)) {
          $data.find('#content > .b-sidebar').replaceAll('#content > .b-sidebar');
        }
      });
      
      dfd_pages.push(dfd_page);
      
    });
    
    // Only after every page is loaded do we attempt to do anything with scrolling.
    $.when.apply($, dfd_pages).done(function () {
      
      // Move to chaper in location.hash.
      $(window).scrollTop($(window.location.hash).offset().top);
      
      // When scrolling, automatically set the hash to the current page.
      $(window).scroll(function () {
        
        var scroll = $(window).scrollTop();
        
        var current_page = $('.page_separators').filter(function () {
          return ($(this).offset().top - scroll) < 1;
        }).last().attr('id');
        
        var target = '';
        
        if (typeof current_page !== 'undefined') {
          target = '#' + current_page;
        }
        
        window.history.replaceState({}, '', target);
        
      });
      
    });
    
    
    
  });
})(jQuery);
// ==UserScript==
// @name           stackoverflow.com keyboard shortcuts
// @namespace      org.simplememes
// @description    add simple keyboard navigation to stackoverflow.com (j - next, k - prev, o - open new tab, v - open same window)
// @include        http://stackoverflow.com/*
// ==/UserScript==

// Thank you to joanpiedra.com for the jquery+greasemonkey love.

  GM_addStyle(".question-summary { border-left: 5px solid #fff; }");
  GM_addStyle(".sm_nav_cursor { border-left: 5px solid #ccffcc; }");
  
  // All your GM code must be inside this function
  function letsJQuery() {
    $(".question-summary,.answer").eq(0).addClass('sm_nav_cursor');
    $(document).keypress(function(e){
      if(e.target.tagName=="HTML"){
        var cursorClass="sm_nav_cursor";
        var cursorSelector="."+cursorClass;
        var cursor = $(cursorSelector);
        cursor.removeClass(cursorClass);
        switch (e.which) {
        case 106: /* j */
          cursor = moveCursorOrPage(cursor,
                                    cursor.nextAll(".answer,.question-summary:not(.tagged-ignored-hidden)").eq(0),
                                    ".pager .next");
          scrollToCursor(cursor);
          break;
        case 107: /* k */
          var next_cursor = cursor.prevAll(".answer,.question-summary:not(.tagged-ignored-hidden)");
          cursor = moveCursorOrPage(cursor,
                                    next_cursor.eq(next_cursor.size()-1),
                                    ".pager .prev");
          scrollToCursor(cursor);
          break;
        case 118: /* v - open in same window */
          loadQuestionLink(cursor,"same");
          break;
        case 111: /* o - open in tab */
          loadQuestionLink(cursor,"tab");
          break;
        }
        cursor.addClass(cursorClass);
      }
    });
  }

  function loadQuestionLink(cursor, type) {
    var url = cursor.find(".question-hyperlink").attr("href");
    if(typeof(url) != 'undefined'){
      url = "http://stackoverflow.com"+url;
      switch (type) {
      case "same":
        window.location = url;
        break;
      case "tab":
        GM_openInTab(url);
        break;
      }
    }
  }

  function loadPageLink(selector){
    var url = $(selector).parent().attr("href");
    if(typeof(url) != 'undefined'){
      window.location=url;
    }
  }
  
  function moveCursorOrPage(cursor,newCursor,linkSelector){
    if(newCursor.size()==0){
      loadPageLink(linkSelector);
    } else {
      cursor=newCursor;
    }
    return cursor;
  }

  function scrollToCursor(cursor){
    var top_offset=cursor.offset().top - (document.documentElement.clientHeight/2) + (cursor.height()/2);
    if(top_offset>0){
      window.scrollTo(0,top_offset);
    }
  }

  // Add jQuery
  var GM_JQ = document.createElement('script');
  GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
  GM_JQ.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(GM_JQ);

  // Check if jQuery's loaded
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
  }
  GM_wait();

// ==UserScript==
// @name        Facebook Advanced AdBlocker
// @description Blocks ads in your Facebook stream (togglable + info)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @namespace   http://userscripts.org/users/470905
// @updateURL   https://userscripts.org/scripts/source/160607.meta.js
// @downloadURL https://userscripts.org/scripts/source/160607.user.js
// @include     *facebook.com/*
// @grand       none
// @version     1.3
// ==/UserScript==

// prevents jQuery conflicts with Facebook
this.$ = this.jQuery = jQuery.noConflict(true);

var blockPng  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAb1JREFUKJFdzz1oU2EYxfHzvO9zEzKJItihg9DiokuWYIuILgFTFQwXBweTIUNDAoKCILgJDg5d2yka8jGEGDAEQSg6lWARurSDgtAisZAuImS4pPc5Lo1U//OPA0dw0nA4PJdKpR6JSBHAvIiA5Ihki+RaOp0+AgABgM3NzUvOufcisuCc++ic2xYRZ2ZXzew6ya/T6TTMZrO7MhgMzh4fH2+TPJNMJu/lcrktnKrX630WkYyI7CcSiYyOx+PHqrpIcrlQKAxP43q9vj6ZTDIAfprZxSiKnupkMik55z5VKpV/8MbGxnoURatxHO8CuBPH8VuSD1wikZjz3m/9h58DWDWzb3Ec3y6Xy/uq+iUIgjkNggAkZYZrtdozki9IHsRxnKtWqwcAcOKg3vsxgGUAaDQaD83sJYARyZVSqfR9NqSqywAOnaq+VtWbrVZrzTn3RlWPgiDIFYvFvRluNpt3VfWK974n7Xb7vPd+CGCR5G9VvRGG4c4MdzqdFTNri8gvM1sSAOh2u5dF5B2ABQAfSO4A8CSvOeeWAPwgeSsMw72/Z/v9/gUze2Jm9wHMA4CIjAD0SL7K5/OHAPAHeKzPhmd10L0AAAAASUVORK5CYII=",
    togglePng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAALCAYAAAAndj5aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEZEMTk0QkU5NDhFMTFFMjlDRTlDMjYwOEU3NEU1REQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEZEMTk0QkY5NDhFMTFFMjlDRTlDMjYwOEU3NEU1REQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRkQxOTRCQzk0OEUxMUUyOUNFOUMyNjA4RTc0RTVERCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRkQxOTRCRDk0OEUxMUUyOUNFOUMyNjA4RTc0RTVERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg6gU/4AAAIwSURBVHjatFZLjxJBEK6Z6WGeJgJ/AGI8oAiXTTh44cDNaDaSMVGIe+Bkwl/iYEI4gBoT8QYJF7ywHOBiovEXENwDbwZmrJqwRCJstlutpKdfqfrq6+rqGqlSqYRkWT4DgHvYDOCQTqcDArLA9gPb5W4uhE2SzWaFsD3Pu2T4OUsmkxfpdDqvaVqUx0osFoN4PM6FvFwux71e712r1QrmuVzudSKRcHRdj/DYGY1G3MRXq9V4MBi8Hw6HwFzXvZ9KpfKMseh2u+UOH6+OqqrRTCbjIPEuzR88fPRCUVh4ww/NjU0ciWu/3//C1uu1qSiKEOmdsaPrjUYDHMc5umeaZuT6alt3wmHXXQthi/hMXIkzEZfwuoMocYwg997vh6WoOvig3B5QkvbDzWYjQhyIM4O/FHwYD+bVanU/rtVqQV8sFk/ryCH05tDG5w9v/8B58vwC/qVQxGU6OZGI+74P+CAerJVKpaDHarEfHzt1il3ggGqApBxin798cytskYiTHnFm+NIJX3UCPpXjN+U/RRzBA/ZaSAbfAyFsEZ8lTBXiTMSX8/l8jM5EeY2g8yfzuFwuny6mi8VP1HVp7G1WV4ahh0WwRSKOemPizCaTybd2u93EmvjUMIwIL/hNET8m0+n0ql6vN5H89yCfP9Y+nedfPbNt8+7/xqYDx5+uJnGWCoWChs48xvUEVRoeQ7PZTBJ4V2bYvmKed3cl6Rrb4jVkWZbPqTInbNu2u78EGADcAgQHrTniYwAAAABJRU5ErkJggg==";

var GLOBAL_SEL     = '#globalContainer',
    STREAM_SEL     = '#home_stream',
    
    AD_SEL         = '.uiStreamAdditionalLogging',
    STORY_SEL      = '.uiStreamStory',
    CONTENT_SEL    = '.storyContent',
    HEADLINE_SEL   = '.uiStreamHeadline',
    BUTTON_SEL     = '.uiButton',
    PRONOUN_SEL    = '.pronoun-link',
    
    EGO_SEL        = '.ego_section',
    EGO_CONT_SEL   = '.ego_unit_container',
    EGO_AD_SEL     = '.uiHeaderTitle .adsCategoryTitleLink',
    EGO_TITLE_SEL  = '.uiHeaderTitle',
    
    BLOCKED_TEXT   = 'Blocked ad from: ',
    LIKED_BY_TEXT  = '| liked by: ',
    TOGGLE_TEXT    = '(toggle)',
    
    binded         = false;

// undescore.js debounce
var debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

var addToggle = function($what, $where, css) {
  var $toggle = $('<a>')
    .text(TOGGLE_TEXT)
    .addClass('adblocked-toggle')
    .click(function() {
      $what.fadeToggle('fast');
      $(this).toggleClass('open');
    });
  if (css) $toggle.css(css);
  $where.append($toggle);
};

var makeEgoTogglable = function() {
  $(EGO_SEL).not('.adblocked').each(function() {
    $(this).addClass('adblocked');
    
    var $adsTitle = $(EGO_AD_SEL, this),
        $ads      = $(EGO_CONT_SEL, this);
    
    // "people you may know" - show this back
    if (!$adsTitle.length) {
      $ads.css('display', 'block');
      return;
    }
    
    addToggle($ads, $(EGO_TITLE_SEL, this));
  });
};

var filterStream = function() {
  var $stream = $(STREAM_SEL);
      
  if (!$stream.length) return;
  
  $(AD_SEL, $stream).not('.adblocked').each(function() {
    $(this).addClass('adblocked');
    
    var $streamStory  = $(this).closest(STORY_SEL),
        $storyContent = $(CONTENT_SEL, $streamStory).first();
        
    var $headline = $(HEADLINE_SEL, $storyContent),
        $names    = $('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')', $headline.first()),
        pageName  = $('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')', $headline.last()).last().text();
    
    // console.log($streamStory, $headline, $names, pageName);
    
    // special case when page name is not in the headline but in the headline sibling
    if (pageName === '') {
      pageName = $headline.next().find('a:not(' + BUTTON_SEL + ',' + PRONOUN_SEL + ')').last().text();
    }
    
    // hide ad
    $storyContent.css('display', 'none');
    
    // construct basic message (icon, notice, ad/page text)
    var $notice = $('<div>')
      .html(BLOCKED_TEXT + '<b>' + pageName + '</b> ')
      .css({'color': '#999', 'padding': '.2em 0 .2em 18px', 'overflow': 'hidden',
            'background': 'url(' + blockPng + ') no-repeat left center'});
    
    // if there is more than one link in the headline, this means it is liked
    // by some of your friends so we can print their names
    if ($names.length > 1) {
      var text = '';
      for (var i = 0; i < $names.length - 1; i++) {
        text += $($names[i]).text() + ', ';
      }
      $notice.append($('<span>').text(LIKED_BY_TEXT + text.slice(0, -2) + ' '));
    }
    
    // add toggle link to show/hide ad
    addToggle($storyContent, $notice);
    
    // add minified version of ad into stream story
    $streamStory.prepend($notice);
  });
};

var contentUpdate = function() {
  filterStream();
  makeEgoTogglable();
};

var injectStyle = function() {
  if ($('style[data-origin=adblocker]', $('head')).length) return;
  var $style = $('<style>')
    .attr('data-origin', 'adblocker')
    .text(
      '.ego_section .ego_unit_container { display: none; }' +
      '.adblocked-toggle {' +
        'display: inline-block;' +
        'background: url(' + togglePng + ') left center;' +
        'text-indent: 100%;' +
        'overflow: hidden;' +
        'width: 31px;' +
        'height: 11px;' +
        'position: relative;' +
        'top: 1px;' +
        'margin: 0 0 0 .4em;' +
      '}' +
      '.adblocked-toggle.open { background-position: -31px 0; }'
    );
  $('head').append($style);
};

injectStyle();

// DOM ready
jQuery(function() {

  if (binded) return;
  
  var $content = $(GLOBAL_SEL);
  if ($content.length) {
    var lazyContentUpdate = debounce(contentUpdate, 500);
    $content.bind("DOMSubtreeModified", lazyContentUpdate);
    binded = true;

    contentUpdate();
  }
});
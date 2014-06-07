// ==UserScript==
// @name        Facebook Advanced AdBlocker
// @description Blocks ads in your Facebook stream (togglable + info)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @namespace   http://userscripts.org/users/470905
// @updateURL   http://userscripts.org/scripts/source/160607.meta.js
// @downloadURL http://userscripts.org/scripts/source/160607.user.js
// @include     *facebook.com/*
// @grand       none
// @version     1.2.2
// ==/UserScript==

// prevents jQuery conflicts with Facebook
this.$ = this.jQuery = jQuery.noConflict(true);

var iconPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAb1JREFUKJFdzz1oU2EYxfHzvO9zEzKJItihg9DiokuWYIuILgFTFQwXBweTIUNDAoKCILgJDg5d2yka8jGEGDAEQSg6lWARurSDgtAisZAuImS4pPc5Lo1U//OPA0dw0nA4PJdKpR6JSBHAvIiA5Ihki+RaOp0+AgABgM3NzUvOufcisuCc++ic2xYRZ2ZXzew6ya/T6TTMZrO7MhgMzh4fH2+TPJNMJu/lcrktnKrX630WkYyI7CcSiYyOx+PHqrpIcrlQKAxP43q9vj6ZTDIAfprZxSiKnupkMik55z5VKpV/8MbGxnoURatxHO8CuBPH8VuSD1wikZjz3m/9h58DWDWzb3Ec3y6Xy/uq+iUIgjkNggAkZYZrtdozki9IHsRxnKtWqwcAcOKg3vsxgGUAaDQaD83sJYARyZVSqfR9NqSqywAOnaq+VtWbrVZrzTn3RlWPgiDIFYvFvRluNpt3VfWK974n7Xb7vPd+CGCR5G9VvRGG4c4MdzqdFTNri8gvM1sSAOh2u5dF5B2ABQAfSO4A8CSvOeeWAPwgeSsMw72/Z/v9/gUze2Jm9wHMA4CIjAD0SL7K5/OHAPAHeKzPhmd10L0AAAAASUVORK5CYII=";

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
    
    binded        = false;

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
    
    var $toggle = $('<a>')
      .text(TOGGLE_TEXT)
      .css('margin', '0 0 0 .5em')
      .click(function() { $ads.fadeToggle('fast'); });
    $(EGO_TITLE_SEL, this).append($toggle);
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
            'background': 'url(' + iconPng + ') no-repeat left center'});
    
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
    var $toggle = $('<a>')
      .text(TOGGLE_TEXT)
      .click(function() { $storyContent.fadeToggle('fast'); });
    $notice.append($toggle);
    
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
    .text('.ego_section .ego_unit_container { display: none; }');
  $('head').append($style);
}

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
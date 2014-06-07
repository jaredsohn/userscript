// -*- coding: utf-8 -*-
// ==UserScript==
// @name           Reddit keyboard shortcuts
// @namespace      http://simulacra.in
// @description    Add some keyboard shortcuts to reddit
// @include        http://www.reddit.com/*
// @include        http://www.reddit.com/r/*
// @exclude        http://www.reddit.com/*/comments/*
// @exclude        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

// Version 0.1 — <2007-08-29 Wed>
// Version 0.2 — <2007-09-16 Sun>
// Version 0.3 — <2007-10-18 Thu>
// Version 0.4 — <2007-10-20 Sat>
// Version 0.5 — <2009-02-05 Thu>

var log = function () {
  if (typeof unsafeWindow.console != 'undefined' && typeof unsafeWindow.console.log != 'undefined') {
    unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
  }
};

(function () {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    log('jQuery not present on page');
    return;
  }

  var jQuery = unsafeWindow.jQuery;

  var helpText =
    ['Keyboard shortcuts include: ', '\n',
     'j — Go to the next article', '\n',
     'k — Go to the previous article', '\n',
     'v — Open current article in a new tab or window (You may need to configure the popup blocker to allow popups from reddit)', '\n',
     "c — Open current article's comments page", '\n',
     'u — Up-vote current article', '\n',
     'd — Down-vote current article', '\n',
     '? — Display help'];

  var links = jQuery('#siteTable .linkcompressed');

  var current = 0;

  var highlightColor = '#FFB';

  var toggleHighlight = function () {
    var currentLink = jQuery(links[current]);
    if (currentLink.hasClass('highlighted')) {
      jQuery(currentLink).css('background-color', '#FFF');
      currentLink.removeClass('highlighted');
    } else {
      jQuery(currentLink).css('background-color', highlightColor);
      currentLink.addClass('highlighted');
    }
  };

  // highlight the first link
  toggleHighlight();

  var scroller = (function () {
    function getElementY(element) {
      return jQuery(element).position().top;
    }

    return {
      showElement: function (element) {
        var position = getElementY(element);
        var height = unsafeWindow.document.body.offsetHeight;
        var scrollPosition = unsafeWindow.pageYOffset;

        if ((height + scrollPosition - position) < 10 || (position - scrollPosition) < 10) {
          unsafeWindow.scrollTo(0, position);
        }
      }
    };
  })();

  var openCurrentLink = function () {
    var currentElement = jQuery(links[current]);
    var currentLink = currentElement.find('a.title');
    currentLink.mousedown(); // fire reddit's link tracking
    unsafeWindow.open(currentLink.attr('href'));
  };

  var actions = {
    106: function () { // j -- move to next item
      if (current == links.length - 1) {
        // we're at the last link
        return;
      }
      toggleHighlight();
      current++;
      toggleHighlight();
      scroller.showElement(links[current]);
    },

    107: function () { // j -- move to next item
      if (!current) {
        // we're at the first link
        return;
      }
      toggleHighlight();
      current--;
      toggleHighlight();
      scroller.showElement(links[current]);
    },

    63: function () { // ? - show help
      unsafeWindow.window.alert(helpText.join(''));
    },

    118: openCurrentLink, // v -- open item in a new tab/window,

    117: function () { // up arrow - upvote article
      jQuery(links[current]).find('.up').click();
    },

    100: function () { // down arrow - downvote article
      jQuery(links[current]).find('.down').click();
    },

    99: function () { // c -- comments page
      var href = jQuery(links[current]).find('a.comments').attr('href');
      unsafeWindow.window.location.href = href;
    }
  };

  // disregard key presses on the following elements
  var ignoreTheseTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'];

  var handleKeyPress = function (event) {
    var tagName = event.target.tagName;
    if (ignoreTheseTags.filter(function (i) {
        return i === tagName;
      }).length) {
      return;
    }

    var code = event.charCode || event.keyCode;
    if (actions[code]) {
      actions[code]();
      event.preventDefault();
    }
  };

  unsafeWindow.document.addEventListener('keypress', handleKeyPress, true);
})();

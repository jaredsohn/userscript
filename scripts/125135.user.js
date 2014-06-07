// ==UserScript==
// @name TWITTER STREAMING ENABLER
// @namespace TWITTER STREAMING ENABLER
// @description This is a small script for Twitter.com, enables 5MP (almost realtime) refreshing on timeline.
// @include http://twitter.com/*
// @include https://twitter.com/*
// @match http://twitter.com/*
// @match https://twitter.com/*
// @run-at document-end
// @version 1.0.1
// ==/UserScript==
(function () {
  function $(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function addClass(el, className) {
    if ( ! new RegExp('\\b' + className + '\\b', 'g').test(el.className)) {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  }

  function getStyle(el, styleProp) {
    return window.getComputedStyle(el, null).getPropertyValue(styleProp);
  }

  function getHeight(el) {
    return parseInt(getStyle(el, 'height'));
  }

  function getHeaderHeight() {
    var height = 0;
    var pageOuter = document.getElementById('page-outer');
    height += parseInt(getStyle(pageOuter, 'padding-top'));
    var pageHeader = document.getElementsByClassName('page-header')[0];
    height += parseInt(getStyle(pageHeader, 'padding-top')) + getHeight(pageHeader);
    return height;
  }

  function collectTweets() {
    var streamItems = $('div.main-content div.stream-item');
    var streamItemsLength = streamItems.length;

    var innerHeight = window.innerHeight;
    var scrollY = window.scrollY;
    var y = scrollY + innerHeight;

    var tweet;
    var tweetHeight = 0;
    for (var sumHeight = getHeaderHeight(), num = 0; sumHeight < y && num < streamItemsLength; num++, sumHeight += tweetHeight) {
      tweet = streamItems[num];
      tweetHeight = getHeight(tweet);
      if (tweetHeight == 0) {
        removeClass(tweet, 'hidden-tweet');
        tweetHeight = getHeight(tweet);
      }
    }
    // now num equals to sum of all shown tweet above screen

    var i;
    for (i = num; i < num + bottomTweetsCount && i < streamItemsLength; i++) {
      removeClass(streamItems[i], 'hidden-tweet');
    }
    for (; i < streamItemsLength; i++) {
      addClass(streamItems[i], 'hidden-tweet');
    }
  }

  function startCollectTweets() {
    if (!isCollecting) {
      isCollecting = true;
      setTimeout(function () {
        collectTweets();
        isCollecting = false;
      }, 250);
    }
  }

  function onScroll() {
    startCollectTweets();
  }

  function onTweetInserted(e) {
    if (typeof e.target.className != 'undefined' && /\bjs-stream-item\b/g.test(e.target.className)) {
      startCollectTweets();
    }
  }

  function addCSS() {
    var style = document.createElement('style');
    style.textContent = '.hidden-tweet{display:none!important;}';
    document.body.appendChild(style);
  }

  function addScript() {
    var script = document.createElement('script');
    script.type  = "text/javascript";
    script.text  = "window.setTimeout = window.setTimeout;\
      var setTimeoutOld = window.setTimeout;\
      setTimeout(function(){\
        setTimeout = function (vCode, iMillis) {\
          if (iMillis == 30000 || iMillis == 90000) {\
            iMillis = 10000;\
          }\
          return setTimeoutOld(vCode, iMillis);\
        };\
      }, 0);\
    ";
    document.head.appendChild(script);
  }

  var bottomTweetsCount = 20;

  var isCollecting = false;

  addCSS();
  addScript();

  window.addEventListener('DOMNodeInserted', onTweetInserted, false);
  window.addEventListener('scroll', onScroll, false);
})();
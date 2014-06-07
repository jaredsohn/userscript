// ==UserScript==
// @name           Twitter add RT button for new UI
// @namespace      http://mitukiii.jp/
// @description    TwitterのWebクライアントに非公式のRTボタンを追加するスクリプト
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function() {

  // 1. RT @mitukiii: ほげほげぴよぴよツイート
  // 2. RT @mitukiii: http://twitter.com/mitukiii/status/123456789
  const RT_TYPE = 1;

  Object.isBoolean = function(object) {
    return typeof object === 'boolean';
  };

  Object.isString = function(object) {
    return typeof object === 'string';
  };

  var dispatchMouseEvent = function() {
    var e = {
      element: document,
      type: 'click',
      bubbles: true,
      cancelable: true
    };
    return function(element, type, options) {
      element = element || e.element;
      type = Object.isString(type) ? type : e.type;

      options = options || {};
      var bubbles = Object.isBoolean(options.bubbles) ? options.bubbles : e.bubbles;
      var cancelable = Object.isBoolean(options.cancelable) ? options.cancelable : e.bubbles;

      var click_event = document.createEvent('MouseEvents');
      click_event.initEvent(type, bubbles, cancelable);
      return element.dispatchEvent(click_event);
    };
  }();

  var getNewTweetButton = function() {
    var newTweetButton = document.getElementById('new-tweet');
    return function() {
      return newTweetButton;
    };
  }();

  var getUserName = function(tweet) {
    var user_name = tweet.getElementsByClassName('tweet-screen-name')[0];
    if (!user_name) {
      user_name = tweet.getElementsByClassName('tweet-user-block-screen-name')[0];
    }
    if (!user_name) {
      return null;
    }
    return user_name.textContent.replace(/^@/, '');
  };

  var getContent = function(tweet) {
    return tweet.getElementsByClassName('tweet-text')[0].textContent;
  };

  var getRTContent = function(rt_type) {
    if (rt_type === 2) {
      return function(tweet) {
        return tweet.getElementsByClassName('tweet-timestamp')[0].href.replace(/^https/, 'http').replace(/#!\//, '');
      };
    } else {
      return getContent;
    }
  }(RT_TYPE);

  var getQTContent = getContent;

  var setRTStatus = function() {
    var tweet_boxes = document.getElementsByClassName('twitter-anywhere-tweet-box-editor');
    return function(tweet, text, event) {
      event.preventDefault();
      event.stopPropagation();
      dispatchMouseEvent(getNewTweetButton(), 'click');
      var tweet_box = tweet_boxes[tweet_boxes.length - 1];
      tweet_box.value = text;
      tweet_box.focus();
      tweet_box.setSelectionRange(0, 0);
      return tweet;
    };
  }();

  var setQTStatus = function() {
    var tweet_boxes = document.getElementsByClassName('twitter-anywhere-tweet-box-editor');
    return function(tweet, text, event) {
      event.preventDefault();
      event.stopPropagation();
      var reply_action = tweet.getElementsByClassName('reply-action')[0];
      dispatchMouseEvent(reply_action, 'click');
      var tweet_box = tweet_boxes[tweet_boxes.length - 1];
      tweet_box.value = text;
      tweet_box.focus();
      tweet_box.setSelectionRange(0, 0);
      return tweet;
    };
  }();

  var mouseOverButton = function(action) {
    action.getElementsByTagName('i')[0].style.backgroundPosition = '-16px 0';
    return action;
  };

  var mouseOutButton = function(action) {
    action.getElementsByTagName('i')[0].style.backgroundPosition = '0 0';
    return actions;
  };

  var addButtons = function(tweet) {
    var user_name = getUserName(tweet);

    var actions = tweet.getElementsByClassName('tweet-actions')[0];

    if (!user_name || !actions) {
      return tweet;
    }

    if (actions.getElementsByClassName('rt-action').length == 0) {
      var rt_content = getRTContent(tweet);
      var rt_text = 'RT @' + user_name + ': ' + rt_content;
      var rt = document.createElement('a');
      rt.href = '#';
      rt.className = 'rt-action';
      rt.setAttribute('data-screen-name', user_name);
      rt.innerHTML = '<span><i></i><b>RT</b></span></a>';
      rt.addEventListener('mouseover', function(event) {
        mouseOverButton(rt);
      }, false);
      rt.addEventListener('mouseout', function(event) {
        mouseOutButton(rt);
      }, false);
      rt.addEventListener('click', function(event) {
        setRTStatus(tweet, rt_text, event);
      }, false);
      actions.appendChild(rt);
    }

    if (actions.getElementsByClassName('qt-action').length == 0) {
      var qt_content = getQTContent(tweet);
      var qt_text = 'QT @' + user_name + ': ' + qt_content;
      var qt = document.createElement('a');
      qt.href = '#';
      qt.className = 'qt-action';
      qt.setAttribute('data-screen-name', user_name);
      qt.innerHTML = '<span><i></i><b>QT</b></span></a>';
      qt.addEventListener('mouseover', function(event) {
        mouseOverButton(qt);
      }, false);
      qt.addEventListener('mouseout', function(event) {
        mouseOutButton(qt);
      }, false);
      qt.addEventListener('click', function(event) {
        setQTStatus(tweet, qt_text, event);
      }, false);
      actions.appendChild(qt);
    }

    return tweet;
  };

  var getParentElementByAttributeRegExp = function(element, attribute, reg_exp) {
    var parent_element = element;
    do {
      if (reg_exp.test(parent_element[attribute])) {
        return parent_element;
      }
    } while (parent_element = parent_element.parentNode);
    return null;
  };

  document.addEventListener('DOMNodeInserted', function(event) {
    var element = event.target;
    if (/(stream-item|component)/.test(element.className)) {
      addButtons(element);
    } else if (/tweet-actions/.test(element.className)) {
      var tweet = getParentElementByAttributeRegExp(element, 'className', /(stream-item|component)/);
      addButtons(tweet);
    } else {
      var tweets = element.getElementsByClassName('stream-item');
      for (var i = tweets.length - 1; i >= 0; i -= 1) {
        addButtons(tweets[i]);
      }
    }
    return event;
  }, false);

})();

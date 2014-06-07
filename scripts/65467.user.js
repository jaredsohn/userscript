// ==UserScript==
// @name           Twitter add RT button
// @namespace      http://mitukiii.jp/
// @description    TwitterのWebクライアントに非公式のRTボタンを追加するスクリプト
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function() {
  // 書式設定

  // 1. RT @mitukiii: ほげほげぴよぴよツイート
  // 2. QT @mitukiii: ほげほげぴよぴよツイート
  // 3. RT ほげほげぴよぴよツイート (via @mitukiii)
  // 4. QR ほげほげぴよぴよツイート (via @mitukiii)
  // 5. ほげほげぴよぴよツイート (via @mitukiii)
  // 6. "@mitukiii ほげほげぴよぴよツイート"
  const SETTING_FORMAT = 1;

  // 1. RT @mitukiii: ほげほげぴよぴよツイート
  // 2. RT @mitukiii: http://twitter.com/mitukiii/status/123456789
  const SETTING_RT_TYPE = 1;

  // プロフィールページ/パーマリンクとそれ以外で振り分け
  var getUserName = function() {
    var body_id = document.body.id;
    if (body_id === 'profile' || body_id === 'show') {
      var user_name = document.getElementsByClassName('screen-name')[0];
      if (user_name) {
        user_name = user_name.innerHTML;
      } else {
        user_name = null;
      }
      return function() {
        return user_name;
      };
    } else {
      return function(entry) {
        var user_name = entry.getElementsByClassName('screen-name')[0];
        if (user_name) {
          return user_name.innerHTML;
        } else {
          return null;
        }
      };
    }
  }();

  // ツイートを引用するかURLを引用するか振り分け
  var getContent = function(rt_type) {
    if (rt_type === 2) {
      return function(entry) {
        var content = entry.getElementsByClassName('entry-date')[0];
        if (content) {
          return content.href.replace(/^https/, 'http');
        } else {
          return null;
        }
      };
    } else {
      return function(entry) {
        var content = entry.getElementsByClassName('entry-content')[0];
        if (!content) {
          content = entry.getElementsByClassName('msgtxt')[0];
        }
        if (content) {
          return content.innerHTML;
        } else {
          return null;
        }
      };
    }
  }(SETTING_RT_TYPE);

  // RT/QTの文言の振り分け
  var getWord = function(format) {
    var word;
    if (format === 2 || format === 4) {
      word = 'QT';
    } else {
      word = 'RT';
    }
    return function() {
      return word;
    };
  }(SETTING_FORMAT);

  // 名前とテキストから設定した形式にフォーマット
  var getFormatText = function(format) {
    var getEscapeText = function(text) {
      return text.replace(/<[^>]*?>/g, '').
        replace(/&lt;/g, '<').
        replace(/&gt;/g, '>').
        replace(/&amp;/g, '&').
        replace(/\'/g, "\\'");
    };
    switch (format) {
      case 3:
      case 4:
        return function(name, content) {
          return getEscapeText(getWord() + ' ' + content + ' (via @' + name + ')');
        };
        break;
      case 5:
        return function(name, content) {
          return getEscapeText(content + ' (via @' + name + ')');
        };
        break;
      case 6:
        return getEscapeText('"@' + name + ' ' + content + '"');
      case 1:
      case 2:
      default:
        return function(name, content) {
          return getEscapeText(getWord() + ' @' + name + ': ' + content);
        };
        break;
    }
  }(SETTING_FORMAT);

  // テキストエリアがあればテキストをセット/なければリンク先に飛ぶ
  var setStatus = function(text, event) {
    var status = document.getElementById('status');
    if (!status) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      return open('/home?status=' + encodeURIComponent(text));
    }
    if (status.value.length > 0) {
      status.value += ' ';
    }
    status.value += text;
    scrollTo(0, 0);
    status.focus();
    status.setSelectionRange(0, 0);
  };
  
  // RTボタンのマウスオーバー/アウト時の見た目の調整
  var mouseOverRTButton = function(li) {
    li.getElementsByClassName('icon')[0].style.backgroundPosition = '-16px 0';
    li.getElementsByTagName('a')[0].style.textDecoration = 'underline';
  };
  
  var mouseOutRTButton = function(li) {
    li.getElementsByClassName('icon')[0].style.backgroundPosition = '0 0';
    li.getElementsByTagName('a')[0].style.textDecoration = 'none';
  };

  // RTボタンの追加
  var addRTButton = function(entry) {
    var word = getWord();
    if (entry.getElementsByClassName(word)[0] ||
        /direct_message/.test(entry.className))
    {
      return;
    }
    var name = getUserName(entry);
    if (!name) {
      return;
    }
    var content = getContent(entry);
    if (!content) {
      return;
    }
    var action = entry.getElementsByClassName('actions-hover')[0];
    if (!action) {
      action = document.createElement('ul');
      action.className = 'actions-hover';
      content.parentNode.appendChild(action);
    }
    var text = getFormatText(name, content);
    var li = document.createElement('li');
    li.innerHTML = '\
      <span class="' + word + '">\
        <span class="reply-icon icon">\
        </span>\
        <a href="/home?status=' + encodeURIComponent(text) + '">' + word + '</a>\
      </span>\
    ';
    li.addEventListener('mouseover', function(event) {
      mouseOverRTButton(li);
    }, false);
    li.addEventListener('mouseout', function(event) {
      mouseOutRTButton(li);
    }, false);
    li.addEventListener('click', function(event) {
      setStatus(text, event);
    }, false);
    action.appendChild(li);
  };

  // ページ読み込み時にRTボタンの追加
  (function() {
    var entries = document.getElementsByClassName('hentry');
    for (var i = entries.length - 1; i >= 0; i -= 1) {
      addRTButton(entries[i]);
    }
  })();

  // 新しいノードが追加された時にRTボタンを追加
  document.addEventListener('DOMNodeInserted', function(event) {
    var elem = event.target;
    if ((/hentry/).test(elem.className)) {
      addRTButton(elem);
    } else if (elem.id === 'timeline') {
      var entries = elem.getElementsByClassName('hentry');
      for (var i = entries.length - 1; i >= 0; i -= 1) {
        addRTButton(entries[i]);
      }
    }
  }, false);

})();

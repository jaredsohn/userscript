// ==UserScript==
// @name           twitter_addFTButton
// @namespace      http://haman29.sakura.ne.jp/gm/
// @version        0.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @description    TwitterのWebクライアントに非公式のFTボタンを追加するスクリプト
// ==/UserScript==
(function() {
  // ショートカット関数
  var $id    = function(id, parentWin) {
    return (parentWin || window).document.getElementById(id);
  };
  var $class = function(class, parentElem) {
    return (parentElem || document).getElementsByClassName(class);
  };
  var $tag   = function(tag, parentElem) {
    return (parentElem || document).getElementsByTagName(tag);
  };
  var $elem  = function(tag) {
    return document.createElement(tag);
  };
  var $text  = function(text) {
    return document.createTextNode(text);
  };
  
  // ユーザー名取得 プロフィールページとそれ以外で分岐
  var getUserName = function() {
    if (document.body.getAttribute('id') === 'profile' ||
        document.body.getAttribute('id') === 'show')
    {
      var user_name = $class('screen-name')[0];
      return function() {
        return user_name;
      };
    } else {
      return function(entry) {
        return $class('screen-name', entry)[0];
      };
    };
  }();
  
  var getWord = function() { return 'FT'; }();

  // 設定した書式で内容を取得
  var getFormat = function() {
    var escapeText = function(text) {
      return text.replace(/<[^>]*?>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/\'/g, "\\'");
    }
	{
		return function(name, content) {
			return escapeText(getWord + ' @' + name + ': ' + content);
		}
	};
  }();
  
  // FTボタンクリック時のイベント
  // プロフィールページなどの入力フィールドがないページの場合は、デフォルトの動作
  var setStatus = function(text, event) {
    var status = $id('status');
    if (status) {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        window.open('/home?status=' + encodeURIComponent(text));
        return;
      };
      if (status.value.length) { status.value += ' '; };
      status.value += text;
      window.scrollTo(0, 0);
      status.focus();
      status.setSelectionRange(0, 0);
    };
  };
  
  // マウスオーバー/アウト時のイベント
  // アイコンの切り替え、テキストデコレーションの切り替え
  var toggleIcon = function(elem, bool) {
    elem.firstChild.style.backgroundPosition = bool ? '-16px 0' : '0 0';
    elem.lastChild.style.textDecoration = bool ? 'underline' : 'none';
  };
  
  // FTボタンの作成とイベントの割り当て
  var addFTButton = function(entry) {
    var name = getUserName(entry);
    var content = $class('entry-content', entry)[0];
    var action = $class('actions-hover', entry)[0];
    if (!name) { return; };
    if (!content) { content = $class('msgtxt', entry)[0]; }
    if (!content) { return; };
    if (!action) {
      action = $elem('ul');
      action.setAttribute('class', 'actions-hover');
      content.parentNode.appendChild(action);
    };
    var text = getFormat(name.innerHTML, content.innerHTML);
    var li = $elem('li');
    var span = $elem('span');
    span.setAttribute('class', getWord);
    span.setAttribute('style', 'display: block; line-height: 16px;')
    span.addEventListener('mouseover', function() { toggleIcon(span, true); }, false);
    span.addEventListener('mouseout', function() { toggleIcon(span, false); }, false);
    var icon = $elem('span');
    icon.setAttribute('class', 'reply-icon icon');
    icon.addEventListener('click', function(event) { setStatus(text, event); }, false);
    var a = $elem('a');
    a.setAttribute('href', '/home?status=' + encodeURIComponent(text));
    a.addEventListener('click', function(event) { setStatus(text, event); }, false);
    a.appendChild($text(getWord));
    span.appendChild(icon);
    span.appendChild(a);
    li.appendChild(span);
    action.appendChild(li);
  };
  
  // 読み込み時にFTボタンを作成
  (function() {
    var entries = $class('hentry');
    var entries_length = entries.length;
    for (var i = 0; i < entries_length; i += 1) {
      addFTButton(entries[i]);
    };
  })();
  
  // DOM更新時にFTボタンを作成
  document.addEventListener('DOMNodeInserted', function(event) {
    var elem = event.target;
    if ((/hentry/).test(elem.getAttribute('class'))) {
      addFTButton(elem);
    } else if (elem.getAttribute('id') === 'timeline') {
      var entries = $class('hentry', elem);
      var entries_length = entries.length;
      for (var i = 0; i < entries_length; i += 1) {
        addFTButton(entries[i]);
      };
    };
  }, false);

})();

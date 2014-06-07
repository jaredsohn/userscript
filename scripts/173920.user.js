// ==UserScript==
// @name    InoReader Key Customize
// @description    Customize keyboard shortcuts in InoReader. / InoReaderのキーボードショートカットをカスタマイズします。
// @id    InoReaderKeyCustomize
// @namespace    http://userscripts.org/scripts/show/173920
// @homepage    https://userscripts.org/scripts/show/173920
// @updateURL    https://userscripts.org/scripts/source/173920.meta.js
// @include    http://inoreader.com/*
// @include    https://inoreader.com/*
// @include    http://www.inoreader.com/*
// @include    https://www.inoreader.com/*
// @include    http://beta.inoreader.com/*
// @include    https://beta.inoreader.com/*
// @include    http://us.inoreader.com/*
// @include    https://us.inoreader.com/*
// @exclude    *inoreader.com/stream*
// @exclude    *inoreader.com/m/*
// @exclude    *inoreader.com/old/stream*
// @exclude    *inoreader.com/old/m/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @version    1.50
// ==/UserScript==

(function() {
'use strict';

if (!/Ino\s?Reader/.test(document.title)) return;
var g_timeout = 2000,
  key = {},
  st = {},
  cha = '',
  anime = false,
  iInit;
var $id = function(id) {
  return document.getElementById(id);
};
var init = function() {
  if (typeof jQuery !== 'function') return;
  var locale_ja = {
    general: [
      '設定',
      'キャンセル',
      '"g"以外の英数字を登録。（例　"b": Bキーで動作　"B": Shift+Bキーで動作）',
      'スムーズスクロール',
      'スクロール時間 (ミリ秒)',
      'スクロールマージン',
      'インラインフレームをサンドボックス化',
      'フォームの実行を許可',
      'スクリプトの実行を許可'
    ],
    tabs: [
      'ナビゲーション',
      'アイテム',
      'ジャンプ',
      'アプリケーション',
      'スクロール',
      'その他'
    ],
    navigation: {
      k: '前の記事を開く ( k )',
      j: '次の記事を開く ( j )',
      p: '前の記事を選択 ( p )',
      n: '次の記事を選択 ( n )',
      o: '選択した記事を開閉 ( o )',
      X: '選択したフォルダを開閉 ( X )',
      K: '前のタグ/フィード/フォルダを開く ( K )',
      J: '次のタグ/フィード/フォルダを開く ( J )',
      P: '前のタグ/フィード/フォルダを選択 ( P )',
      N: '次のタグ/フィード/フォルダを選択 ( N )',
      O: '選択したタグ/フィード/フォルダを開く ( O )'
    },
    items: {
      v: '記事を新しいタブで開く ( v* )',
      b: '記事をバックグラウンドの新しいタブで開く ( b* )',
      m: '記事を既読/未読にする ( m )',
      A: 'すべての記事を既読にする ( A )',
      ctrl_m: '上側の記事をすべて既読にする ( Ctrl+m )',
      M: '下側の記事をすべて既読にする ( M )',
      q: '記事ページをインラインフレームで読み込む ( q )',
      w: '記事の全文をReadabilityで読み込む ( w )',
      l: '記事に「いいね！」をつける ( l )',
      f: '記事をお気に入りに追加/削除 ( f )',
      i: '記事をInstapaperに追加/削除 ( i )',
      x: '記事をReadabilityに追加/削除 ( x )',
      y: '記事をPocketに追加/削除 ( y )',
      z: '記事をEvernoteに追加/削除 ( z )',
      c: '記事にコメント ( c )',
      e: '記事をメールで共有 ( e )',
      s: '記事を拡散する ( s )',
      t: '記事のタグを編集 ( t )'
    },
    jump: {
      gd: '「ダッシュボード」を開く ( g-d )',
      ga: '「全ての記事」を開く ( g-a )',
      gf: '「お気に入り」を開く ( g-f )',
      gs: '「統計表示」を開く ( g-s )',
      gc: '「チャンネル」を開く ( g-c )',
      gu: 'フィードを指定して表示 ( g-u )',
      gt: 'タグ/フォルダを指定して表示 ( g-t )',
      period: 'タグ/フォルダ/フィード/セクションを指定して表示 ( . )'
    },
    application: {
      a: 'フィードを追加 ( a )',
      r: '更新 ( r )',
      slash: '検索ボックスにフォーカス ( / )',
      d: 'ツリーの表示/非表示 ( d )',
      u: 'ツリーの表示/(記事を最大幅に広げて)非表示 ( u )',
      alt_p: '設定ダイアログを開く ( Alt+p )',
      alt_c: '更新履歴を開く ( Alt+c )',
      alt_i: '講読アイテム/フォルダ/タグの情報を表示 ( Alt+i )',
      h: 'ヘルプを開く ( h )',
      $subscriptionsAll: 'すべての購読アイテムを表示',
      $subscriptionsUpdate: '未読の購読アイテムのみ表示',
      $subscriptionsDim: '既読の購読アイテムを薄く表示',
      _1: 'リストビューへ切替 ( 1 )',
      _2: '展開ビューへ切替 ( 2 )',
      _3: 'リストビューへ切替 ( 3 )',
      _4: 'カードビューへ切替 ( 4 )',
      _5: 'マガジンビューへ切替 ( 5 )',
      shift_1: 'すべての記事を表示 ( Shift+1 )',
      shift_2: '未読記事のみ表示 ( Shift+2 )',
      shift_3: 'お気に入り記事のみ表示 ( Shift+3 )',
      plus: '文字サイズを大きく ( + )',
      minus: '文字サイズを小さく ( - )',
      _0: '文字サイズをリセット ( 0 )'
    },
    scroll: {
      PageUp: '上に1ページスクロール ( PageUp* )',
      PageDown: '下に1ページスクロール ( PageDown* )',
      Home: '先頭にスクロール ( Home* )',
      End: '末尾にスクロール ( End* )',
      Up: '上に1行スクロール ( Up* )',
      Down: '下に1行スクロール ( Down* )',
      SPACE: '上にスクロール / 前へ移動 ( SPACE* )',
      space: '下にスクロール / 次へ移動 ( space* )'
    },
    etc: {}
  };
  var locale_en = {
    general: [
      'Settings',
      'Cancel',
      'An alphanumeric character except "g". (for example, "b": b key, "B": Shift-b key)',
      'Smooth Scrolling',
      'Scroll duration (msec)',
      'Scroll margin',
      'Sandboxed iframe',
      'Allow Scripts',
      'Allow Forms'
    ],
    tabs: [
      'Navigation',
      'Items',
      'Jump',
      'Application',
      'Scroll',
      'Others'
    ],
    navigation: {
      k: 'Previous article ( k )',
      j: 'Next article ( j )',
      p: 'Focus previous article ( p )',
      n: 'Focus next article  ( n )',
      o: 'Open/Close article ( o )',
      X: 'Open/Collapse folder ( X )',
      K: 'Previous item ( K )',
      J: 'Next item ( J )',
      P: 'Focus previous item ( P )',
      N: 'Focus next item ( N )',
      O: 'Open focused item ( O )'
    },
    items: {
      v: 'Open in new tab ( v* )',
      b: 'Open in background tab ( b* )',
      m: 'Mark as read/unread ( m )',
      A: 'Mark all as read ( A )',
      ctrl_m: 'Mark above as read ( Ctrl+m )',
      M: 'Mark below as read ( M )',
      q: 'Embed full article ( q )',
      w: 'Load from Readability ( w )',
      l: 'Like ( l )',
      f: 'Mark as favorite ( f )',
      i: 'Send article to Instapaper ( i )',
      x: 'Send article to Readability ( x )',
      y: 'Send article to Pocket ( y )',
      z: 'Send article to Evernote ( z )',
      c: 'Comment ( c )',
      e: 'Send via email ( e )',
      s: 'Broadcast ( s )',
      t: 'Add tags ( t )'
    },
    jump: {
      gd: 'Dashboard ( g-d )',
      ga: 'All articles ( g-a )',
      gf: 'Favorites ( g-f )',
      gs: 'Statistics ( g-s )',
      gc: 'Channels ( g-c )',
      gu: 'Go to feed ( g-u )',
      gt: 'All to folder/tag ( g-t )',
      period: 'Show Jumper ( . )'
    },
    application: {
      a: 'Add subscription ( a )',
      r: 'Refresh feed ( r )',
      slash: 'Focus Search ( / )',
      d: 'Dock/Undock tree ( d )',
      u: 'Dock/Undock tree (full width) ( u )',
      alt_p: 'Preferences ( Alt+p )',
      alt_c: 'Changelog ( Alt+c )',
      alt_i: 'Info dialog ( Alt+i )',
      h: 'Open help ( h )',
      $subscriptionsAll: 'Show all subscriptions',
      $subscriptionsUpdate: 'Show updated subscriptions',
      $subscriptionsDim: 'Dim read subscriptions',
      _1: 'List view ( 1 )',
      _2: 'Expanded view ( 2 )',
      _3: 'Column view ( 3 )',
      _4: 'Card view ( 4 )',
      _5: 'Magazine view ( 5 )',
      shift_1: 'All articles ( Shift+1 )',
      shift_2: 'Unread articles ( Shift+2 )',
      shift_3: 'Favorites articles ( Shift+3 )',
      plus: 'Increase font size ( + )',
      minus: 'Decrease font size ( - )',
      _0: 'Reset font size ( 0 )'
    },
    scroll: {
      PageUp: 'scroll page up ( PageUp* )',
      PageDown: 'scroll page down ( PageDown* )',
      Home: 'scroll top ( Home* )',
      End: 'scroll end ( End* )',
      Up: 'scroll line up ( Up* )',
      Down: 'scroll line down ( Down* )',
      SPACE: 'scroll up / previous article ( SPACE* )',
      space: 'scroll down / next article ( space* )'
    },
    etc: {}
  };
  var css = '#irkc_setting { color: black; min-width: 20em; padding: 0 0 0.5em 0; position: absolute; top: 38px; left: 38px; z-index: 90100; background: rgba(255, 255, 255, 0.98); border: 1px solid #999999; border-radius: 4px; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); }' +
    '#irkc_setting fieldset:disabled > label { color: gray; }' +
    '.irkc_hide { padding: 0 !important; }' +
    '.irkc_hide #irkc_btn, .irkc_hide #irkc_desc, .irkc_hide #irkc_tab, .irkc_hide #irkc_form { display: none; }' +
    '#irkc_titlebar { background-color: #666666; border-radius: 4px 4px 0 0; padding: 2px 0 0 4px; height: 2em; -moz-user-select: none; }' +
    '#irkc_title a { font-weight: bold; color: white; text-decoration: none; }' +
    '#irkc_title a:hover { color: #FF9; }' +
    '#irkc_btn { position: absolute; top: 2px; right: 4px; }' +
    '#irkc_desc { padding: 0 0.5em; margin: 0.5em 0 1em 0; }' +
    '#irkc_tab { padding: 0 0.5em; margin-top: 1em; }' +
    '#irkc_tab span { background-color: #E9E9E9; border: 1px solid #999999; padding: 2px 8px; border-radius: 4px 4px 0 0; cursor: pointer; -moz-user-select: none; }' +
    '#irkc_tab span:hover { background-color: #F3F3F3; }' +
    '#irkc_tab .irkc_tab_selected, #irkc_tab .irkc_tab_selected:hover { background-color: #FFFFFF; border-bottom-color: #FFFFFF; }' +
    '#irkc_form { padding: 0.5em; border-top: 1px solid #999999; margin-top: 1px; }' +
    '#irkc_form input { margin: 2px 6px; padding: 2px 4px; text-align: center; width: 1.2em; vertical-align: inherit; }' +
    '#irkc_form input[type="checkbox"] { vertical-align: top; margin: 2px 2px 2px 0; }' +
    '#irkc_form fieldset + fieldset { margin: 0.5em auto; }' +
    '#irkc_settings-scrollduration { width: 6ex !important; }' +
    '#irkc_settings-scrollmargin_page, #irkc_settings-scrollmargin_space { width: 5ex !important; }' +
    '#irkc_items, #irkc_jump, #irkc_application, #irkc_scroll, #irkc_etc { display: none; }' +
    '.irkc_row { float: left; padding: 0 5px; }' +
    '#irkc_ok { margin-right: 0.5em; padding: 0 2em; }' +
    '#irkc_cancel { padding: 0 1ex; }' +
    '#irkc_ok, #irkc_cancel { font-size: 80%; }';
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'data:text/css,' + encodeURIComponent(css);
  document.getElementsByTagName('head')[0].appendChild(link);
  var div = document.createElement('div');
  div.id = 'irkc_setting';
  div.style.display = 'none';
  document.body.appendChild(div);
  var loc = (window.navigator.language === 'ja') ? locale_ja : locale_en;
  var s = '<div id="irkc_titlebar"><div id="irkc_title"><a href="https://userscripts.org/scripts/show/173920" target="_blank">InoReader Key Customize ' +
    loc.general[0] + '</a></div><div id="irkc_btn"><input id="irkc_ok" type="button" value="OK"><input id="irkc_cancel" type="button" value="' +
    loc.general[1] + '"></div></div><div id="irkc_desc">' +
    loc.general[2] + '</div><div id="irkc_tab">';
  for (let i = 2, j = Object.keys(loc).length; i < j; i++) s += '<span id="irkc_tab_' + Object.keys(loc)[i] + '">' + loc.tabs[i - 2] + '</span>';
  s += '</div><div id="irkc_form">';
  var addContents = function(id) {
    if (id === 'etc') {
      s += '<div id="irkc_etc"><fieldset><legend>' + loc.general[3] + '</legend><label>' + loc.general[4] + ' :<input type="text" maxlength="4" id="irkc_settings-scrollduration"></label></fieldset><fieldset><legend>' + loc.general[5] + ' (px)</legend><label>PageUp / PageDown :<input type="text" maxlength="3" id="irkc_settings-scrollmargin_page"></label><br><label>Space / Shift+Space :<input type="text" maxlength="3" id="irkc_settings-scrollmargin_space"></label></fieldset><fieldset id="irkc_settings-iframe_sandbox_fs"><legend><label><input type="checkbox" id="irkc_settings-iframe_sandbox">' + loc.general[6] + '</label></legend><label><input type="checkbox" id="irkc_settings-iframe_sandbox_form">' + loc.general[7] + '</label><br><label><input type="checkbox" id="irkc_settings-iframe_sandbox_script">' + loc.general[8] + '</label></fieldset></div>';
    } else {
      var n1 = 0,
        n2 = Object.keys(loc[id]).length - 1,
        s1 = '',
        s2 = '';
      s += '<div id="irkc_' + id + '"><span class="irkc_row">';
      for (let i in loc[id]) {
        if (loc[id].hasOwnProperty(i)) {
          if (Math.floor(n2 / 2) >= n1) s1 += '<label><input id="irkc_key-' + i + '" type="text" maxlength="1">' + loc[id][i] + '</label><br>';
          else s2 += '<label><input id="irkc_key-' + i + '" type="text" maxlength="1">' + loc[id][i] + '</label><br>';
          n1++;
        }
      }
      s += s1 + '</span><span class="irkc_row">' + s2 + '</span></div>';
    }
  };
  for (let i = 2, j = Object.keys(loc).length; i < j; i++) addContents(Object.keys(loc)[i]);
  s += '</div>';
  $id('irkc_setting').innerHTML = s;
  var addTabEvent = function(id) {
    var tab = $id('irkc_tab_' + id);
    if (id === 'navigation') tab.className = 'irkc_tab_selected';
    tab.addEventListener('click', function() {
      for (let i = 2, j = Object.keys(loc).length; i < j; i++) {
        $id('irkc_' + Object.keys(loc)[i]).style.display = 'none';
        $id('irkc_tab_' + Object.keys(loc)[i]).className = '';
      }
      $id('irkc_' + id).style.display = 'block';
      tab.className = 'irkc_tab_selected';
    }, false);
  };
  $id('irkc_settings-iframe_sandbox').addEventListener('click', function() {
    if ($id('irkc_settings-iframe_sandbox').checked)
      $id('irkc_settings-iframe_sandbox_fs').removeAttribute('disabled');
    else $id('irkc_settings-iframe_sandbox_fs').setAttribute('disabled', '');
  }, false);
  for (let i = 2, j = Object.keys(loc).length; i < j; i++) addTabEvent(Object.keys(loc)[i]);
  var loadKey = function() {
    var e = document.evaluate('id("irkc_form")//input', document, null, 7, null);
    for (let i = 0, j = e.snapshotLength; i < j; i++) {
      if (e.snapshotItem(i).value) e.snapshotItem(i).value = '';
      e.snapshotItem(i).removeAttribute('style');
    }
    key = JSON.parse(localStorage.getItem('InoReaderKeyCustomize_key')) || {};
    for (let p in key) {
      if (key.hasOwnProperty(p)) {
        if (p === 'PO' && !$id('irkc_key-K').value && !key.K) {
          $id('irkc_key-K').value = key[p];
          key.K = key[p];
          p = 'K';
        } else if (p === 'NO' && !$id('irkc_key-J').value && !key.J) {
          $id('irkc_key-J').value = key[p];
          key.J = key[p];
          p = 'J';
        } else if ($id('irkc_key-' + p)) $id('irkc_key-' + p).value = key[p];
        if (/[A-Z]/.test(key[p])) key[p] = '@' + key[p];
        else key[p] = key[p].toUpperCase();
      }
    }
  };
  var loadSettings = function() {
    var notType = function(t, a) {
      return (Object.prototype.toString.call(a).slice(8, 11) !== t) ? true : false;
    };
    st = JSON.parse(localStorage.getItem('InoReaderKeyCustomize_settings')) || {};
    if (notType('Num', st.scrollduration) || st.scrollduration > 2000) st.scrollduration = 200;
    if (notType('Num', st.scrollmarginpage) || st.scrollmarginpage > 500) st.scrollmarginpage = 20;
    if (notType('Num', st.scrollmarginspace) || st.scrollmarginspace > 500) st.scrollmarginspace = 42;
    if (notType('Boo', st.iframesandbox)) st.iframesandbox = false;
    if (notType('Boo', st.iframesandboxform)) st.iframesandboxform = false;
    if (notType('Boo', st.iframesandboxscript)) st.iframesandboxscript = false;
    $id('irkc_settings-scrollduration').value = st.scrollduration;
    $id('irkc_settings-scrollmargin_page').value = st.scrollmarginpage;
    $id('irkc_settings-scrollmargin_space').value = st.scrollmarginspace;
    $id('irkc_settings-iframe_sandbox').checked = st.iframesandbox;
    $id('irkc_settings-iframe_sandbox_form').checked = st.iframesandboxform;
    $id('irkc_settings-iframe_sandbox_script').checked = st.iframesandboxscript;
    if (st.iframesandbox) $id('irkc_settings-iframe_sandbox_fs').removeAttribute('disabled');
    else $id('irkc_settings-iframe_sandbox_fs').setAttribute('disabled', '');
  };
  $id('irkc_titlebar').addEventListener('dblclick', function(e) {
    if (e.target.nodeName === 'DIV') {
      $id('irkc_setting').classList.toggle('irkc_hide');
    }
  }, false);
  $id('irkc_ok').addEventListener('click', function() {
    $id('irkc_ok').blur();
    viewSettings();
    var e = document.evaluate('id("irkc_form")/div/span/label/input', document, null, 7, null),
      d = {};
    for (let n = 0; n < e.snapshotLength; n++) {
      if (/[^0-9a-fh-zA-Z%&]/.test(e.snapshotItem(n).value)) e.snapshotItem(n).value = '';
      if (e.snapshotItem(n).value) d[e.snapshotItem(n).id.slice(9)] = e.snapshotItem(n).value;
    }
    localStorage.setItem('InoReaderKeyCustomize_key', JSON.stringify(d));
    var sd = $id('irkc_settings-scrollduration').value;
    var smp = $id('irkc_settings-scrollmargin_page').value;
    var sms = $id('irkc_settings-scrollmargin_space').value;
    if (sd && !isNaN(sd)) {
      sd = Number(sd);
      st.scrollduration = (sd < 0) ? 0 : (sd > 2000) ? 2000 : sd;
    } else st.scrollduration = 200;
    if (smp && !isNaN(smp)) {
      smp = Number(smp);
      st.scrollmarginpage = (smp < 0) ? 0 : (smp > 500) ? 500 : smp;
    } else st.scrollmarginpage = 20;
    if (sms && !isNaN(sms)) {
      sms = Number(sms);
      st.scrollmarginspace = (sms < 0) ? 0 : (sms > 500) ? 500 : sms;
    } else st.scrollmarginspace = 42;
    st.iframesandbox = $id('irkc_settings-iframe_sandbox').checked;
    st.iframesandboxform = $id('irkc_settings-iframe_sandbox_form').checked;
    st.iframesandboxscript = $id('irkc_settings-iframe_sandbox_script').checked;
    localStorage.setItem('InoReaderKeyCustomize_settings', JSON.stringify(st));
    loadKey();
    loadSettings();
    resetListener();
  }, false);
  $id('irkc_cancel').addEventListener('click', function() {
    $id('irkc_cancel').blur();
    viewSettings();
    loadKey();
    loadSettings();
    resetListener();
  }, false);
  var menu = $id('sb_rp_settings_menu'),
    pqm = $id('preferences_quick_main'),
    item = document.createElement('div');
  item.id = 'irkc_settingmenu2';
  item.innerHTML = 'Key Customize ' + loc.general[0];
  if (menu) {
    item.className = 'inno_toolbar_button_menu_item';
    var menuList = menu.children;
    if (!menuList[menuList.length - 1].id) {
      var line = document.createElement('div');
      line.className = 'inno_toolbar_button_menu_line';
      menu.insertBefore(line, menu.lastChild.nextSibling);
    }
    menu.insertBefore(item, menu.lastChild.nextSibling);
  } else if ($id('quick_options') && pqm) {
    item.className = 'quick_options_link';
    pqm.insertBefore(item, pqm.lastChild.nextSibling);
  }
  if ($id('irkc_settingmenu2')) {
    $id('irkc_settingmenu2').addEventListener('click', function() {
      viewSettings();
    }, false);
  }
  if (GM_registerMenuCommand && typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('InoReader Key Customize - Reset Listener', function() {
      resetListener();
    });
  }
  $('.quick_options_link').click(function() {
    resetListener();
  });
  document.addEventListener('keydown', keyDown, true);
  document.addEventListener('keypress', keyPress, true);
  document.addEventListener('keyup', keyUp, true);
  loadKey();
  loadSettings();
};

var resetListener = function() {
  document.removeEventListener('keydown', keyDown, true);
  document.removeEventListener('keypress', keyPress, true);
  document.removeEventListener('keyup', keyUp, true);
  document.addEventListener('keydown', keyDown, true);
  document.addEventListener('keypress', keyPress, true);
  document.addEventListener('keyup', keyUp, true);
};

var currentEntryXPath = function() {
  if ($id('article_dialog')) {
    return 'id("article_dialog")/div[@class="article_full_contents"]';
  }
  if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none' && $id('reader_pane').getElementsByClassName('article_current article_current_3way')[0]) {
    return 'id("three_way_contents")/div[@class="article_full_contents"][last()]';
  }
  if ($id('subscriptions_articles')) {
    return 'id("subscriptions_articles")/div[contains(concat(" ", normalize-space(@class), " "), " article_current ")]';
  }
  return 'id("reader_pane")//div[contains(concat(" ", normalize-space(@class), " "), " article_current ")]';
};

var viewSettings = function() {
  var se = $id('irkc_setting');
  if (se) {
    if (se.style.display !== 'block') {
      $('#irkc_tab_navigation').click();
      se.style.display = 'block';
    } else {
      se.style.display = 'none';
      $id('irkc_ok').removeAttribute('disabled');
    }
  }
};

var keyDown = function(e) {
  var set = $id('irkc_setting'),
    code = String.fromCharCode(e.keyCode);
  if (!set) return;
  if (e.ctrlKey && e.altKey && e.shiftKey && e.keyCode === 191) resetListener();
  else if (e.ctrlKey && e.shiftKey && e.keyCode === 191) viewSettings();
  if (set.style.display === 'block') e.stopPropagation();
  if (e.ctrlKey || e.altKey || e.metaKey || set.style.display === 'block' || /input|textarea/i.test(e.target.tagName)) return;
  if (e.shiftKey) code = '@' + code;
  if (e.keyCode === 32) code = (e.shiftKey) ? '%' : '&';
  switch (code) {
    case key.a:
    case key.A:
    case key.ga:
      cha = 'A';
      break;
    case key.b:
      cha = 'B';
      break;
    case key.c:
    case key.gc:
    case key.alt_c:
      cha = 'C';
      break;
    case key.d:
    case key.gd:
      cha = 'D';
      break;
    case key.e:
      cha = 'E';
      break;
    case key.f:
    case key.gf:
      cha = 'F';
      break;
    case key.h:
      cha = 'H';
      break;
    case key.i:
    case key.alt_i:
      cha = 'I';
      break;
    case key.j:
    case key.J:
      cha = 'J';
      break;
    case key.k:
    case key.K:
      cha = 'K';
      break;
    case key.l:
      cha = 'L';
      break;
    case key.m:
    case key.M:
    case key.ctrl_m:
      cha = 'M';
      break;
    case key.n:
    case key.N:
      cha = 'N';
      break;
    case key.o:
    case key.O:
      cha = 'O';
      break;
    case key.p:
    case key.P:
    case key.alt_p:
      cha = 'P';
      break;
    case key.q:
      cha = 'Q';
      break;
    case key.r:
      cha = 'R';
      break;
    case key.s:
    case key.gs:
      cha = 'S';
      break;
    case key.t:
    case key.gt:
      cha = 'T';
      break;
    case key.u:
    case key.gu:
      cha = 'U';
      break;
    case key.v:
      cha = 'V';
      break;
    case key.w:
      cha = 'W';
      break;
    case key.x:
    case key.X:
      cha = 'X';
      break;
    case key.y:
      cha = 'Y';
      break;
    case key.z:
      cha = 'Z';
      break;
    case key._0:
      cha = 48;
      break;
    case key._1:
    case key.shift_1:
      cha = 49;
      break;
    case key._2:
    case key.shift_2:
      cha = 50;
      break;
    case key._3:
    case key.shift_3:
      cha = 51;
      break;
    case key._4:
      cha = 52;
      break;
    case key._5:
      cha = 53;
      break;
    case key.plus:
      cha = 107;
      break;
    case key.minus:
      cha = 109;
      break;
    case key.period:
      cha = 190;
      break;
    case key.slash:
      cha = 191;
      break;
    case key.PageUp:
    case key.PageDown:
    case key.Home:
    case key.End:
    case key.Up:
    case key.Down:
    case key.space:
    case key.SPACE:
    case key.$subscriptionsAll:
    case key.$subscriptionsUpdate:
    case key.$subscriptionsDim:
      cha = -1;
      break;
    default:
      cha = '';
  }
  if (cha) e.stopPropagation();
};

var keyPress = function(e) {
  var set = $id('irkc_setting');
  if (!set) return;
  if (/^irkc_key/.test(e.target.id)) {
    if (/^[0-9a-fh-zA-Z%&]$/.test(String.fromCharCode(e.charCode))) e.target.value = null;
    if (e.charCode === 32) e.target.value = (e.shiftKey) ? '%' : '&';
  }
  if (e.ctrlKey || e.altKey || e.metaKey || set.style.display === 'block' || /input|textarea/i.test(e.target.tagName)) return;
  var evt, eCe,
    code = String.fromCharCode(e.charCode).toUpperCase(),
    rp = $('#reader_pane'),
    ad = $('#article_dialog'),
    twc = $('#three_way_contents'),
    animeOption = {
      duration: st.scrollduration,
      complete: function() {
        anime = false;
      }
    };
  if (e.shiftKey) code = '@' + code;
  if (e.charCode === 32) code = (e.shiftKey) ? '%' : '&';
  if (code === 'G') {
    document.removeEventListener('keypress', keyPress, true);
    setTimeout(function() {
      document.addEventListener('keypress', keyPress, true);
    }, g_timeout);
    return;
  }
  if (!cha) return;
  if (cha && isNaN(cha)) {
    if (cha === '%' || cha === '&') cha = 32;
    else cha = cha.charCodeAt();
  }
  e.stopPropagation();
  evt = document.createEvent('KeyboardEvent');
  switch (code) {
    case key.space:
    case key.SPACE:
    case key.PageUp:
    case key.PageDown:
      eCe = document.evaluate(currentEntryXPath(), document, null, 9, null).singleNodeValue;
      break;
  }
  switch (code) {
    case key.a:
    case key.c:
    case key.d:
    case key.e:
    case key.f:
    case key.h:
    case key.i:
    case key.j:
    case key.k:
    case key.l:
    case key.m:
    case key.n:
    case key.o:
    case key.p:
    case key.q:
    case key.r:
    case key.s:
    case key.t:
    case key.u:
    case key.w:
    case key.x:
    case key.y:
    case key.z:
    case key._0:
    case key._1:
    case key._2:
    case key._3:
    case key._4:
    case key._5:
    case key.plus:
    case key.minus:
    case key.period:
    case key.slash:
      evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 0, 0, cha, 0);
      break;
    case key.A:
    case key.J:
    case key.K:
    case key.M:
    case key.N:
    case key.O:
    case key.P:
    case key.X:
    case key.shift_1:
    case key.shift_2:
    case key.shift_3:
      evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 1, 0, cha, 0);
      break;
    case key.alt_c:
    case key.alt_i:
    case key.alt_p:
      evt.initKeyEvent('keydown', 1, 1, null, 0, 1, 0, 0, cha, 0);
      break;
    case key.ctrl_m:
      evt.initKeyEvent('keydown', 1, 1, null, 1, 0, 0, 0, cha, 0);
      break;
    case key.ga:
    case key.gc:
    case key.gd:
    case key.gf:
    case key.gs:
    case key.gt:
    case key.gu:
      evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 0, 0, 'G'.charCodeAt(), 0);
      break;
    case key.b:
      var el1 = document.evaluate(currentEntryXPath() + '//a[starts-with(@id, "aurl_")]', document, null, 9, null).singleNodeValue;
      if (el1 && el1.href && /^(https?|ftp):\/\/.+$/.test(el1.href)) GM_openInTab(el1.href, true);
      else {
        el1 = document.evaluate(currentEntryXPath() + '//a[starts-with(@id, "article_title_link_")]', document, null, 9, null).singleNodeValue;
        if (el1 && el1.href && /^(https?|ftp):\/\/.+$/.test(el1.href)) GM_openInTab(el1.href, true);
      }
      cha = '';
      return;
    case key.v:
      var el2 = document.evaluate(currentEntryXPath() + '//a[starts-with(@id, "aurl_")]', document, null, 9, null).singleNodeValue;
      if (el2 && el2.href && /^(https?|ftp):\/\/.+$/.test(el2.href)) GM_openInTab(el2.href);
      else {
        el2 = document.evaluate(currentEntryXPath() + '//a[starts-with(@id, "article_title_link_")]', document, null, 9, null).singleNodeValue;
        if (el2 && el2.href && /^(https?|ftp):\/\/.+$/.test(el2.href)) GM_openInTab(el2.href);
      }
      cha = '';
      return;
    case key.space:
      if ($id('subscriptions_articles') && $id('subscriptions_articles').innerHTML === '') {
        cha = '';
        return;
      }
      if (eCe) {
        var bottom = ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none' ? twc.height() : $id('article_dialog') ? ad.height() + 70 : rp.height()) - ($(eCe).position().top + $(eCe).height());
        if (bottom > 0) {
          evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 0, 0, ' '.charCodeAt(), 0);
          break;
        }
      } else {
        evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 0, 0, ' '.charCodeAt(), 0);
        break;
      }
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: (twc.height() + $id('three_way_contents').scrollTop - ((st.scrollmarginspace + 100 > twc.height()) ? twc.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: (ad.height() + $id('article_dialog').scrollTop - ((st.scrollmarginspace + 100 > ad.height()) ? ad.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: (rp.height() + $id('reader_pane').scrollTop - ((st.scrollmarginspace + 100 > rp.height()) ? rp.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.SPACE:
      if ($id('subscriptions_articles') && $id('subscriptions_articles').innerHTML === '') {
        cha = '';
        return;
      }
      if (document.evaluate('id("reader_pane")/div[@class="reader_pane_message"]', document, null, 9, null).singleNodeValue || document.evaluate('id("subscriptions_articles")/div[@class="no_unread"]', document, null, 9, null).singleNodeValue) {
        var eSel2 = document.evaluate('id("tree_pane")//span[contains(concat(" ", normalize-space(@class), " "), " selected ")]', document, null, 9, null).singleNodeValue;
        if (eSel2 && eSel2.id && eSel2.id !== 'link_all_items') {
          evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 1, 0, 'K'.charCodeAt(), 0);
          break;
        }
      }
      if (eCe) {
        var top = $(eCe).position().top - ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none' ? twc.position().top : $id('article_dialog') ? ad.position().top : rp.position().top);
        if (top >= 0) {
          evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 1, 0, ' '.charCodeAt(), 0);
          break;
        }
      } else {
        evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 1, 0, ' '.charCodeAt(), 0);
        break;
      }
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: ($id('three_way_contents').scrollTop - twc.height() + ((st.scrollmarginspace + 100 > twc.height()) ? twc.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: ($id('article_dialog').scrollTop - ad.height() + ((st.scrollmarginspace + 100 > ad.height()) ? ad.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: ($id('reader_pane').scrollTop - rp.height() + ((st.scrollmarginspace + 100 > rp.height()) ? rp.height() - 100 : st.scrollmarginspace))
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.PageUp:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: ($id('three_way_contents').scrollTop - twc.height() + ((st.scrollmarginpage + 100 > twc.height()) ? twc.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: ($id('article_dialog').scrollTop - ad.height() + ((st.scrollmarginpage + 100 > ad.height()) ? ad.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: ($id('reader_pane').scrollTop - rp.height() + ((st.scrollmarginpage + 100 > rp.height()) ? rp.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.PageDown:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: (twc.height() + $id('three_way_contents').scrollTop - ((st.scrollmarginpage + 100 > twc.height()) ? twc.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: (ad.height() + $id('article_dialog').scrollTop - ((st.scrollmarginpage + 100 > ad.height()) ? ad.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: (rp.height() + $id('reader_pane').scrollTop - ((st.scrollmarginpage + 100 > rp.height()) ? rp.height() - 100 : st.scrollmarginpage))
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.Home:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: 0
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: 0
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: 0
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.End:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: ($id('three_way_contents').scrollHeight)
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: ($id('article_dialog').scrollHeight)
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: ($id('reader_pane').scrollHeight)
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.Up:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: ($id('three_way_contents').scrollTop - 42)
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: ($id('article_dialog').scrollTop - 42)
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: ($id('reader_pane').scrollTop - 42)
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.Down:
      if (!anime) {
        anime = true;
        if ($id('three_way_contents') && $id('three_way_contents').style.display !== 'none') {
          twc.animate({
            scrollTop: ($id('three_way_contents').scrollTop + 42)
          }, animeOption);
        } else if ($id('article_dialog')) {
          ad.animate({
            scrollTop: ($id('article_dialog').scrollTop + 42)
          }, animeOption);
        } else {
          rp.animate({
            scrollTop: ($id('reader_pane').scrollTop + 42)
          }, animeOption);
        }
      }
      cha = '';
      return;
    case key.$subscriptionsAll:
      $('#subscriptions_radio_all').click();
      cha = '';
      return;
    case key.$subscriptionsUpdate:
      $('#subscriptions_radio_updated').click();
      cha = '';
      return;
    case key.$subscriptionsDim:
      $('#subscriptions_radio_dim').click();
      cha = '';
      return;
    default:
      cha = '';
      return;
  }
  document.dispatchEvent(evt);
  switch (code) {
    case key.q:
      var el5 = document.evaluate(currentEntryXPath(), document, null, 9, null).singleNodeValue,
        itemId = (el5 && el5.id) ? el5.id.slice(el5.id.lastIndexOf('_') + 1) : '';
      if (itemId && $id('iframe_embed_' + itemId)) {
        var att = [];
        if (st.iframesandbox) {
          if (st.iframesandboxform) att.push('allow-forms');
          if (st.iframesandboxscript) att.push('allow-scripts');
          $id('iframe_embed_' + itemId).setAttribute('sandbox', att.join(' '));
        }
      }
      return;
    case key.ga:
    case key.gc:
    case key.gd:
    case key.gf:
    case key.gs:
    case key.gt:
    case key.gu:
      evt.initKeyEvent('keydown', 1, 1, null, 0, 0, 0, 0, cha, 0);
      break;
    default:
      cha = '';
      return;
  }
  document.dispatchEvent(evt);
  cha = '';
};

var keyUp = function(e) {
  if (/^irkc_key/.test(e.target.id)) {
    if (/[^0-9a-fh-zA-Z%&]/.test(e.target.value)) e.target.value = null;
    var el = document.evaluate('id("irkc_form")/div/span/label/input', document, null, 7, null),
      key = [],
      duplicate = false,
      check = function(a, b, c) {
        var i = 0;
        if (a.some(function(d) {
          if (d === b) i++;
          if (i > 1) return true;
        })) {
          c.style.backgroundColor = '#FFFF66';
          duplicate = true;
        } else c.style.backgroundColor = null;
      };
    for (let n = 0, l = el.snapshotLength, v; n < l; n++) {
      v = el.snapshotItem(n).value;
      if (/[0-9a-fh-zA-Z%&]/.test(v)) key.push(v);
    }
    for (let n = 0, l = el.snapshotLength, s, v; n < l; n++) {
      s = el.snapshotItem(n);
      v = s.value;
      if (/[^0-9a-fh-zA-Z%&]/.test(v)) {
        s.style.backgroundColor = null;
        continue;
      }
      check(key, v, s);
    }
    if (duplicate) $id('irkc_ok').setAttribute('disabled', '');
    else $id('irkc_ok').removeAttribute('disabled');
  }
};

iInit = window.setInterval(function() {
  var tree = $id('tree');
  if (tree && tree.innerHTML) {
    window.clearInterval(iInit);
    window.setTimeout(function() {
      init();
    }, 1000);
  }
}, 500);

})();

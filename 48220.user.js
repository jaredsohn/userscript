// ==UserScript==
// @name  Google Reader Key Customize
// @description  Customize keyboard shortcuts in Google Reader. / Googleリーダーのキーボードショートカットをカスタマイズします。
// @namespace  http://fxwiki.blog63.fc2.com/
// @homepage    http://userscripts.org/scripts/show/48220
// @updateURL    https://userscripts.org/scripts/source/48220.meta.js
// @include  http://www.google.tld/reader/view/*
// @include  https://www.google.tld/reader/view/*
// @version 1.7
// ==/UserScript==

(function() {
var g_timeout = 2000;
var key = {}, $ = function(id) { return document.getElementById(id); };
var init = function() {
  var ja1 = [
    'キーボードショートカットのカスタマイズ',
    '"g"以外の英数字を登録。（例　b: Bキーで動作　B: Shift+Bキーで動作）',
    'ナビゲーション',
    'アイテム',
    'ジャンプ',
    'アプリケーション',
    'その他',
    '設定'
  ];
  var ja2 = [
    'j', '次のアイテムを表示 ( j )',
    'k', '前のアイテムを表示 ( k )',
    'n', '次のアイテムを選択 ( n )',
    'p', '前のアイテムを選択 ( p )',
    'N', '次のフィード/フォルダを選択 ( N / J )',
    'P', '前のフィード/フォルダを選択 ( P / K )',
    'O', '選択したフィード/フォルダを開く ( O )',
    'NO', '次のフィード/フォルダを開く ( N-O )',
    'PO', '前のフィード/フォルダを開く ( P-O )',
    'X', 'フォルダを開閉する ( X )',
    'c', 'アイテムにコメントを追加 ( c )',
    'e', 'アイテムをメールで送信 ( e )',
    'l', 'アイテムをお気に入りに登録 ( l )',
    'm', 'アイテムを既読/未読にする ( m )',
    'o', 'アイテムを開閉する ( o / enter )',
    's', 'アイテムにスターを付ける ( s )',
    't', 'アイテムにタグを付ける ( t )',
    'v', 'アイテムのソースページを開く ( v )',
    'A', 'アイテムをすべて既読にする ( A )',
    'C', 'アイテムのコメントを表示 ( C )',
    'D', 'アイテムにコメントを付けて共有 ( D )',
    'S', 'アイテムを共有 ( S )',
    'T', '[送信先]メニューを開く ( T )',
    'ga', '「すべてのアイテム」に移動 ( g-a )',
    'gc', '「コメント表示」に移動 ( g-c )',
    'gd', '「フィードを検索」に移動 ( g-d )',
    'ge', '「ピックアップ」に移動 ( g-e )',
    'gf', '友だち選択ツールを表示 ( g-f )',
    'gh', '「ホーム」に移動 ( g-h )',
    'gp', '「おすすめのアイテム」に移動 ( g-p )',
    'gs', '「スター付きアイテム」に移動 ( g-s )',
    'gu', 'フィード選択ツールを表示 ( g-u )',
    'gt', 'タグ選択ツールを表示 ( g-t )',
    'gF', '「友だちの共有アイテム」に移動 ( g-F )',
    'gS', '「共有アイテム」に移動 ( g-S )',
    'gT', '「トレンド」に移動 ( g-T )',
    '_1', '全文表示に切り替える ( 1 )',
    '_2', 'リスト表示に切り替える ( 2 )',
    'a', 'フィードを登録 ( a )',
    'f', '全画面表示の切り替え ( f )',
    'r', '更新 ( r )',
    'u', 'サイドバーの切り替え ( u )',
    'U', 'サイドバーを一時的に表示 ( U )',
    'plus', '選択アイテムの文字サイズを大きく ( + )',
    'minus', '選択アイテムの文字サイズを小さく ( - )',
    'slash', 'カーソルを検索ボックスに置く ( / )',
    'pUp', '上に1ページ分スクロール ( PageUp )',
    'pDown', '下に1ページ分スクロール ( PageDown )',
    'Home', '先頭にスクロール ( Home )',
    'End', '末尾にスクロール ( End )',
    'up', '上に1行分スクロール ( ↑ )',
    'down', '下に1行分スクロール ( ↓ )',
    'space', '次のアイテムにスクロール ( Space )',
    'SPACE', '前のアイテムにスクロール ( Shift+Space )',
    'newItem', '新着アイテムを表示',
    'allItem', 'すべてのアイテムを表示'
  ];
  var en1 = [
    'Customize keyboard shortcuts',
    'An alphanumeric character except "g". (for example, b: b, B: Shift-b)',
    'Navigation',
    'Items',
    'Jumping',
    'Application',
    'Others',
    'Settings'
  ];
  var en2 = [
    'j', 'next item ( j )',
    'k', 'previous item ( k )',
    'n', 'item scan down ( n )',
    'p', 'item scan up ( p )',
    'N', 'next subscription ( N / J )',
    'P', 'previous subscription ( P / K )',
    'O', 'open subscription or folder ( O )',
    'NO', 'next & open subscription or folder ( N-O )',
    'PO', 'previous & open subscription or folder ( P-O )',
    'X', 'expand folder ( X )',
    'c', 'add comment ( c )',
    'e', 'email item ( e )',
    'l', 'like item ( l )',
    'm', 'mark item as read/unread ( m )',
    'o', 'expand/collapse item ( o/enter )',
    's', 'star item ( s )',
    't', 'tag item ( t )',
    'v', 'view original ( v )',
    'A', 'mark all as read ( A )',
    'C', 'view comments ( C )',
    'D', 'share item with note ( D )',
    'S', 'share item ( S )',
    'T', 'open “send to” menu ( T )',
    'ga', 'go to all items ( g-a )',
    'gc', 'go to comment view ( g-c )',
    'gd', 'go to discovery page ( g-d )',
    'ge', 'go to explore ( g-e )',
    'gf', 'open friend selector ( g-f )',
    'gh', 'go home ( g-h )',
    'gp', 'go to popular items ( g-p )',
    'gs', 'go to starred items ( g-s )',
    'gu', 'open subscription selector ( g-u )',
    'gt', 'open tag selector ( g-t )',
    'gF', 'go to friends\' shared items ( g-F )',
    'gS', 'go to shared items ( g-S )',
    'gT', 'go to trends page ( g-T )',
    '_1', 'switch to expanded view ( 1 )',
    '_2', 'switch to list view ( 2 )',
    'a', 'add a subscription ( a )',
    'f', 'toggle full screen mode ( f )',
    'r', 'refresh ( r )',
    'u', 'hide/unhide the sidebar ( u )',
    'U', 'temporary view the sidebar ( U )',
    'plus', 'increase magnification ( + )',
    'minus', 'decrease magnification ( - )',
    'slash', 'move cursor to search box ( / )',
    'pUp', 'scroll page up ( PageUp )',
    'pDown', 'scroll page down ( PageDown )',
    'Home', 'scroll top ( Home )',
    'End', 'scroll end ( End )',
    'up', 'scroll line up ( ↑ )',
    'down', 'scroll line down ( ↓ )',
    'space', 'scroll next item ( Space )',
    'SPACE', 'scroll previous item ( Shift+Space )',
    'newItem', 'view new items',
    'allItem', 'view all items'
  ];
  var css = [
    '#grkc_setting {color: white; padding: 0 0 1em 0; position: absolute; top: 20px; left: 20px; z-index: 90100; background: rgba(10%, 15%, 10%, 0.9); border-radius: 10px; }',
    '#grkc_setting input { margin-right: 0.5em; text-align: center; width: 1.2em; }',
    '#grkc_titlebar { background: rgba(60%, 60%, 100%, 0.3); border-radius: 10px 10px 0 0; padding: 2px 10px; }',
    '#grkc_title a { font-weight: bold; color: white; text-decoration: none; }',
    '#grkc_title a:hover { color: #FF9; }',
    '#grkc_btn { float: right; position: absolute; right: 10px; }',
    '#grkc_desc { padding: 0 0.5em; margin: 0.5em 0 1em 0; }',
    '#grkc_tab { padding: 0 0.5em; margin: 1em 0; }',
    '#grkc_tab span { border: 1px solid #999; padding: 2px 8px; border-radius: 8px 8px 0 0; cursor: pointer; }',
    '#grkc_tab span:hover { background: rgba(100%, 100%, 80%, 0.2); }',
    '#grkc_form { padding: 0.5em; }',
    '#grkc_item, #grkc_jump, #grkc_app, #grkc_etc { display: none; }',
    '.grkc_row { float: left; padding: 0 5px; }',
    '#grkc_ok { margin-right: 0.5em; padding: 0 3ex; }',
    '#grkc_cancel { padding: 0 1ex; }',
    '#grkc_ok, #grkc_cancel { font-size: 90%; border: 1px solid #999; }',
    '#grkc_ok:hover, #grkc_cancel:hover { cursor: pointer; background: rgba(80%, 100%, 80%, 0.3); }'
  ].join('');
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'data:text/css,' + escape(css);
  document.getElementsByTagName('head')[0].appendChild(link);
  var div = document.createElement('div'), loc1, loc2;
  div.id = 'grkc_setting';
  div.style.display = 'none';
  document.body.appendChild(div);
  if (/Google\s?リーダー/.test(document.title)) {
    loc1 = ja1; loc2 = ja2;
  } else {
    loc1 = en1; loc2 = en2;
  }
  var tabID = ['nav', 'item', 'jump', 'app', 'etc'];
  var s = '<div id="grkc_titlebar"><span id="grkc_title"><a href="http://userscripts.org/scripts/show/48220" target="_blank">' +
    loc1[0] + '</a></span><span id="grkc_btn"><span id="grkc_ok">OK</span><span id="grkc_cancel">Cancel</span></span></div><div id="grkc_desc">' +
    loc1[1] + '</div><div id="grkc_tab">';
  for (var i1=0; i1<tabID.length; i1++) s += '<span id="grkc_tab_' + tabID[i1] + '">' + loc1[i1+2] + '</span>';
  s += '</div><div id="grkc_form">';
  var addLabel = function(n1, n2, n3, id) {
    s += '<div id="grkc_' + id + '"><span class="grkc_row">';
    for (var i2=n1; i2<n2; i2=i2+2) s += '<label><input id="grkc_key-' + loc2[i2] + '" type="text" maxlength="1">' + loc2[i2+1] + '</label><br>';
    s += '</span><span class="grkc_row">';
    for (var i3=n2; i3<n3; i3=i3+2) s += '<label><input id="grkc_key-' + loc2[i3] + '" type="text" maxlength="1">' + loc2[i3+1] + '</label><br>';
    s += '</span></div>';
  };
  addLabel(0, 10, 20, tabID[0]);
  addLabel(20, 34, 46, tabID[1]);
  addLabel(46, 60, 72, tabID[2]);
  addLabel(72, 82, 92, tabID[3]);
  addLabel(92, 102, 112, tabID[4]);
  s += '</div>';
  $('grkc_setting').innerHTML = s;
  var addEvent = function(id) {
    var tab = $('grkc_tab_' + id);
    var col = 'rgba(80%, 100%, 80%, 0.2)';
    if (id === 'nav') tab.style.background = col;
    tab.addEventListener('click', function() {
      for (var i=0; i<tabID.length; i++) {
        $('grkc_' + tabID[i]).style.display = 'none';
        $('grkc_tab_' + tabID[i]).style.background = '';
      }
      $('grkc_' + id).style.display = 'block';
      tab.style.background = col;
    }, false);
  };
  for (var i=0; i<tabID.length; i++) addEvent(tabID[i]);
  var loadKey = function() {
    key = JSON.parse(GM_getValue('key')) || {};
    for (var p in key) {
      if (key.hasOwnProperty(p)) {
        if ($('grkc_key-' + p)) $('grkc_key-' + p).value = key[p];
        if (/[A-Z]/.test(key[p])) key[p] = '@' + key[p];
        else key[p] = key[p].toUpperCase();
      }
    }
  };
  $('grkc_ok').addEventListener('click', function() {
    $('grkc_setting').style.display = 'none';
    var e = document.evaluate('id("grkc_form")/div/span/label/input', document, null, 7, null);
    for (var n=0,d={}; n<e.snapshotLength; n++) {
      if (! /[0-9a-fh-zA-Z]/.test(e.snapshotItem(n).value)) e.snapshotItem(n).value = '';
      if (e.snapshotItem(n).value) d[e.snapshotItem(n).id.slice(9)] = e.snapshotItem(n).value;
    }
    GM_setValue('key',JSON.stringify(d));
    loadKey();
  }, false);
  $('grkc_cancel').addEventListener('click', function() {
    document.getElementById('grkc_setting').style.display = 'none';
    loadKey();
  }, false);
  var viewSettings = function() {
    var se = $('grkc_setting');
    if ($('settings-button-menu')) $('settings-button').blur();
    if (se) se.style.display = (se.style.display !== 'block') ? 'block' : 'none';
  };
  if ($('settings-button-menu')) {
    var d1 = document.evaluate('id("settings-button-menu")', document, null, 9, null).singleNodeValue;
    if (d1) {
      var d2 = document.createElement('div');
      d2.id = 'grkc_settingmenu2';
      d2.className = 'goog-menuitem';
      d2.setAttribute('role', 'menuitem');
      d2.setAttribute('style', '-moz-user-select: none;');
      d2.innerHTML = '<div id="grkc_settingmenu2child" class="goog-menuitem-content">Key Customize ' + loc1[7] + '</div>';
      d1.appendChild(d2);
    }
    $('grkc_settingmenu2').addEventListener('mouseover', function() {
      $('grkc_settingmenu2').className = 'goog-menuitem goog-menuitem-highlight';
    }, false);
    $('grkc_settingmenu2').addEventListener('mouseout', function() {
      $('grkc_settingmenu2').className = 'goog-menuitem';
    }, false);
    $('grkc_settingmenu2').addEventListener('click', function() {
      viewSettings();
    }, false);
  }
  loadKey();
};

var keyDown = function(e) {
  var set = $('grkc_setting');
  if (! set) return;
  if (e.ctrlKey && e.shiftKey && e.keyCode === 191)
    set.style.display = (set.style.display !== 'block') ? 'block' : 'none';
  if (e.ctrlKey || e.altKey || e.metaKey || set.style.display === 'block' || /input|textarea/i.test(e.target.tagName)) return;
  var code = String.fromCharCode(e.keyCode), evt, cha;
  if (e.shiftKey) code = '@' + code;
  if (code === 'G') {
    document.removeEventListener('keydown', keyDown, true);
    setTimeout(function() {
      document.addEventListener('keydown', keyDown, true);
    }, g_timeout);
    return;
  }
  switch (code) {
  case key.a: case key.A: case key.ga:
    cha = 'A'; break;
  case key.c: case key.C: case key.gc:
    cha = 'C'; break;
  case key.D: case key.gd:
    cha = 'D'; break;
  case key.e: case key.ge:
    cha = 'E'; break;
  case key.f: case key.gf: case key.gF:
    cha = 'F'; break;
  case key.gh:
    cha = 'H'; break;
  case key.j:
    cha = 'J'; break;
  case key.k:
    cha = 'K'; break;
  case key.l:
    cha = 'L'; break;
  case key.m:
    cha = 'M'; break;
  case key.n: case key.N: case key.NO:
    cha = 'N'; break;
  case key.o: case key.O:
    cha = 'O'; break;
  case key.p: case key.P: case key.PO: case key.gp:
    cha = 'P'; break;
  case key.r:
    cha = 'R'; break;
  case key.s: case key.S: case key.gs: case key.gS:
    cha = 'S'; break;
  case key.t: case key.T: case key.gt: case key.gT:
    cha = 'T'; break;
  case key.u: case key.U: case key.gu:
    cha = 'U'; break;
  case key.v:
    cha = 'V'; break;
  case key.X:
    cha = 'X'; break;
  case key.pUp:
    cha = 33; break;
  case key.pDown:
    cha = 34; break;
  case key.Home:
    cha = 36; break;
  case key.End:
    cha = 35; break;
  case key.up:
    cha = 38; break;
  case key.down:
    cha = 40; break;
  case key._1:
    cha = 49; break;
  case key._2:
    cha = 50; break;
  case key.plus:
    cha = 107; break;
  case key.minus:
    cha = 109; break;
  case key.slash:
    cha = 191; break;
  case key.newItem: case key.allItem:
  case key.space: case key.SPACE:
    cha = -1; break;
  }
  if (! cha) return;
  if (cha && isNaN(cha)) cha = cha.charCodeAt();
  e.stopPropagation();
  evt = document.createEvent('KeyboardEvent');
  switch (code) {
  case key.a: case key.c: case key.e: case key.f: case key.j:
  case key.k: case key.l: case key.m: case key.n: case key.o:
  case key.p: case key.r: case key.s: case key.t: case key.u:
  case key.v: case key._1: case key._2: case key.slash:
  case key.plus: case key.minus: case key.pUp:  case key.pDown:
  case key.Home: case key.End: case key.up: case key.down:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 0, 0, cha, 0);
    break;
  case key.A: case key.C: case key.D: case key.N: case key.O:
  case key.P: case key.S: case key.T: case key.U: case key.X:
  case key.NO: case key.PO:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 1, 0, cha, 0);
    break;
  case key.ga: case key.gc: case key.gd: case key.ge: case key.gf:
  case key.gh: case key.gp: case key.gs: case key.gt: case key.gu:
  case key.gF: case key.gS: case key.gT:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 0, 0, 71, 0);
    break;
  case key.space:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 0, 0, 32, 0);
    break;
  case key.SPACE:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 1, 0, 32, 0);
    break;
  case key.newItem: case key.allItem:
    evt = document.createEvent('MouseEvents');
    evt.initEvent('mousedown', 1, 1);
    break;
  default: return;
  }
  switch (code) {
  case key.newItem:
    var vvoTextN = $('viewer-view-options').firstChild.textContent;
    if (vvoTextN && !new RegExp(/\d+/).exec(vvoTextN)) {
      $('viewer-view-options').dispatchEvent(evt);
      evt = document.createEvent('MouseEvents');
      evt.initEvent('mouseover', 1, 1);
      $(':8').dispatchEvent(evt);
      evt.initEvent('mouseup', 1, 1);
      $(':8').dispatchEvent(evt);
      $(':8').dispatchEvent(evt);
      $('viewer-view-options').blur();
    }
    return;
  case key.allItem:
    var vvoTextA = $('viewer-view-options').firstChild.textContent;
    if (vvoTextA && new RegExp(/\d+/).exec(vvoTextA)) {
      $('viewer-view-options').dispatchEvent(evt);
      evt = document.createEvent('MouseEvents');
      evt.initEvent('mouseover', 1, 1);
      $(':7').dispatchEvent(evt);
      evt.initEvent('mouseup', 1, 1);
      $(':7').dispatchEvent(evt);
      $(':7').dispatchEvent(evt);
      $('viewer-view-options').blur();
    }
    return;
  }
  document.dispatchEvent(evt);
  switch (code) {
  case key.NO: case key.PO:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 1, 0, 79, 0);
    break;
  case key.ga: case key.gc: case key.gd: case key.gf:
  case key.gh: case key.gs: case key.gt: case key.gu:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 0, 0, cha, 0);
    break;
  case key.gF: case key.gS: case key.gT:
    evt.initKeyEvent('keypress', 1, 1, null, 0, 0, 1, 0, cha, 0);
    break;
  default: return;
  }
  document.dispatchEvent(evt);
};

var keyUp = function(e) {
  if (/^grkc_key/.test(e.target.id)) {
    if (! /[0-9a-fh-zA-Z]/.test(e.target.value)) e.target.value = null;
    var el = document.evaluate('id("grkc_form")/div/span/label/input', document, null, 7, null);
    var check = function(a, b, c) {
      var i = 0;
      if (a.some(function(d) {
        if (d === b) i++;
        if (i > 1) return true;
      })) c.style.backgroundColor = '#FFFF66';
      else c.style.backgroundColor = null;
    };
    for (var n1=0,key=[],v1; n1<el.snapshotLength; n1++) {
      v1 = el.snapshotItem(n1).value;
      if (/[0-9a-fh-zA-Z]/.test(v1)) key.push(v1);
    }
    for (var n2=0,s,v2; n2<el.snapshotLength; n2++) {
      s = el.snapshotItem(n2); v2 = s.value;
      if (! /[0-9a-fh-zA-Z]/.test(v2)) {
        s.style.backgroundColor = null;
        continue;
      }
      check(key, v2, s);
    }
  }
};

window.addEventListener('load', function() {
  document.addEventListener('keydown', keyDown, true);
  document.addEventListener('keyup', keyUp, true);
  init();
}, false);
window.removeEventListener('unload', function() {
  document.removeEventListener('keydown', keyDown, true);
  document.removeEventListener('keyup', keyUp, true);
}, false);
})();

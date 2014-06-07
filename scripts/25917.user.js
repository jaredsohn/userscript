// ==UserScript==
// @name           nicovideo Add Stars to Tags
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Add stars that represents their uploader set the tags unmodifiable.
// @version        2010-12-29a
// @include        http://www.nicovideo.jp/watch/*
// @resource       style https://github.com/gifnksm/nicovideo-add-stars-to-tags/raw/2010-12-29a/style.css
// @resource       ctg1 https://github.com/gifnksm/nicovideo-add-stars-to-tags/raw/2010-12-29a/ctg1.png
// @resource       ctg2 https://github.com/gifnksm/nicovideo-add-stars-to-tags/raw/2010-12-29a/ctg2.png
// @resource       ctg1lock https://github.com/gifnksm/nicovideo-add-stars-to-tags/raw/2010-12-29a/ctg1lock.png
// @resource       ctg2lock https://github.com/gifnksm/nicovideo-add-stars-to-tags/raw/2010-12-29a/ctg2lock.png
// ==/UserScript==

/*
 * ユーティリティ関数群
 */
Array.prototype.include = function(x) this.indexOf(x) != -1;
Array.prototype.replace = function(newVal) {
  this.splice.apply(this, [0, this.length].concat(newVal));
};

Array.prototype.partition = function(fun, thisp) {
  if (typeof fun != 'function')
    throw new TypeError();

  var res1 = [], res2 = [];
  for (var i = 0, len = this.length; i < len; i++) {
    if (i in this) {
      if (fun.call(thisp, this[i], i, this))
        res1.push(this[i]);
      else
        res2.push(this[i]);
    }
  }
  return [res1, res2];
};


// DOM要素を結合する。引数はScalaのmkString風
Array.prototype.joinDOM = function() {
  var [sep, head, tail] = [null, null, null],
      arg = Array.map(arguments, convertToDOM);

  switch(arg.length) {
  case 0: break;
  case 1: [sep] = arg; break;
  case 3: [head, sep, tail] = arg; break;
  default: throw new Error('invalid arguments');
  }

  var df = document.createDocumentFragment();
  function append(e, clone) {
    if (e !== null) df.appendChild(clone ? e.cloneNode(true) : e);
  }

  append(head);
  for (let [i, elem] in Iterator(this)) {
    if (i > 0) append(sep, true);
    append(convertToDOM(elem));
  }
  append(tail);

  return df;
};

// class関連関数
var {addClassName, removeClassName, hasClassName} = (function() {
    if (document.body.classList !== undefined) {
    return {
      addClassName: function addClassName(elem, className)
        elem.classList.add(className),
      removeClassName: function removeClassName(elem, className)
        elem.classList.remove(className),
      hasClassName: function hasClassName(elem, className)
        elem.classList.contains(className)
    };
  }
  return {
    addClassName: function addClassName(elem, className) {
      if (!hasClassName(elem))
        elem.className += ' ' + className;
    },
    removeClassName: function removeClassName(elem, className) {
      elem.className = elem.className.split(/\s+/).filter(
        function(exist_name) exist_name != className).join(' ');
    },
    hasClassName: function hasClassName(elem, className) {
      return elem.className.split(/\s+/).indexOf(className) != -1;
    }
  };
})();

function setClassName(elem, className, flag) {
  if (flag) addClassName(elem, className);
  else removeClassName(elem, className);
}

// オブジェクトをDOMノードに変換する
function convertToDOM(elem) {
  if (elem === null)
    return null;
  if (elem instanceof String || typeof elem === 'string')
    return document.createTextNode(elem);
  if (elem instanceof XML)
    return e4xToDOM(elem);
  return elem;
}

// XML (E4X)からDOM Nodeへの変換
default xml namespace = "http://www.w3.org/1999/xhtml";
function e4xToDOM(xml, xmlns) {
  var pretty = XML.prettyPrinting;

  // 余分な空白を混入させないように，prettyPrintingを一時的に無効にする
  XML.prettyPrinting = false;
  var doc = (new DOMParser).parseFromString(
    '<root xmlns="' + xmlns + '">' + xml.toXMLString() + "</root>",
    "application/xml");
  XML.prettyPrinting = pretty;

  var imported = document.importNode(doc.documentElement, true);
  var range = document.createRange();
  range.selectNodeContents(imported);
  var fragment = range.extractContents();
  range.detach();
  return fragment.childNodes.length > 1 ? fragment : fragment.firstChild;
}

Object.memoize = function(obj, defs) {
  function add(key, getter) {
    obj.__defineGetter__(key, function() {
                           delete this[key];
                           return this[key] = getter.call(this);
                         });
  }
  for (let key in defs) {
    if (defs.hasOwnProperty(key)) {
      add(key, defs[key]);
    }
  }
};

// Settings
const VideoID = unsafeWindow.Video.id;
const RequestURL = 'http://www.nicovideo.jp/tag_edit/' + VideoID;
const NicopediaTimeout = 30000;

const CategoryTags = [
  // エンタ・音楽・スポ
  "エンターテイメント 音楽 スポーツ",
  // 教養・生活
  "動物 料理 日記 自然 科学 歴史 ラジオ ニコニコ動画講座",
  // 政治
  "政治",
  // やってみた
  "歌ってみた 演奏してみた 踊ってみた 描いてみた ニコニコ技術部",
  // アニメ・ゲーム
  "アニメ ゲーム",
  // 殿堂入りカテゴリ
  "アイドルマスター 東方 VOCALOID 例のアレ その他",
  "R-18"].join(' ').split(/\s+/);
// "投稿者コメント アンケート チャット テスト 台灣"

// prototype拡張された配列にする
const LockedTags = [].concat(unsafeWindow.Video.lockedTags);
const DomainTags = [].concat(unsafeWindow.Video.tags);
const ForeignTags = [];

// Resources
const CategoryIcon1 = GM_getResourceURL('ctg1');
const CategoryIcon2 = GM_getResourceURL('ctg2');
const LockedCategoryIcon1 = GM_getResourceURL('ctg1lock');
const LockedCategoryIcon2 = GM_getResourceURL('ctg2lock');

function className(name) '_GM_tag_' + name;

GM_addStyle(
  GM_getResourceText('style').replace(/__(.+?)__/g, function(_, name) className(name)));


// 各タグをタグ検索ページへのリンクと関連付けて管理するクラス
var TagLink = function(link) {
  this.link = link;
  this.name = link.textContent;
  this.hrefName = link.href.replace(
    new RegExp("^http://www\\.nicovideo\\.jp/tag/"), "");
  this.isLocked = LockedTags.include(this.name);
  this.isCategory = CategoryTags.include(this.name);
  this.isDomain = DomainTags.include(this.name);

  this.resetSelection();

  var self = this;
  link.addEventListener('mousedown', function(e) self._mousedown(e), false);
  link.addEventListener('click', function(e) self._click(e), false);
};
TagLink.ClassNames = {
  And: className('selected_and'),
  Minus: className('selected_minus'),
  Icon: className('icon'),
  Domain: className('domain_tag'),
  Foreign: className('foreign_tag')
};
TagLink.Marks = {};
Object.memoize(
  TagLink.Marks, {
    LockedCategory: function() {
      return e4xToDOM(<img src={LockedCategoryIcon2}
                           class={TagLink.ClassNames.Icon}
                           alt="★カテゴリ？" />);
    },
    Locked: function() {
      return e4xToDOM(<span style="color: #f90;">★</span>);
    },
    Category: function() {
      return e4xToDOM(<img src={CategoryIcon2}
                           class={TagLink.ClassNames.Icon}
                           alt="カテゴリ？" />);
    }
  });
TagLink.prototype = {
  _selectedAnd: false,
  get selectedAnd () { return this._selectedAnd; },
  set selectedAnd (selected) {
    this._selectedAnd = Boolean(selected);
    this._selectedMinus = false;
    this._updateClassName();
    return this._selectedAnd;
  },
  toggleAnd: function() {return this.selectedAnd = !this.selectedAnd; },
  _selectedMinus: false,
  get selectedMinus () { return this._selectedMinus; },
  set selectedMinus (selected) {
    this._selectedMinus = Boolean(selected);
    this._selectedAnd = false;
    this._updateClassName();
    return this._selectedMinus;
  },
  toggleMinus: function() {return this.selectedMinus = !this.selectedMinus; },
  resetSelection: function() { this.selectedAnd = this.selectedMinus = false; },
  _updateClassName: function() {
    setClassName(this.link, TagLink.ClassNames.And, this.selectedAnd);
    setClassName(this.link, TagLink.ClassNames.Minus, this.selectedMinus);
  },
  _mousedown: function(e) {
    // タグ複数選択時に，クリックと共に範囲選択されるのを防ぐ
    if (e.altKey && e.ctrlKey)
      e.preventDefault();
  },
  _click: function(e) {
    // 選択モード or Ctrl+Alt+クリック の場合，タグを選択・選択解除する
    if (AllTags.selectionMode || (e.altKey && e.ctrlKey)) {
      if (e.shiftKey) this.toggleMinus();
      else            this.toggleAnd();
      AllTags.selectionCallbacks.forEach(function(f) f());
      e.preventDefault();
      return;
    }
    // クリックされた場合，タグ検索へ移動
    // 一時的にhrefを書き換えることにより，タグの選択状況を反映させる
    var link = this.link, originalHref = link.href;
    link.href = AllTags.generateSearchURL(this);
    setTimeout(function() link.href = originalHref, 0);
  },
  decorate: function() {
    var parent = this.link.parentNode,
        icon = parent.querySelector('img[alt="カテゴリ"]');
    addClassName(parent, this.isDomain
                 ? TagLink.ClassNames.Domain
                 : TagLink.ClassNames.Foreign);
    if (icon !== null) {
      if (this.isLocked) {
        icon.src = LockedCategoryIcon1;
        icon.alt = '★カテゴリ';
      }
      return;
    }
    var name = (this.isLocked ? 'Locked' : '')+(this.isCategory ? 'Category' : '');
    if (name !== '')
      parent.insertBefore(TagLink.Marks[name].cloneNode(true), this.link);
  }
};



// 全てのタグ(海外タグ含む)を管理するクラス
var AllTags = [];
AllTags.selectionMode = false;
AllTags._showAll = false;
AllTags.__defineGetter__('showAll', function() this._showAll);
AllTags.__defineSetter__('showAll', function(value) {
                           value = Boolean(value);
                           GM_setValue('showAllTags', value);
                           return this._showAll = value;
                         });
AllTags.selectionCallbacks = [];
AllTags.container = null;
AllTags.init = function(container) {
  this.container = container;
  this._updateCache();
  this._updateTags();
};
AllTags.decorate = function(isLoading) {
  this.forEach(function(link) link.decorate());
  if (isLoading)
    return;
  CommandLinks.init(this.container);
  this.container.appendChild(SelectionMenu.menu);
};
AllTags.resetSelection = function() {
  this.forEach(function(link) link.resetSelection());
  this.selectionCallbacks.forEach(function(f) f());
};
AllTags.generateSearchURL = function(clickedTag) {
  var tags = this.filter(
    function(t) t.selectedAnd || (t === clickedTag && !t.selectedMinus)
  ).map(function(t) t.name).concat(
    this.filter(function(t) t.selectedMinus).map(function(t) '-' + t.name)
  );
  if (tags.length == 0)
    return 'javascript: void(0);';
  return 'http://www.nicovideo.jp/tag/' + tags.join('+');
};
AllTags._cacheObj = { all: null, domain: null };
AllTags.__defineGetter__('_cacheName', function() this.showAll ? 'all' : 'domain');
AllTags.__defineGetter__('_cache', function() this._cacheObj[this._cacheName]);
AllTags.__defineSetter__('_cache', function(v) this._cacheObj[this._cacheName] = v);
AllTags.clearCache = function() { this._cache = null; };
AllTags.clearAllCache = function() { this._cacheObj = { all: null, domain: null}; };
AllTags._updateCache = function() { this._cache = this.container.innerHTML; };
AllTags._showingForeignTags = false;
AllTags._updateTags = function() {
  var links = Array.slice(this.container.querySelectorAll('a[rel="tag"]') || []);
  var tags = links.map(function(l) l.textContent);
  if (!this.showAll) {
    DomainTags.replace(tags);
    this._showingForeignTags = false;
  } else {
    let ftags = tags.filter(function(t) !DomainTags.include(t));
    // 海外タグ表示→海外タグ表示と遷移した場合
    if (this._showingForeignTags) {
      let oldtags = this.map(function(t) t.name), newtags = [];
      // 海外タグと判定されたもののうち，新しく登場したものは国内タグと判定する
      [ftags, newtags] = ftags.partition(function(t) oldtags.include(t));
      DomainTags.push.apply(DomainTags, newtags);
    }
    this._showingForeignTags = true;
    ForeignTags.replace(ftags);
  }
  this.replace(links.map(function(link) new TagLink(link)));
};
AllTags.__defineSetter__(
  '_innerHTML', function(html) {
    this.container.innerHTML = html;
    this._updateCache();
    this._updateTags();
    // タグの更新後，大百科のアイコンが付かないニコニコ動画側のバグ(？)への対処
    this.forEach(this.container.querySelectorAll('[rel="tag"]:not(.nicopedia)'),
                 function(link) { addClassName(link, 'nicopedia'); });
    if (unsafeWindow.Nicopedia !== undefined)
      unsafeWindow.Nicopedia.decorateLinks();
    this.decorate(false);
  });
AllTags.refresh = function(callback) {
  var self = this;
  function update(html) {
    if (html.indexOf('<!DOCTYPE') == 0)
      self._innerHTML = '<p style="font-size: 12px; color: #cc0000; padding: 4px;">通信エラー (不正なレスポンスです)</p>';
    else
      self._innerHTML = html;
    if (callback instanceof Function)
      callback();
  }

  if (this._cache !== null) {
    update(this._cache);
    return;
  }
  this.container.innerHTML = '<img src="img/watch/tool_loading.gif" alt="処理中">';
  GM_xmlhttpRequest(
    {method: 'POST', url: RequestURL,
     headers: {'X-Requested-With': 'XMLHttpRequest',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
     data: 'cmd=tags' + (this.showAll ? '&all=1' : ''),
     onload: function(response) update(response.responseText)
    });
};


var HTMLUtil = {
  ClassNames: {
    CommandLink: className('command_link'),
    ToggleButton: className('toggle_button'),
    ToggleLabel: className('toggle_label')
  },
  setAttr: function(elem, attr) {
    for (let name in attr) {
      if (attr.hasOwnProperty(name))
        elem.setAttribute(name, attr[name]);
    }
  },
  _initElem: function(e4x, attr, className, type, fun) {
    var elem = e4xToDOM(e4x);
    this.setAttr(elem, attr);
    // クラス名を追加する (setAttr内でクラスが追加された場合上書きしないように)
    addClassName(elem, className);

    if (fun instanceof Function)
      elem.addEventListener(type, fun, false);
    return elem;
  },
  createCommandLink: function(text, fun, attr) {
    return this._initElem(
      <a href="javascript: void(0);">{text}</a>,
      attr, this.ClassNames.CommandLink,
      'click', fun);
  },
  createToggleButton: function(init, fun, attr) {
    var elem = this._initElem(
      <input type="checkbox"/>,
      attr, this.ClassNames.ToggleButton,
      'change', function() fun(this.checked)
    );
    elem.checked = init;
    return elem;
  },
  createLabeledToggle: function(label, init, fun) {
    var elem = e4xToDOM(<label class={this.ClassNames.ToggleLabel} />);
    elem.appendChild([this.createToggleButton(init, fun),
                      XML(label)].joinDOM());
    return elem;
  }
};

var SelectionMenu = {
  ClassNames: {
    Description: className('description'),
    Menu: className('selection_menu')
  },
  show: function() { this.menu.style.display = ''; },
  hide: function() { this.menu.style.display = 'none'; },
  setVisible: function(value) {
    if (value) SelectionMenu.show();
    else SelectionMenu.hide();
  }
};
Object.memoize(
  SelectionMenu, {
    search: function() {
      var link = HTMLUtil.createCommandLink('選択したタグで検索');
      AllTags.selectionCallbacks.push(
        function() link.href = AllTags.generateSearchURL());
      return link;
    },
    reset: function() {
      return HTMLUtil.createCommandLink(
        '選択解除', function() AllTags.resetSelection());
    },
    description: function() {
      return e4xToDOM(
        <span class={this.ClassNames.Description}>
        タグをクリックで <span class={TagLink.ClassNames.And}>選択</span>、
        Shift+クリックで <span class={TagLink.ClassNames.Minus}>マイナス選択</span>
        </span>);
    },
    menu: function() {
      var menu = e4xToDOM(
          <div class={this.ClassNames.Menu} style="display: none;"/>);
      menu.appendChild([this.search, this.reset, this.description].joinDOM(' | '));
      return menu;
    }
  }
);

var CommandLinks = {
  ClassNames: {
    Commands: className('commands'),
    Separator: className('separator')
  },
  _getEdit: function(container) {
    if (container === null) return null;
    var edit = container.querySelector('a[href^="javascript:startTagEdit"]');
    if (edit === null) return null;
    edit.textContent = "編集";
    addClassName(edit, HTMLUtil.ClassNames.CommandLink);
    edit.removeAttribute('style');
    return edit;
  },
  get counter() {
    if (AllTags.showAll)
      return e4xToDOM(
          <span><strong>{DomainTags.length}</strong>
          +
          <strong class={TagLink.ClassNames.Foreign}>{ForeignTags.length}</strong>
          件</span>);
    return e4xToDOM(<strong>{DomainTags.length}件</strong>);
  },
  init: function(video_tags) {
    var tagsContainer = video_tags.firstElementChild,
        edit = this._getEdit(tagsContainer),
        commandsContainer, links;

    if (edit !== null) {
      commandsContainer = edit.parentNode;
      links = [this.counter, edit, this.refresh, this.foreign, this.select];
    } else {
      // タグを更新できなかったとき。(混雑しています、など)
      if (tagsContainer === null)
        tagsContainer = video_tags;
      commandsContainer = document.createElement('nobr');
      tagsContainer.appendChild(commandsContainer);
      links = [this.refresh];
    }

    addClassName(commandsContainer, this.ClassNames.Commands);
    commandsContainer.appendChild(
      links.joinDOM('[ ',
                    <span class={this.ClassNames.Separator}> | </span>,
                    ' ]'));
  }
};
Object.memoize(
  CommandLinks, {
    refresh: function() {
      return HTMLUtil.createCommandLink(
        '更新', function() {
          AllTags.clearCache();
          AllTags.refresh();
        });
    },
    foreign: function() {
      return HTMLUtil.createLabeledToggle(
        '海外タグ', AllTags.showAll,
        function(value) {
          AllTags.showAll = value;
          AllTags.refresh();
        });
    },
    select: function() {
      return HTMLUtil.createLabeledToggle(
        '複数選択', AllTags.selectionMode,
        function(value) {
          AllTags.selectionMode = value;
          SelectionMenu.setVisible(value);
        });
    }
  }
);

unsafeWindow.finishTagEdit = function(url) {
  var editForm = document.getElementById('tag_edit_form');

  if(editForm !== null)
    editForm.innerHTML = '<img src="img/watch/tool_loading.gif" alt="処理中">';

  AllTags.clearAllCache();
  setTimeout(
    function() {
      AllTags.refresh(
        function() {
          document.getElementById('video_controls').style.display = '';
          if(editForm !== null)
            editForm.parentNode.removeChild(editForm);
        });
    }, 0);
};

// 初期化
(function() {
   AllTags.init(document.getElementById('video_tags'));
   AllTags.showAll = GM_getValue('showAllTags', AllTags.showAll);

   AllTags.decorate(AllTags.showAll);

   // 海外タグを表示しない場合
   if (!AllTags.showAll)
     return;

   // タグがついていない動画の場合，大百科の要素追加を待たず即座に更新
   if (AllTags.length === 0) {
     AllTags.refresh();
     return;
   }

   // 大百科アイコン追加後に更新
   AllTags.container.addEventListener('DOMNodeInserted', inserted, false);
   // タイムアウト設定(大百科アイコンが表示できない場合)
   setTimeout(refresh, NicopediaTimeout);

   // 大百科アイコン挿入後1回だけ更新する
   function refresh() {
     if (refresh.finished) return;
     refresh.finished = true;
     AllTags.container.removeEventListener('DOMNodeInserted', inserted, false);
     setTimeout(function() AllTags.refresh(), 0);
   }
   refresh.finished = false;

   // 追加された要素が大百科アイコンなら更新する
   function inserted(e) {
     var t = e.target;
     if (t.nodeName !== 'A' || t.title === undefined ||
         t.title.indexOf('大百科') !== 0)
       return;
     refresh();
   }
 })();


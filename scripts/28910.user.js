// ==UserScript==
// @name           nicovideo Thumbinfo popup
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Get information about nicovideo movies before going to watch page.
// @include        *
// @exclude        http://ext.nicovideo.jp/thumb/*
// @exclude        http://ext.nicovideo.jp/thumb_mylist/*
// @exclude        http://ext.nicovideo.jp/thumb_community/*
// @exclude        http://ichiba.nicovideo.jp/parts/*
// @resource       style    http://mfp.xrea.jp/misc/greasemonkey/nicovideoThumbinfoPopup/style.css
// @grant          GM_getResourceText
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// ==/UserScript==


// =========================================
// 機能の有効・無効
// =========================================

// 選択範囲ポップアップを実行するキーバインド
// 設定例
//   p => p
//   Ctrl+p => C-p
//   Alt+p or Meta+p => M-p
//   Ctrl+Shift+p => C-S-p
//   Ctrl+Escape => C-[esc]
//   利用できる特殊キー
//     => [esc], [return], [tab], [del],
//        [backspace], [up], [down], [left], [right], [space]
// 空文字にすると機能を無効に
const SELECTION_POPUP_KEY = 'p';
// 全てのポップアップを消去するキーバインド
const ALL_HIDE_KEY = '[esc]';
// 動画再生ページのsmilevideoへのリンクでポップアップを行うかどうか
const ENABLE_SMILEVIDEO_POPUP = true;
// 動画再生ページに情報を取りに行くか
// 動画再生ページに情報を取りに行くと，コミュニティ専用動画や削除済み動画をポップアップ表示できる
// しかし，視聴履歴にポップアップした動画が追加されてしまう
const ENABLE_WATCH_PAGE_GETTER = false;

// はてなブックマーク数を表示するかどうか
const SHOW_HATENA_BOOKMARK = true;
// 投稿者名を表示するかどうか
const SHOW_UPLOADER_NAME = true;
// 海外タグを表示するかどうか
const SHOW_FOREIGN_TAGS = true;
// 海外タグが n 個以上の時，あらかじめ折りたたんでおく
const FOREIGN_TAG_DEFAULT_SHOW_LIMIT = 15;
// 動画がニコニコ大百科に登録されている場合，リンクを表示
const SHOW_NICOPEDIA_MOVIE_LINKS = true;
// タグがニコニコ大百科に登録されている場合，リンクを表示
const SHOW_NICOPEDIA_TAG_LINKS = true;


// =========================================
// 細々とした設定
// =========================================

// デフォルトの国 ('jp', 'tw', 'de', 'es', '')
// ''にすると，全てのタグが海外タグとして扱われます
const HOME_COUNTRY_DOMAIN = 'jp';
// 動画のIDのプレフィックス
const VIDEO_ID_PREFIX =
  'sm|nm|fz|ax|ca|cd|cw|ig|na|nl|om|sd|sk|yk|yo|za|zb|zc|zd|ze|fx|so';
// カテゴリタグの正規表現
const CATEGORY_TAG_REGEXP =
  /^(?:公式|総合|音楽|エンターテイメント|アニメ|ゲーム|ラジオ|スポーツ|科学|料理|政治|動物|歴史|自然|ニコニコ動画講座|演奏してみた|歌ってみた|踊ってみた|投稿者コメント|日記|アンケート|チャット|テスト|台灣|その他|R-18)$/;
// 各国のサーバ名正規表現
const SERVER_NAME_REGEXP = 'www|tw|es|de|nine';
// ニコニコ動画のドメイン部
const NICOVIDEO_DOMAIN_REGEXP
  = 'http://(?:ext|' + SERVER_NAME_REGEXP + ')\\.nicovideo\\.jp';
const NICOMS_REGEXP = 'http://nico\.ms';
// ポップアップ表示されるまでの遅延時間(ミリ秒)
const SHOW_DELAY_TIME = 600;
// ポップアップが消えるまでの遅延時間(ミリ秒)
const HIDE_DELAY_TIME = 600;
// 親ポップアップが消えるまでの遅延時間(ミリ秒)
const HIDE_PARENT_DELAY_TIME = 300;





// 以下，スクリプト本体
const DEBUG = false;


var $A = Array.slice;
var removeAllChildren = function() {
  var range = document.createRange();
  return function(elem) {
    range.selectNodeContents(elem);
    range.deleteContents();
  };
}();
// prototype の拡張
(function(){
   Function.prototype.bind = function() {
     var self = this;
     var obj = Array.shift(arguments);
     var args = $A(arguments);
     return function() {
       return self.apply(obj, args.concat(Array.slice(arguments)));
     };
   };

   Array.prototype.remove = function(elem) {
     for(var i = this.length-1; i >= 0; i--){
       if(this[i] == elem)
         this.splice(i, 1);
     }
     return this;
   };

   Number.prototype.fill = function(order) {
     var s = this.toString();
     while(s.length < order)
       s = '0' + s;
     return s;
   };

   Date.prototype.toJpString = function() {
     return this.getFullYear() + '年' +  (this.getMonth()+1).fill(2) + '月' +  this.getDate().fill(2) + '日 ' +
       [this.getHours().fill(2), this.getMinutes().fill(2), this.getSeconds().fill(2)].join(':');
   };
   Date.toISO8601 = function(str) {
     var date = new Date(str);
     return date.toISO8601();
   };
   Date.prototype.toISO8601 = function() {
     var tzo = - this.getTimezoneOffset();
     return [this.getFullYear().fill(4),
             this.getMonth().fill(2),
             this.getDate().fill(2)].join('-')
       + 'T' + [this.getHours().fill(2),
                this.getMinutes().fill(2),
                this.getSeconds().fill(2)].join(':')
       + (tzo >= 0 ? '+' : '-') + Math.floor(tzo / 60).fill(2) + ':' + (tzo % 60).fill(2);
   };

   Date.fromISO8601 = function(str) {
     var date = new Date();
     date.setISO8601(str);
     return date;
   };
   Date.prototype.setISO8601 = new function() {
     const regexp = new RegExp(
       "^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2})" +
         "(?:T([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:\.([0-9]+))?)?" +
         "(?:Z|(?:([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$");
     return function (string) {
       var d = string.match(regexp);
       if(d == null)
         return;
       var offset = 0;
       var date = new Date(d[1], 0, 1);

       if (d[2]) { date.setMonth(d[2] - 1); }
       if (d[3]) { date.setDate(d[3]); }
       if (d[4]) { date.setHours(d[4]); }
       if (d[5]) { date.setMinutes(d[5]); }
       if (d[6]) { date.setSeconds(d[6]); }
       if (d[7]) { date.setMilliseconds(Number("0." + d[7]) * 1000); }
       if (d[8]) {
         offset = (Number(d[9]) * 60) + Number(d[10]);
         offset *= ((d[8] == '-') ? 1 : -1);
       }

       offset -= date.getTimezoneOffset();
       var time = (Number(date) + (offset * 60 * 1000));

       this.setTime(Number(time));
     };
   };

   String.prototype.insertComma = new function() {
     var regexp = /(\d{1,3})(?=(?:\d\d\d)+$)/g;
     return function() {
       return this.toString().replace(regexp, "$1,");
     };
   };

   String.prototype.encodeEntityReference = new function() {
     var div = document.createElement('div');
     return function() {
       div.textContent = this;
       return div.innerHTML;
     };
   };

   String.prototype.decodeEntityReference = new function() {
     var span = document.createElement('span');
     return function() {
       span.innerHTML = this;
       if(span.firstChild == null)
         return '';
       return span.firstChild.nodeValue;
     };
   };

   String.prototype.parseNicovideoDescription = new function() {
     const domainStrs = '[-_.!~*\'()a-zA-Z0-9;?:@&=+$,%#]';
     const urlStrs = '[-_.!~*\'()a-zA-Z0-9;?:@&=+$,%#]';
     const urlRegExp = new RegExp(
       '(^|[^a-z])' +
         '(?:'+
         '(?:watch/)?((?:'+VIDEO_ID_PREFIX+')\\d+)|' +
         '(co\\d+)|' +
         '(nc\\d+)|' +
         '((?:mylist|myvideo|user|watch)/\\d+(?:/\\d+)?)|' +
         '((?:h?t?t?ps?|ftp)(?:'
         + '://www\\.veoh\\.com/videos/v\\d+[0-9a-zA-Z]{8}|'
         + '://' + domainStrs + '+(?:/' + urlStrs + '*)*)'
         + ')|' +
         '((?:\\s|　){3,})' +
         ')');

     return function(onlyNicovideoIDs) {
       var parent = $F(this);
       var node = parent.firstChild;
       var m;
       while((m = node.nodeValue.match(urlRegExp)) != null) {
         var [text, pre, video, comu, commons, mylist, url, spaces] = m;
         var left = RegExp.leftContext;

         var linkText = node;
         var leftLen = left.length + pre.length;
         if(leftLen > 0)
           linkText = node.splitText(leftLen);
         var temp = node.textContent;
         node = linkText.splitText(text.length - pre.length);

         if(spaces) {
           parent.replaceChild($N('br'), linkText);
           continue;
         }

         var link;
         if(video)
           link = $N('a', {href: 'http://www.nicovideo.jp/watch/'+video});
         if(comu)
           link = $N('a', {href: 'http://ch.nicovideo.jp/community/' + comu});
         if(commons)
           link = $N('a', {href: 'http://www.niconicommons.jp/material/' + commons});
         if(mylist)
           link = $N('a', {href: 'http://www.nicovideo.jp/' + mylist});
         if(url) {
           if(url.indexOf('p') == 0){
             url = 'htt' + url;
           }
           else if(url.indexOf('tp') == 0) {
             url = 'ht' + url;
           }
           else if(url.indexOf('ttp') == 0) {
             url = 'h' + url;
           }
           link = $N('a', {href: url});
           linkText.textContent = decodeURI(linkText.textContent);
         }

         parent.replaceChild(link, linkText);
         if(link.previousSibling != null)
           parent.insertBefore($F(' '), link);
         if(link.nextSibling != null)
           link.nextSibling.textContent = ' ' + link.nextSibling.textContent;
         link.appendChild(linkText);
       }

       return parent;
     };
   };

   Object.add = function() {
     var obj = Array.shift(arguments);
     var key = Array.shift(arguments);
     var value = Array.shift(arguments);
     obj[key] = value;
     if(arguments.length > 0){
       Array.unshift(arguments, obj);
       return Object.add.apply(this, arguments);
     }
     return obj;
   };

   Object.format = function(obj) {
     var line = [];
     for(var key in obj) {
       if(obj.hasOwnProperty(key))
         line.push(key+': '+ obj[key]);
     }
     return line.join('\n');
   };

   Object.setWatchEx = function(obj) {
     log('setWatchEx', obj);
     var hash = {};
     var values = {};

     obj.setValue = function(propName, value) {
       group('setValue', propName, value);
       var oldVal = values[propName];
       values[propName] = value;
       if(hash[propName] !== undefined){
         group('propChange', propName, ':', oldVal, '=>', value);
         log('functions: ', hash);
         // 要素の増減が起こるので slice() でコピーする
         hash[propName].slice().forEach(
           function(f, i) {
             group('call ' + propName + ' f[', i, ']', f);
             f(propName, oldVal, value);
             groupEnd();
           });
         groupEnd();
       }
       groupEnd();
     };

     obj.addData = function(data) {
       group('addData');
       for(var propName in data) {
         if(data.hasOwnProperty(propName))
           obj.setValue(propName, data[propName]);
       }
       groupEnd();
     };

     obj.getValue = function(propName){
       return values[propName];
     };

     // 複数の関数による監視に対応した拡張版 watch, unwatch
     obj.watchEx =  function(propName, fun) {
       log('watchEx(', propName, fun, ')');
       if(hash.hasOwnProperty(propName)) {
         hash[propName].push(fun);
         return;
       }
       hash[propName] = [fun];
     };

     obj.unwatchEx =  function(propName, fun) {
       log('unwatchEx', propName);
       if(!hash.hasOwnProperty(propName))
         throw new Error("Prperty `" + propName + "' is not watched.");
       hash[propName].remove(fun);
       if(hash[propName].length == 0) {
         // unwatch を抜けてから実行しないと this[propName] == undefined になることがある。
         // firefox のバグ？
//          setTimeout(
//            function() {
//              if(!hash.hasOwnProperty(propName))
//                this.unwatch(propName);
//            }.bind(this), 0);
         delete hash[propName];
       }
     };

     obj.invokeWithPropCond = function(propName, fun, cond) {
       group('set invokeWithPropCond', propName);
       if(cond(obj.getValue(propName))) {
         log('already satisfies cond');
         fun.call(this);
         groupEnd();
         return;
       }
       var watchFun = function(_, oldVal, newVal) {
         if(!cond(newVal)) return;
         this.unwatchEx(propName, watchFun);
         fun.call(this);
       }.bind(this);
       this.watchEx(propName, watchFun);
       groupEnd();
     };

     // this[propName] が初めて定義されたときに fun を実行
     obj.invokeWhenDefinedProp = function(propName, fun) {
       group('set invokeWithDefinedProp', propName);
       this.invokeWithPropCond(
         propName, fun,
         function(val) { return val !== undefined; });
       groupEnd();
     };

     // this[propName] が初めて true になった時に fun を実行
     obj.invokeWithFlagProp = function(propName, fun) {
       group('set invokeWithFlagProp', propName);
       this.invokeWithPropCond(
         propName, fun,
         function(val) { return Boolean(val); }.bind(this));
       groupEnd();
     };
   };
 })();


// 定数群
var ClassNames = new function() {
  var prefix = '_GM_nicovideo_thumbinfo_popup_';

  // class を生成
  var cNames = {}, selectors = {};
  cNames.base = prefix + 'base';
  selectors.base = 'body > div.' + cNames.base;

  function registName(name) {
    if(!cNames.hasOwnProperty(name)) {
      cNames[name] = prefix + name;
      selectors[name] = cNames[name];
    }
  }

  // __hoge__ -> CSSNames[hoge] の置換
  var cssString =  GM_getResourceText('style').replace(
      /__(\w+)__/g,
    function(_, name) {
      registName(name);
      return selectors[name];
    });

  GM_addStyle(cssString);

  this.prefix = prefix;
  this.get = function(name) {
    if(!cNames.hasOwnProperty(name)) {
      throw new Error('CSSNames::get: `'+ name + '\' is undefined css name.');
    }
    return cNames[name];
  };
  function _has(eName, cName) {
    return eName.indexOf(cName) != -1;
  }
  this.has = function(elem, name) {
    return _has(
      ' ' + elem.className + ' ',
      ' ' + this.get(name) + ' ');
  };
  this.add = function(elem, name) {
    var cName = ' ' + this.get(name) + ' ';
    if(_has(' ' + elem.className + ' ', cName))
      return;
    elem.className += cName;
  };
  this.remove = function(elem, name) {
    var eName = ' ' + elem.className + ' ';
    var cName = ' ' + this.get(name) + ' ';
    if(!_has(eName, cName))
      return;
    elem.className = eName.replace(cName, ' ');
  };
  this.set = function(elem, name, value){
    if(value)
      this.add(elem, name);
    else
      this.remove(elem, name);
  };
};


const POPUP_PARENT_ATTRIBUTE = ClassNames.prefix + 'parent_number';
const POPUP_DISABLED_ATTRIBUTE = ClassNames.prefix + 'disabled';
const POPUP_EVENT_REGISTERED_ATTRIBUTE = ClassNames.prefix + 'registered';


// ポップアップ本体
var PopupFrame = function() {
  const OPENER_TYPE = { LINK: 0, SELECTION: 1, MOUSEOVER: 2 };
  var PopupFrame = function(contentGenerator, parentPopup, creatorElement) {
    this.frame = PopupFrame._createFrame(this);
    this.init(parentPopup, creatorElement);

    this.content = contentGenerator.generate(this);
    this.frame.appendChild(this.content);
  };
  PopupFrame._createFrame = function(popup) {
    // 閉じるボタン・ボタンのコンテナ・フレーム
    var closeButton = $N('span$close_button', null, '\u00d7');
    closeButton.addEventListener('click', popup.hide.bind(popup, true), false);
    var buttonsC = $N('p$buttons_container', null, [closeButton]);
    var frame = $N('div$base', null, buttonsC);

    frame.addEventListener('dblclick', popup.toggleFixed.bind(popup), false);
    frame.addEventListener('click',
                           function(e) {
                             if(e.target != closeButton) popup.focus();
                           },
                           false);
    frame.addEventListener(
      'mouseover', function() { popup.mouseover = true; }, false);
    frame.addEventListener(
      'mouseout', function() { popup.mouseover = false; }, false);

    var orig_top, orig_left;
    var mousemove = function(e) {
      e.preventDefault();
      frame.style.top = (e.pageY + orig_top) + 'px';
      frame.style.left = (e.pageX + orig_left) + 'px';
    };
    frame.addEventListener(
      'mousedown',
      function(e) {
        if(!e.ctrlKey)
          return;
        e.preventDefault();
        popup.manuallyMoved = true;
        orig_top = parseInt(frame.style.top, 10) - e.pageY;
        orig_left = parseInt(frame.style.left, 10) - e.pageX;
        document.addEventListener('mousemove', mousemove, false);
      },
      false);
    frame.addEventListener(
      'mouseup',
      function(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', mousemove, false);
      },
      false);
    return frame;
  };
  PopupFrame.OPENER_TYPE = OPENER_TYPE;

  PopupFrame.prototype = {
    visible: false,
    manuallyMoved: false,
    openerType: OPENER_TYPE.LINK,

    _addChildPopup: function(popup) {
      this.childPopups.push(popup);
    },
    _removeChildPopup: function(popup) {
      this.childPopups = this.childPopups.filter(
        function(p) {
          return p.uniqueID != popup.uniqueID;
        });
    },

    init: function(parentPopup, creatorElement) {
      this.uniqueID = PopupManager.add(this);
      this.visible = false;
      this.manuallyMoved = false;
      this._clearTimer();
      this._initMouseover();
      this._initFixed();
      //     this._initExpanded();
      this._initParent(parentPopup);
      if(creatorElement !== undefined)
        this.creatorElement = creatorElement;
      else
        this.creatorElement = null;
    },
    _initParent: function(parentPopup){
      this.childPopups = [];
      this.parentPopup = parentPopup;
      if(this.parentPopup !== null)
        this.parentPopup._addChildPopup(this);
    },

    get _allChildrenHidden() {
      return this.childPopups.every(
        function(popup){
          return (popup.fixed || !popup.visible) && popup._allChildrenHidden;
        });
    },
    get unfixedParent() {
      var parent = this;
      do {
        parent = parent.parentPopup;
      } while(parent !== null && parent.fixed)
      return parent;
    },

    _mouseover: false,
    get mouseover() { return this._mouseover; },
    set mouseover(value) {
      value = Boolean(value);
      this._mouseover = value;
      ClassNames.set(this.frame, 'mouseover', value);
      if(this.parentPopup !== null)
        this.parentPopup.mouseover = value;
      if(value) {
        this._clearTimer();
        this.openerType = OPENER_TYPE.MOUSEOVER;
      } else if(this._allChildrenHidden) {
        this.hideDelay(false, OPENER_TYPE.MOUSEOVER);
      }
      return value;
    },
    _initMouseover: function() {
      this._mouseover = false;
      ClassNames.remove(this.frame, 'mouseover');
    },

    _delayTimer: null,
    _setTimer: function(func, delay) {
      window.clearTimeout(this._delayTimer);
      this._delayTimer = window.setTimeout(func, delay);
    },
    _clearTimer: function() {
      window.clearTimeout(this._delayTimer);
      this._delayTimer = null;
    },
    showDelay: function(openerType, delay) {
      this.openerType = openerType;
      if(delay === undefined)
        delay = SHOW_DELAY_TIME;
      ClassNames.add(this.frame, 'mouseover', true);
      this._setTimer(this.show.bind(this, openerType), delay);
    },
    hideDelay: function(force, closerType, delay) {
      if(delay === undefined)
        delay = HIDE_DELAY_TIME;
      ClassNames.remove(this.frame, 'mouseover', false);
      this._setTimer(this.hide.bind(this, force, closerType), delay);
    },

    show: function(openerType) {
      this.openerType = openerType;
      if(this.visible)
        return;
      this.visible = true;
      this.focus();
      this.adjustPosition();
    },
    hide: function(force, closerType) {
      if(!force && (this.fixed || this.openerType != closerType))
        return;
      // ポップアップを削除
      if(this.frame.parentNode !== null)
        this.frame.parentNode.removeChild(this.frame);

      PopupManager.remove(this);

      // 親・子ポップアップからの参照を解除
      if(this.childPopups.length != 0) {
        this.childPopups.forEach(
          function(popup){
            popup.parentPopup = null;
            popup.creatorElement = null;
          });
      }
      if(this.parentPopup !== null)
        this.parentPopup._removeChildPopup(this);

      // マウスオーバーでこのポップアップが消えた場合，親ポップアップに伝播する
      var parent = this.unfixedParent;
      if(parent !== null
         && parent.openerType == OPENER_TYPE.MOUSEOVER
         && !parent.mouseover
         && parent._allChildrenHidden){
        parent.hideDelay(false, OPENER_TYPE.MOUSEOVER);
      }

      this.visible = false;
    },
    focus: function() {
      document.body.appendChild(this.frame);
    },

    _fixed: false,
    get fixed() { return this._fixed; },
    set fixed(value) {
      value = Boolean(value);
      if(this._fixed == value)
        return value;
      this._fixed = value;
      ClassNames.set(this.frame, 'fixed', value);
      return this._fixed;
    },
    fix: function() { this.fixed = true; },
    unfix: function() { this.fixed = false; },
    toggleFixed: function() { this.fixed = !this.fixed; },
    _initFixed: function() {
      this._fixed = false;
      ClassNames.remove(this.frame, 'fixed');
    },

    _expanded: false,
    get expanded() { return this._expanded; },
    set expanded(value) {
      value = Boolean(value);
      if(this._expanded == value)
        return value;
      this._expanded = value;
      ClassNames.set(this.frame, 'expanded', value);
      this.adjustPosition();
      return this._expanded;
    },
    shrink: function() { this.expanded = false; },
    expand: function() { this.expanded = true; },
    _initExpanded: function() {
      this._expanded = false;
      ClassNames.remove(this.frame, 'expanded');
    },

    adjustPosition: function() {
      const POPUP_VERTICAL_MARGIN = 10;
      const POPUP_HORIZONTAL_MARGIN = 10;

      if(this.manuallyMoved || this.creatorElement === null)
        return;

      var width = this.frame.offsetWidth;
      var linkPos = getPosition(this.creatorElement);

      // リンクの上側に表示
      var top = linkPos.top - this.frame.offsetHeight - POPUP_VERTICAL_MARGIN;
      // 画面上部からはみ出すのなら下側に表示
      if(top < 0)
        top = linkPos.bottom + POPUP_VERTICAL_MARGIN;
      // 画面下部からもはみ出すのなら画面内最上部に表示
      if(top + this.frame.offsetHeight > window.innerHeight)
        top = POPUP_VERTICAL_MARGIN;
      this.frame.style.top = top + 'px';

      var maxLeft = document.documentElement.clientWidth
        - POPUP_HORIZONTAL_MARGIN - this.frame.offsetWidth;
      // 左揃え
      var left = linkPos.left;
      // 右端がはみ出すなら中央揃えに
      if(left > maxLeft) {
        left = linkPos.left + linkPos.width / 2 - width / 2;
        // 中央揃えでも右端がはみ出すなら右揃え
        if(left > maxLeft) {
          left = linkPos.right - this.frame.offsetWidth;
          // インライン要素が折り返してるときなどはそれでもはみ出すので画面右にそろえる
          if(left > maxLeft)
            left = maxLeft;
        }
      }
      if(left < POPUP_HORIZONTAL_MARGIN)
        left = POPUP_HORIZONTAL_MARGIN;
      this.frame.style.left = left + 'px';
    },
    move: function(dx, dy) {
      this.frame.style.top = (parseInt(this.frame.style.top, 10) - dy) + 'px';
      this.frame.style.left = (parseInt(this.frame.style.left, 10) - dx) + 'px';
    }
  };
  return PopupFrame;
}();


// ポップアップの管理
var PopupManager = function() {
  var Server = {
    popups: [],
    find: function(id) {
      log('PopupManager find', id);
      if(id === null || id === undefined)
        return null;
      if(id >= 0 &&  id < this.popups.length)
        return this.popups[id];
      return null;
    },
    add: function(popup) {
      log('PopupManager add', popup);
      var id;
      if(popup.uniqueID !== undefined) {
        id = popup.uniqueID;
        if(this.popups[id] !== popup && this.popups[id] !== undefined) {
          throw new Error('invalid unique ID');
        }
        this.popups[id] = popup;
        return id;
      }
      id = this.popups.indexOf(popup);
      if(id != -1)
        return id;
      this.popups.push(popup);
      return this.popups.length - 1;
    },
    remove: function(popup) {
      log('PopupManager remove');
      var id = this.popups.indexOf(popup);
      if(id == -1)
        return -1;
      delete this.popups[id];
      return id;
    },

    movePopups: function(dx, dy) {
      this.popups.forEach( function(popup) { popup.move(dx, dy); });
    },
    hideAll: function() {
      this.popups.forEach(function(p) { p.hideDelay(); });
    },

    _registMouseEvents: function(target, generator) {
      if(target.hasAttribute(POPUP_EVENT_REGISTERED_ATTRIBUTE))
        return null;
      target.setAttribute(POPUP_EVENT_REGISTERED_ATTRIBUTE, 'true');

      var parent = PopupManager.find(target.getAttribute(POPUP_PARENT_ATTRIBUTE));
      var obj = {
        popup: null,
        create: function() {
          this.popup = new PopupFrame(generator(), parent, target);
        },
        show: function() {
          if(this.popup === null) {
            this.create();
          }
          else if(!this.popup.visible) {
            this.popup.init(parent, target);
          }
          else if(this.popup.fixed) {
            this.create();
          }
          this.popup.showDelay(PopupFrame.OPENER_TYPE.LINK);
        },
        hide: function() {
          if(this.popup !== null)
            this.popup.hideDelay(false, PopupFrame.OPENER_TYPE.LINK);
        }
      };

      target.addEventListener('mouseover', obj.show.bind(obj), false);
      target.addEventListener('mouseout', obj.hide.bind(obj), false);
      document.addEventListener(
        'DOMNodeRemoved',
        function(e) {
          if(e.target.compareDocumentPosition(target) & 16)
            obj.hide();
        },
        false);
      return obj;
    },
    _urlGenerators: [],
    _traverseLink: function(elem) {
      if(elem.nodeType != 1 || elem.hasAttribute(POPUP_DISABLED_ATTRIBUTE))
        return;

      var url;
      switch(elem.nodeName) {
      case 'IFRAME':
      case 'IMG':
        url = elem.src;
        break;
      case 'A':
      case 'AREA':
      case 'LINK':
        url = elem.href;
        break;
      }
      if(url !== undefined) {
        this._urlGenerators.forEach(
          function(pair) {
            var [regExp, generator] = pair;
            var m;
            if((m = regExp.exec(url)) !== null) {
              var obj = this._registMouseEvents(elem, generator(m));
              if(obj !== null)
                obj.show();
            }
          }, this);
      }

      if(elem.parentNode !== null)
        this._traverseLink(elem.parentNode);
    },

    _selectionGenerators: [],
    _parseSelection: function() {
      var selection = getSelection();
      if(!selection)
        return;
      var str = selection.toString();
      this._selectionGenerators.forEach(
        function(pair) {
          var [regExp, generator] = pair;
          var m, i = 0;
          while((m = regExp.exec(str)) !== null) {
            var popup = new PopupFrame(generator(m), null, null);
            popup.manuallyMoved = true;
            popup.frame.style.top = 10*i + 'px';
            popup.frame.style.left = 50*i + 'px';
            popup.showDelay();
            i++;
          }
        }, this);
    },

    addElementPopup: function(element, generator) {
      this._registMouseEvents(element, generator);
    },
    addURLPopup: function(urlRegExp, generator) {
      this._urlGenerators.push([urlRegExp, generator]);
    },
    addSelectionPopup: function(selRegExp, generator) {
      this._selectionGenerators.push([selRegExp, generator]);
    }
  };

  // イベントリスナの登録
  var sTop = document.documentElement.scrollTop;
  var sLeft = document.documentElement.scrollLeft;
  window.addEventListener(
    'scroll',
    function(e) {
      var oldLeft = sLeft;
      var oldTop = sTop;
      sTop = document.documentElement.scrollTop;
      sLeft = document.documentElement.scrollLeft;
      Server.movePopups(sLeft - oldLeft, sTop - oldTop);
    },
    false);

  document.addEventListener(
    'mouseover',
    function(e) { Server._traverseLink(e.target); }, false);

  addKeyBind(
    SELECTION_POPUP_KEY,
    function(e, key) { Server._parseSelection(); });

  addKeyBind(
    '[esc]',
    function(e, key) { Server.hideAll(); });

  return Server;
}();


// 情報取得オブジェクト
var InfoGetter = function() {
  const LOAD_STATE = { WAITING: 0, LOADING: 1, COMPLETED: 2 };
  var Getter = function() {};
  Getter.prototype = {
    loadState: LOAD_STATE.WAITING,
    response: null,
    data: null,
    init: function(url) {
      this.url = url;
      this.converter = function(x) { return x; };
      this.waitFunction = function() { return 0; };
      this.callbacks = [];
      this.loadState = LOAD_STATE.WAITING;
      this.response = null;
      this.data = null;
    },
    get: function(callback) {
      group('get', this);
      if(typeof callback == 'function')
        this.callbacks.push(callback);
      if(this.loadState == LOAD_STATE.LOADING) {
        log('loading');
        groupEnd();
        return;
      }
      if(this.loadState == LOAD_STATE.COMPLETED) {
        log('completed');
        this._callCallbacks();
        groupEnd();
        return;
      }
      var wait = this.waitFunction();
      if(wait > 0) {
        log('waiting');
        window.setTimeout(this.get.bind(this), wait);
        groupEnd();
        return;
      }

      log('access');
      this.loadState = LOAD_STATE.LOADING;
      GM_xmlhttpRequest(
        { method: 'GET',
          url: this.url,
          headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey; nicovideo Thumbinfo popup' },
          onload: onload.bind(this)
        });
      groupEnd();

      function onload(response) {
        if(this.loadState != LOAD_STATE.LOADING)
          return;
        group('InfoGetter onload', this,
              (this.url.length > 100)
              ? this.url.substr(0, 100) + '...'
              : this.url);
        this.response = response;
        var converted = this.converter(response);
        log('  ', response, ' => ', converted);
        this.data = converted;
        this._callCallbacks();
        this.loadState = LOAD_STATE.COMPLETED;
        groupEnd();
      }
    },
    _callCallbacks: function() {
      group('_callCallbacks');
      var callback;
      while((callback = this.callbacks.shift()) !== undefined) {
        group('callback');
        callback(this.data);
        groupEnd();
      }
      groupEnd();
    }
  };
  Getter.createSpecialized = function(Obj) {
    Obj.prototype = new Getter();

    var getterObjs = {};
    const propPrefix = 'InfoGetterProp';
    Obj.getGetter = function(id){
      var propName = propPrefix + id;
      if(!getterObjs.hasOwnProperty(propName))
        getterObjs[propName] = new Obj(id);
      return getterObjs[propName];
    };
    return Obj;
  };
  Getter.converters = {
    response2XMLConverter: function() {
      var parser = new DOMParser();
      return function(response) {
        if(response.responseText == '')
          return null;
        return parser.parseFromString(response.responseText, 'text/xml');
      };
    }(),
    query2ObjectConverter: function(response) {
      var data = {};
      response.responseText.split('&').forEach(
        function(pair) {
          var [key, val] = pair.split('=');
          key = decodeURIComponent(key);
          val = decodeURIComponent(val);
          data[key] = val;
        }
      );
      return data;
    }
  };
  Getter.LOAD_STATE = LOAD_STATE;
  return Getter;
}();


// ポップアップの内容生成オブジェクト
var NicovideoContentGenerator = function() {
  var ThumbinfoGetter = function(id) {
    this.init('http://ext.nicovideo.jp/api/getthumbinfo/' + id);
    this.converter = InfoGetter.converters.response2XMLConverter;
  };
  var UploaderNameGetter = function(videoID) {
    this.init('http://www.smilevideo.jp/view/'
              + videoID.replace(/^[a-z]{2}/, ''));
    this.converter = function(response) {
      if(/<strong>([^<]+?)<\/strong> が投稿した動画を/.test(response.responseText))
        return RegExp.$1.decodeEntityReference();
      else
        return null;
    };
  };
  var GetFLVGetter = function(threadID) {
    this.init('http://www.nicovideo.jp/api/getflv/' + threadID);
    this.converter = InfoGetter.converters.query2ObjectConverter;
  };
  var WatchPageGetter = function(id) {
    this.init('http://www.nicovideo.jp/watch/' + id);
    this.converter = function(response) {
      var m = response.responseText.match(
          /<script type="text\/javascript">(?:\r\n)*<!--(?:\r\n)*var Video = \{\r\n((?:[^\}][^\r\n]+\r\n)+)\}/);

      if(m === null) {
        return null;
      }

      var Video = {};
      // m オプションをつけると$は改行の直前にマッチ
      m[1].split(/,?$\r\n/m).forEach(
        function(line){
          var m = line.match(/^\s*(\w+):\s*((?:\s|.)+)$/);
          if(m == null)
            return;
          var [, key, val] = m;
          Video[key] = parseVal(val);
        });

      if (/<a href="\/user\/(\d+)">投稿者プロフィールへ<\/a>/
          .test(response.responseText)) {
        Video.userID = parseInt(RegExp.$1);
      } else {
        Video.userID = null;
      }

      return Video;

      // インチキ JSON パーサ
      function parseVal(val) {
        if(/^\d+$/.test(val)) {
          return parseInt(val, 10);
        }
        else if(/^true|false$/.test(val)) {
          return val == 'true';
        }
        else if(/^\'.+\'$/.test(val)) {
          return eval(val);
        }
        else if(/^\[([^\]]+)\]$/.test(val)) {
          return RegExp.$1.split(',').map(
            function(str){
              return parseVal(str);
            });
        }
        return null;
      }
    };

    var lastGet = 0;
    const wait = 1000;
    this.waitFunction = function() {
      var now = new Date();
      var diff = now - lastGet;
      if(diff >= wait) {
        lastGet = now;
        return 0;
      }
      return -diff;
    };
  };
  var NicopediaExistMovieGetter = function(videoID) {
    this.init('http://api.nicodic.jp/page.exist/__fun__/v/' + videoID);
    this.converter = function(response) {
      if(/^__fun__\((0|1)\);$/.test(response.responseText))
        return parseInt(RegExp.$1);
      else
        return null;
    };
  };
  const NICOPEDIA_EXIST_WORD_API_MAX_WORDS = 1;
  var NicopediaExistWordGetter = function(words) {
    if(words.length > NICOPEDIA_EXIST_WORD_API_MAX_WORDS)
      throw new Error('NicopediaExistWordGetter: too many words!');
    this.init(
      'http://api.nicodic.jp/e/__fun__/'
        + words.map(encodeURIComponent).join('/'));
    this.converter = function(response){
      if(/^__fun__\((\[(?:(?:0|1),)*(?:0|1)\])\);$/.test(response.responseText))
        return eval(RegExp.$1);
      else
        return null;
    };
  };

  [ThumbinfoGetter, UploaderNameGetter, GetFLVGetter, WatchPageGetter,
   NicopediaExistMovieGetter, NicopediaExistWordGetter]
    .forEach(InfoGetter.createSpecialized);

  const VideoDataStatus = {
    COMPLETED: 0,
    LOADING: 1,
    ERROR: 2
  };

  var VideoData = function(id) {
    group('new VideoData', id);
    Object.setWatchEx(this);

    this.setValue('_showUploaderName', SHOW_UPLOADER_NAME);
    this.setValue('_showNicopediaTagLinks', SHOW_NICOPEDIA_TAG_LINKS);
    this.setValue('_showNicopediaMovieLink', SHOW_NICOPEDIA_MOVIE_LINKS);
    this.setValue('_enableWatchPageGetter', ENABLE_WATCH_PAGE_GETTER);

    this.watchEx(
      'videoID',
      function(propName, oldVal, newVal) {
        this.setValue('videoIndex', newVal.slice(2));
      }.bind(this));

    this.watchEx(
      'videoIndex',
      function(propName, oldVal, newVal) {
        if(this.getValue('thumbnailURL') === undefined)
          this.setValue('thumbnailURL',
                        'http://tn-skr.smilevideo.jp/smile?i=' + newVal);
      }.bind(this));

    group('set initial IDs');
    if(isVideoID(id)) this.setValue('videoID', id);
    else if(isThreadID(id)) this.setValue('threadID', id);
    else throw new Error('Invalid id `' + id + '\'.');
    groupEnd();

    group('set invoke Handler');
    this.setValue('watchURL','http://www.nicovideo.jp/watch/' + id);
    this.invokeWithFlagProp(
      '_showUploaderName',
      function() { this.invokeWhenDefinedProp('videoID', this._getUploaderName); });

    this.invokeWithFlagProp(
      '_showNicopediaTagLinks',
      function() {
        this.invokeWhenDefinedProp('tags', this._getNicopediaTags);
      });

    this.invokeWithFlagProp(
      '_showNicopediaMovieLink',
      function() {
        this.invokeWhenDefinedProp('videoID', this._getNicopediaMovie);
      });
    groupEnd();

    this._getThumbinfo();
    groupEnd();
  };
  VideoData.prototype = {
    _selectProperty: function() {
      var array = $A(arguments);
      var len = array.length;
      for(var i = 0; i < len; i++) {
        var propName = array[i];
        if(this.getValue(propName) !== undefined) {
          return [propName, this.getValue(propName)];
        }
      }
      return [undefined, undefined];
    },
    getID: function() {
      return this.getValue('threadID') || this.getValue('videoID');
    },

    _updateStatus: function(status, detail, flvError) {
      if(flvError !== undefined)
        this.setValue('flvError', flvError);
      this.setValue('statusDetail', detail);
      this.setValue('status', status);
    },
    _parseThumbinfoJSON: function(json, thumbType) {
      group('parseThumbinfoJSON');
      var data = {};
      data.videoID = json['id'];
      data.title = json['title'];
      data.parsedDescription = json['description'];
      // deleted な時は
      // json['thumbnail'] = http://res.nicovideo.jp/http://res.nicovideo.jp/img/common/video_deleted.jpg
      // になってるのでその対策
      if(!/http:\/\/.+http:\/\//.test(json['thumbnail']))
        data.thumbnailURL = json['thumbnail'];
      data.postedAt = Date.toISO8601(json['postedAt']);
      var len = parseInt(json['length'], 10);
      data.length = Math.floor(len/60) + ':' + (len%60);
      data.viewCounter = json['viewCount'].toString();
      data.commentCounter = '???';
      data.mylistCounter = json['mylistCount'].toString();
      data.lastResBody = null;
      data.watchURL = 'http://www.nicovideo.jp/watch/' + json['v'];
      data.thumbType =
        (thumbType !== undefined)
        ? thumbType
        : json['isMymeory']
        ? 'mymemory'
        : 'video';
      var tags = {};
      var locked = json['lockedTags'] || [];
      tags[HOME_COUNTRY_DOMAIN] = json['tags'].map(
        function(name) {
          return {
            name: name,
            locked: (locked).indexOf(name) !== -1,
            category: CATEGORY_TAG_REGEXP.test(name)
          };
        });
      data.tags = tags;
      this.addData(data);
      groupEnd();
    },
    _parseThumbinfoXML: function(xml, thumbType) {
      group('parseThumbinfoXML');
      var data = {};
      data.tags = {};
      Array.forEach(
        xml.getElementsByTagName('thumb')[0].childNodes,
        function(node) {
          if(node.nodeType != 1)
            return;
          var text = node.textContent;
          switch(node.nodeName) {
          case 'video_id': data.videoID = text; break;
          case 'title': data.title = text; break;
          case 'description': data.description = text; break;
          case 'thumbnail_url': data.thumbnailURL = text; break;
          case 'first_retrieve': data.postedAt = text; break;
          case 'length': data.length = text; break;
          case 'view_counter': data.viewCounter = text; break;
          case 'comment_num': data.commentCounter = text; break;
          case 'mylist_counter': data.mylistCounter = text; break;
          case 'last_res_body': data.lastResBody = text; break;
          case 'user_id': data.userID = parseInt(text); break;
          case 'watch_url':
            if(this.getValue('optionalThreadID') !== undefined)
              text.replace(this.getValue('optionalThreadID'),
                           this.getValue('threadID'));
            data.watchURL = text.replace('http://ext.', 'http://www.');
            break;
          case 'thumb_type':
            data.thumbType = (thumbType !== undefined) ? thumbType : text;
            break;
          case 'tags':
            data.tags[node.getAttribute('domain')] = Array.map(
              node.getElementsByTagName('tag'),
              function(tag) {
                return { name: tag.textContent,
                         locked: tag.hasAttribute('lock'),
                         category: CATEGORY_TAG_REGEXP.test(tag.textContent)};
              });
          }
        },
        this
      );
      this.addData(data);
      groupEnd();
    },
    _getWatchPage: function(thumbType, errorDetail) {
      group('getWatchPage');
      var [idType, id] = this._selectProperty('threadID', 'videoID');
      if(!this.getValue('_enableWatchPageGetter')) {
        this._updateStatus(VideoDataStatus.LOADING, 'waitingForWatchPageConfirm');
      }
      this.invokeWithFlagProp(
        '_enableWatchPageGetter',
        function() {
          group('get watchpage');
          this._updateStatus(VideoDataStatus.LOADING, 'loadingWatchPage');
          WatchPageGetter.getGetter(id).get(
            function(json) {
              if(json === null) {
                this._updateStatus(VideoDataStatus.ERROR, errorDetail);
                return;
              }
              this._parseThumbinfoJSON(json, thumbType);
              this._updateStatus(VideoDataStatus.COMPLETED, '');
            }.bind(this));
          groupEnd();
        });
      groupEnd();
    },
    _getGetFLV: function() {
      group('getGetFLV');
      var [idType, id] = this._selectProperty('optionalThreadID', 'threadID', 'videoID');
      this._updateStatus(VideoDataStatus.LOADING, 'loadingGetFLV');

      GetFLVGetter.getGetter(id).get(
        function(flvData) {
          if(flvData.hasOwnProperty('error')) {
            this._updateStatus(VideoDataStatus.ERROR, 'flvError', flvData.error);
            return;
          }
          if(/smile\?.=(\d+)/.test(flvData.url))
            this.setValue('videoIndex', RegExp.$1);

          if(!flvData.hasOwnProperty('optional_thread_id')) {
            this._updateStatus(VideoDataStatus.ERROR, 'flvError', 'invalid_response');
            return;
          }
          this.setValue('optionalThreadID', flvData.optional_thread_id);
          this._getThumbinfo();
        }.bind(this));

      groupEnd();
    },
    _processThumbinfoError: function(xml) {
      group('processThumbinfoError');
      var [idType, id] = this._selectProperty('optionalThreadID', 'threadID', 'videoID');
      this.setValue('errorCode', xml.getElementsByTagName('code')[0].textContent);
      this.setValue('errorDesc', xml.getElementsByTagName('description')[0].textContent);
      switch(this.getValue('errorCode')) {
      case 'DELETED':
        this._getWatchPage('deleted', 'invalidDeletedWatchPage');
        break;
      case 'COMMUNITY':
        switch(idType) {
        case 'optionalThreadID':
        case 'videoID':
          this._getWatchPage('communityOnly', 'invalidCommunityWatchPage');
          break;
        case 'threadID':
          this._getGetFLV();
          break;
        }
        break;
      case 'NOT_FOUND':
        this._updateStatus(VideoDataStatus.ERROR, 'notFoundErrorThumbinfo');
        break;
      default:
        this._updateStatus(VideoDataStatus.ERROR, 'unknownErrorThumbinfo');
        break;
      }
      groupEnd();
    },
    _getThumbinfo: function() {
      group('getThumbinfo');
      var [idType, id] = this._selectProperty('optionalThreadID', 'threadID', 'videoID');
      this._updateStatus(VideoDataStatus.LOADING, 'loadingThumbinfo');

      ThumbinfoGetter.getGetter(id).get(
        function(xml) {
          if(xml == null) {
            this._updateStatus(VideoDataStatus.ERROR, 'emptyThumbinfo');
            return;
          }
          var status = xml.documentElement.getAttribute('status');
          if(status != 'ok') {
            this._processThumbinfoError(xml);
            return;
          }
          this._parseThumbinfoXML(
            xml,
            (idType == 'optionalThreadID') ? 'community' : undefined);
          this._updateStatus(VideoDataStatus.COMPLETED, '');
        }.bind(this));
      groupEnd();
    },

    _getUploaderName: function() {
      group('getUploaderName');
      if(this.getValue('uploaderName') !== undefined) {
        log('already defined');
        groupEnd();
        return;
      }
      var setName = function(name, isUserName) {
        if(name !== null) {
          log('uploaderName: ', name);
          name = new String(name);
          name.isUserName = Boolean(isUserName);
        }
        this.setValue('uploaderName', name);
      }.bind(this);
      var videoID = this.getValue('videoID');
      var idPrefix = videoID[0] + videoID[1];
      var officialPrefix = {
        ax: 'avex公式', ca: '超！アニメロ，にょコにょコ動画', cw: 'キャラウッド動画',
        fx: 'MTV公式', ig: 'アイ★グラ動画', na: 'Livedoorネットアニメ',
        nl: 'ニコニコ生放送', om: '音女', sk: 'spikeニコニコチャンネル',
        yk: 'YuriChannel動画', yo: 'よしよし動画', za: 'ニコニコアニメチャンネル',
        zb: 'ニコラジオ・TV', zc: 'ニコアニニュース', zd: 'ai sp@ce',
        ze: '虹視聴覚室', cd: '虹視聴覚室', sd: '不明な公式動画',
        so: '不明な公式動画', lv: '公式動画'
      };
      if(officialPrefix.hasOwnProperty(idPrefix)) {
        log('official name');
        setName(officialPrefix[idPrefix]);
        groupEnd();
        return;
      }
      log('access to smilevideo');
      UploaderNameGetter.getGetter(videoID).get(
        function(name) { setName(name, true); });
      groupEnd();
    },
    _getNicopediaTags: function() {
      group('getNicopediaTags');
      var block = [];
      var blocks = [block];
      var tags = this.getValue('tags');
      for(var domain in tags) {
        if(!tags.hasOwnProperty(domain))
          continue;
        tags[domain].forEach(
          function(tag) {
            if(block.length == NICOPEDIA_EXIST_WORD_API_MAX_WORDS)
              blocks.push(block = []);
            block.push(tag);
          });
      }
      log('tag blocks: ', blocks);
      blocks.forEach(
        function(block) {
          NicopediaExistWordGetter.getGetter(
            block.map(function(tag) { return tag.name.decodeEntityReference();})
          ).get(
            function(exists) {
              block.forEach(
                function(tag, i){
                  block[i].nicopediaRegistered = Boolean(exists[i]);
                });
            });
        });
      groupEnd();
    },
    _getNicopediaMovie: function() {
      group('getNicopediaMovie');
      NicopediaExistMovieGetter.getGetter(this.getValue('videoID'))
        .get(function(exist) {
               this.setValue('nicopediaRegistered', exist);
             }.bind(this));
      groupEnd();
    }
  };

  VideoData._allData = {};
  VideoData.getData = function(id) {
    log('VideoData.getData');
    if(this._allData.hasOwnProperty(id)) {
      log('  exist');
      return this._allData[id];
    }
    log('  not exist');
    return this._allData = new VideoData(id);
  };

  var Generator = function(id) {
    log('new NicovideoThumbinfoGenerator');
    this.videoData = VideoData.getData(id);
    this._containerElement = $N('div');
  };
  Generator.prototype = {
    popup: null,
    getData: function(propName){
      return this.videoData.getValue(propName);
    },
    generate: function(popup) {
      group('Nicovideo Thumbinfo Generator :: generate');
      this.popup = popup;
      this.videoData.watchEx(
        'status',
        function(propName, oldVal, newVal) {
          this.statusChanged(newVal, this.getData('statusDetail'));
        }.bind(this));

      this.statusChanged(this.getData('status'), this.getData('statusDetail'));
      groupEnd();
      return $F(this._containerElement);
    },
    statusChanged: function(status, detail) {
      group('stateChanged: ', status, '(',  detail, ')', VideoDataStatus);
      switch(status) {
      case VideoDataStatus.COMPLETED:
        this.showElement(this.createThumbinfo(), true);
        break;
      case VideoDataStatus.LOADING:
        this.processLoading();
        break;
      case VideoDataStatus.ERROR:
      this.processError();
        break;
      }
      groupEnd();
    },
    processLoading: function() {
      group('processLoading');
      var message;
      var doExpand = false;

      var movieType = '';
      switch(this.getData('errorCode')) {
      case 'COMMUNITY': movieType = 'コミュニティ動画'; break;
      case 'DELETED': movieType = '削除済み動画'; break;
      default: movieType = ''; break;
      }

      var detail = this.getData('statusDetail');
      switch(detail) {
      case 'loadingThumbinfo':
      case 'loadingGetFLV':
      case 'loadingWatchPage':
        log('loading message');
        var loadType = detail.substring('loading'.length);
        message = this.createMessage(
          [movieType, ' "', this.createVideoLink(), '" の情報を取得中',
           ' (', loadType, ')']);
        break;
      case 'waitingForWatchPageConfirm':
        log('waiting message');
        doExpand = true;
        message = this.createConfirm(
          [{label: '取得する',
            listener: function(e) {
              this.videoData.setValue('_enableWatchPageGetter', true);
            }.bind(this)}],
          [movieType, ' "', this.createVideoLink(),
           '" の情報は動画再生ページにアクセスしなければ取得できないようです。',
           '動画再生ページから情報を取得しますか？']);
        message.lastChild.appendChild(
          $F([$N('br'), ' (この動画が視聴履歴に追加されます)']));
        break;
      default:
        log('other message');
        message = this.createMessage(
          ['"', this.createVideoLink(), '" の情報取得中 (',
           this.getData('statusDetail'),
           ')...']);
        break;
      }
      this.showElement(message, doExpand);
      groupEnd();
    },
    processError: function() {
      group('processError');
      var message;
      var detail = this.getData('statusDetail');
      switch(detail) {
      case 'emptyThumbinfo':
        log('maintenance message');
        message = this.createMessage('メンテナンス中かサーバが落ちています');
        break;
      case 'notFoundErrorThumbinfo':
      case 'unknownErrorThumbinfo':
        log('not found or unknown message');
        message = this.createErrorMessage();
        message.appendChild(
          $N('p', null,
             detail == 'notFoundErrorThumbinfo'
             ? '動画が発見できません。'
             : '未知のエラーです。'
            ));
        break;
      case 'flvError':
        log('flv error message');
        message = this.createErrorMessage();
        var flvMessages = {
          invalid_v1: '削除済み、または観覧する権限がありません。',
          invalid_v2: '非表示にされています。',
          invalid_v3: '権利者削除されています。',
          cant_get_detail: '削除されています。(詳細不明)',
          invalid_response: 'サーバから予期せぬ応答が返ってきました。(optional_thread_idがありません)'
        };
        message.appendChild(
          $N('p', null,
             [$N('strong', null, 'GetFLV'), ': ',
              flvMessages[this.getData('flvError')] || '詳細不明なエラーです。']));
        break;
      case 'invalidDeletedWatchPage':
      case 'invalidCommunityWatchPage':
        log('invalid deleted or comunity message');
        message = this.createErrorMessage();
        message.appendChild(
          $N('p', null,
             [' ',
              this.createVideoLink(),
              detail == 'invalidDeletedWatchPage'
              ? ' は情報が残っていない削除済み動画，もしくは非表示動画っぽいです。'
              : ' というURLではアクセスできないコミュニティ専用動画っぽいです。']));
        break;
      default:
        log('other message');
        message = this.createMessage('なんかエラーです');
      }
      this.showElement(message);
      groupEnd();
    },

    createThumbnail: function() {
      group('createThumbnail');
      var img = $N('img', { src: this.getData('thumbnailURL'),
                            'class': ClassNames.get('thumbnail'),
                            alt: ''});
      this.videoData.watchEx(
        'thumbnailURL',
        function(propName, oldVal, newVal) {
          img.style.width = '';
          img.style.height = '';
          img.src = newVal;
        });
      img.addEventListener(
        'error',
        function(e) {
          log('thumbnail not found', img);
          if(this.videoData.errorCode == 'DELETED'
             || this.videoData.errorCode == 'NOT_FOUND')
            img.src = 'http://res.nicovideo.jp/img/common/video_deleted.jpg';
          else {
            img.style.width= '0';
            img.style.height = '0';
          }
          this._contentChanged();
        }.bind(this),
        false);
      groupEnd();
      return img;
    },
    createVideoLink: function(children) {
      group('createVideoLink');
      if(children === undefined) {
        if(this.getData('title') !== undefined)
          children = this.getData('title');
        else
          children = this.videoData.getID();
      }
      log('children: ', children);
      var link = $N('a@'+POPUP_DISABLED_ATTRIBUTE+'=true',
                    {href: this.getData('watchURL')},
                    children);
      this.videoData.watchEx(
        'watchURL',
        function(propName, oldVal, newVal) { link.href = newVal; });
      groupEnd();
      return link;
    },
    createMessage: function(message) {
      group('createMessage');
      var elem = $F([this.createThumbnail(),
                     $N('h1', null, message)]);
      groupEnd();
      return elem;
    },
    createErrorMessage: function() {
      group('createErrorMessage');
      var code = this.getData('errorCode');
      var description = this.getData('errorDesc');

      var message = this.createMessage('Error! ('+code+')');
      message.appendChild(
        $N('p', null,
           [$N('strong', {}, 'description'),
            ': ', description,
            ' (', this.createVideoLink(), ').'
           ]));

      groupEnd();
      return message;
    },
    createConfirm: function(buttons, children) {
      group('createConfirm');
      var links = buttons.map(
        function(button) {
          var link = $N('a', {href: 'javascript: void(0); ',
                              style: 'font-size: 150%; font-weight: bolder;'},
                        button.label);
          link.addEventListener('click', button.listener, false);
          return link;
        });
      var message = this.createMessage('確認');
      message.appendChild(
        $F([$N('p', null, children),
            $N('p', {style: 'text-align: center'}, links)]));
      groupEnd();
      return message;
    },

    createNicopediaIcon: function (exist, href, title){
      log('createNicopediaIcon', 'title: ', title, 'exist',  exist);
      return $N(
        'a@'+POPUP_PARENT_ATTRIBUTE+'='+this.popup.uniqueID,
        {href: href, title: title},
        $N('img',
           {src: 'http://res.nicovideo.jp/img/common/icon/dic_'
            + (exist? 'on': 'off') + '.gif',
            alt: (exist? '百': '？'),
            'class': ClassNames.get('dic_icon')}));
    },
    createThumbType: function() {
      group('createThumbType');
      var elems = [];
      function addStatus(name, attr) {
        elems.push($N('strong', attr, name));
      }
      var type = this.getData('thumbType');
      log('type: ', type);
      switch(type) {
      case 'mymemory':
      case 'community':
        addStatus(type == 'mymemory' ? 'マイメモリー' : 'コミュニティ');
        elems.push(
          ' ',
          $N('a@'+POPUP_PARENT_ATTRIBUTE+'='+this.popup.uniqueID,
             {href: 'http://www.nicovideo.jp/watch/' + this.getData('videoID')},
             '\u00bb元動画'));
        break;
      case 'communityOnly':
        addStatus('コミュニティー限定動画');
        break;
      case 'deleted':
        addStatus('削除済み', {style: 'color: red;'});
        break;
      }
      groupEnd();
      return elems;
    },
    createUploaderName: function() {
      group('createUploaderName');
      var span = $N('span', null, 'Loading...');
      var self = this;
      this.videoData.invokeWhenDefinedProp(
        'uploaderName',
        function() {
          group('create uploader-name element');
          var name = self.getData('uploaderName');
          var id = self.getData('userID');
          if(name === null)
            name = 'Not Found.';
          if(!name.isUserName) {
            span.textContent = name;
            log('not user');
            groupEnd();
            return;
          }
          var nico = $N('a',
                        {href: 'http://www.nicovideo.jp/user/' + id,
                         'class': ClassNames.get('uploader')}, name);
          var chart = $N('a',
                         {href: 'http://www.nicochart.jp/name/' + encodeURI(name),
                          'class': ClassNames.get('uploader')}, '[ニコチャート]');
          log('elem: ', nico, chart);
          span.replaceChild(nico, span.firstChild);
          span.appendChild(document.createTextNode(' '));
          span.appendChild(chart);
          groupEnd();
        });
      groupEnd();
      return $N('span', null, ['[up: ', span, ']']);
    },
    createHatenaBookmarkIcon: function() {
      group('createHatenaBookmarkIcon');
      var img = $N('img',
                   {src: 'http://b.hatena.ne.jp/entry/image/'
                    + this.getData('watchURL'),
                    'class': ClassNames.get('hatena')});
      img.addEventListener(
        'load',
        function() {
          if(this.width == 1) // 0 user
            this.parentNode.textContent = '0 user';
        },
        false);
      groupEnd();
      return $N('a@'+POPUP_DISABLED_ATTRIBUTE+'=true',
                {href: 'http://b.hatena.ne.jp/entry/'
                 + this.getData('watchURL')},
                img);
    },
    createDateLine: function() {
      group('createDateLine');
      var elems = [];
      function addElem(elem){
        elems.push(' ', elem);
      }
      addElem(this.createThumbType());
      if(SHOW_UPLOADER_NAME)
        addElem(this.createUploaderName());
      if(SHOW_HATENA_BOOKMARK)
        addElem(this.createHatenaBookmarkIcon());
      groupEnd();
      return $N(
        'p', null, [
          Date.fromISO8601(this.getData('postedAt')).toJpString(),
          '投稿', elems]);
    },
    createTitle: function() {
      group('createTitle');
      var children = [this.createVideoLink(), ' '];
      if(SHOW_NICOPEDIA_MOVIE_LINKS) {
        var span = $N('span');
        children.push(span);
        this.videoData.invokeWhenDefinedProp(
          'nicopediaRegistered',
          function() {
            span.appendChild(
              this.createNicopediaIcon(
                this.getData('nicopediaRegistered'),
                'http://dic.nicovideo.jp/v/' + this.getData('videoID'),
                this.getData('nicopediaRegistered')
                  ? '大百科で調べる' : '大百科の記事を参照'),
              span);
          }.bind(this));
      }
      groupEnd();
      return $N('h1', null, children);
    },
    createCounters: function() {
      group('createCounters');
      function elem(str) { return $N('strong', null, str); }
      function numElem(num){ return elem(num.insertComma()); }
      var counters = $N(
        'p', null,
        ['再生時間: ', elem(this.getData('length').split(':').join('分') + '秒'),
         ' 再生: ', numElem(this.getData('viewCounter')),
         ' コメント: ', numElem(this.getData('commentCounter')),
         ' マイリスト: ',
         $N('a',
            {href: 'http://www.nicovideo.jp/openlist/' + this.getData('videoID'),
             'class': ClassNames.get('mylist')},
            numElem(this.getData('mylistCounter')))
        ]);
      log('elem: ', counters);
      groupEnd();
      return counters;
    },
    createTags: function() {
      group('createTags');
      var homeTagLength = 0;
      var foreignTagLength = 0;
      var homeTagElems = [];
      var foreignTagElems = [];

      var tagsData = this.getData('tags');
      var self = this;

      for(var domain in tagsData){
        if(!tagsData.hasOwnProperty(domain))
          continue;

        var domainTagElems = createTagElems(tagsData[domain], domain);
        if(domain == HOME_COUNTRY_DOMAIN) {
          homeTagLength += tagsData[domain].length;
          homeTagElems.push(domainTagElems);
        }
        else if(SHOW_FOREIGN_TAGS) {
          foreignTagLength += tagsData[domain].length;
          foreignTagElems.push(domainTagElems);
        }
      }

      var foreignTagSpan = $N('span', null, foreignTagElems);
      var button = createToggleButtons(foreignTagLength, foreignTagSpan);

      var elem = $N(
        'p', {'class': ClassNames.get('tags')},
        [$N('strong', null,
            ['タグ(', homeTagLength.toString(), button, '): ']),
         homeTagElems, foreignTagSpan]);
      log('elem: ', elem);
      groupEnd();
      return elem;

      function createTagElems(dTags, domain) {
        group('createTagElems tags:', dTags, 'domain', domain);
        if(dTags.length == 0) {
          groupEnd();
          return null;
        }
        function tagMark(tag) {
          function star() {
            return $N('span', {style: 'color:#F90;'}, '★');};
          function brackets(c) {
            return $N('strong', {style: 'color:#F30;'}, ['[', c, ']']); };
          if(tag.locked && tag.category) return brackets(star());
          if(tag.locked) return star();
          if(tag.category) return brackets('C');
          return null;
        }

        var domainElems = dTags.map(
          function(tag) {
            var word = tag.name.decodeEntityReference();
            var children = [
              tagMark(tag),
              $N('a',
                 {href: 'http://www.nicovideo.jp/tag/' + encodeURIComponent(word),
                  rel: 'tag'},
                 word)];
            var span = $N('span$tag', null, children);
            function addNicopediaIcon(exist) {
              span.appendChild(
                self.createNicopediaIcon(
                  exist,
                  'http://dic.nicovideo.jp/a/' + encodeURIComponent(word),
                  '大百科で ' + word + ' の記事を' + (exist ? '読む' : '書く')));
            }
            if(tag.hasOwnProperty('nicopediaRegistered'))
              addNicopediaIcon(tag.nicopediaRegistered);
            else
              tag.watch(
                'nicopediaRegistered',
                function(_, oldVal, newVal) { addNicopediaIcon(newVal); });
            return [' ', span];
          });
        if(domain != HOME_COUNTRY_DOMAIN)
          domainElems.unshift(' ', $N('strong', null,'[' + domain + ']:'), ' ');

        log(domainElems);
        groupEnd();
        return $N('span$domain', null, domainElems);
      }

      function createToggleButtons(len, span) {
        group('createToggleButton');
        if(len == 0) {
          groupEnd();
          return null;
        }
        var button = $N(
          'a',
          {href: 'javascript: void(0)', style: 'color: blue;'},
          len.toString());
        var showForeign = (len > FOREIGN_TAG_DEFAULT_SHOW_LIMIT);
        function handleClick() {
          if(showForeign) {
            showForeign = false;
            span.style.display = 'none';
            button.title = '海外タグを表示';
          }
          else {
            showForeign = true;
            span.style.display = 'inline';
            button.title = '海外タグを隠す';
          }
        }
        button.addEventListener('click', handleClick, false);
        handleClick();
        groupEnd();
        return [' + ', button];
      }
    },
    createDescription: function() {
      group('createDescription');
      var p = $N('p', {'class': ClassNames.get('description')});
      if(this.getData('parsedDescription') !== undefined)
        p.innerHTML = this.getData('parsedDescription');
      else
        p.appendChild(this.getData('description').parseNicovideoDescription());
      var uniqueID = this.popup.uniqueID;
      Array.forEach(
        p.getElementsByTagName('a'),
        function(link) {
          link.setAttribute(POPUP_PARENT_ATTRIBUTE, uniqueID);
        });
      log('elem: ', p);
      groupEnd();
      return p;
    },
    createRes: function() {
      log('createRes');
      if(this.getData('lastResBody') !== null)
        return $N(
          'p', {'class': ClassNames.get('res')}, this.getData('lastResBody'));
      return null;
    },
    createThumbinfo: function() {
      group('createThumbinfo');
      var df =  $F(
        [this.createThumbnail(),
         this.createDateLine(),
         this.createTitle(),
         this.createCounters(),
         this.createTags(),
         this.createDescription(),
         this.createRes()
        ]);
      groupEnd();
      return df;
    },

    showElement: function(element, doExpand) {
      group('showElement');
      if(this.popup !== null) {
        if(doExpand)
          this.popup.expand();
        else
          this.popup.shrink();
      }
      removeAllChildren(this._containerElement);
      this._containerElement.appendChild(element);
      this._contentChanged();
      groupEnd();
    },
    _contentChanged: function() {
      if(this.popup !== null)
        this.popup.adjustPosition();
    }
  };


  // ニコニコ動画の動画再生ページの場合
  if(new RegExp('^' + NICOVIDEO_DOMAIN_REGEXP
                + '/watch/((?:[a-z]{2})?\\d+)')
     .test(location.href)) {
    var videoID = RegExp.$1;
    try {
      PopupManager.addElementPopup(
        document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0],
        function() { return new Generator(videoID); });
      var des1 = document.getElementById('des_1');
      if(des1 !== null) {
        PopupManager.addElementPopup(
            des1.getElementsByTagName('table')[0].getElementsByTagName('a')[0],
          function() { return new Generator(videoID); });
      }
    } catch(e) {
      log(e);
    }
  }


  // ポップアップするリンクの登録
  PopupManager.addURLPopup(
    new RegExp(
      // 動画再生ページ (m[1])
      (NICOVIDEO_DOMAIN_REGEXP
       + '/watch/((?:[a-z]{2})?\\d+)') // 動画IDの先頭2文字はゆるく解釈してもOK
        + '|' +
        // タグ検索中の動画ID (m[2])
        ('^' + NICOVIDEO_DOMAIN_REGEXP
         + '/tag/.*?((?:'+VIDEO_ID_PREFIX+')\\d+)') // 厳密に解釈しないと誤爆する
        + '|' +
        // タグ検索中のスレッドID (m[3])
        ('^' + NICOVIDEO_DOMAIN_REGEXP
         + '/tag/.*?watch%2[fF](\\d+)')
        + '|' +
        // サムネイル (m[4])
        ('^' + NICOVIDEO_DOMAIN_REGEXP
         + '/thumb/.*?((?:[a-z]{2})?\\d+)') // 動画IDの先頭2文字はゆるく解釈してもOK
        + '|' +
        ('^' + NICOMS_REGEXP + '/((?:[a-z]{2})?\\d+)') // 短縮URL
    ),
    function(m) {
      var id = m[1] || m[2] || m[3] || m[4] || m[5];
      return function() { return new Generator(id); };
    });


  // 選択範囲ポップアップの登録
  PopupManager.addSelectionPopup(
    new RegExp(
      '(?:^|[^a-z])(?:((?:'+VIDEO_ID_PREFIX+')\\d+)|watch%2[fF](\\d+))',
      'g'),
    function(m) {
      return new Generator(m[1] || m[2]);
    });

  return Generator;

  function isVideoID(str) { return /^[a-z]{2}\d+$/.test(str); };
  function isThreadID(str) { return /^\d+$/.test(str); };
}();


// ユーティリティ関数群
function addKeyBind(key, fun) {
  if(key == '')
    return;
  var m = key.match(/^(?:[CSM]-){0,2}(.|\[(?:esc|tab|return|del|backspace|up|down|left|right|space)\])$/);
  if(m == null)
    log(key + ' is invalid keybind');
  var ctrl = /C-/.test(key);
  var shift = /S-/.test(key);
  var meta = /M-/.test(key);
  var code = key.charCodeAt(key.length-1);
  switch(m[1]) {
  case '[esc]': code = 27; break;
  case '[tab]': code = 9; break;
  case '[return]': code = 13; break;
  case '[del]': code = 46; break;
  case '[backspace]': code = 8; break;
  case '[up]': code = 38; break;
  case '[down]': code = 40; break;
  case '[left]': code = 37; break;
  case '[right]': code = 39; break;
  case '[space]': code = 32; break;
  }
  window.addEventListener(
    'keypress',
    function(e) {
      if((e.ctrlKey == ctrl) &&
        (!shift || e.shiftKey == shift) &&
         (e.metaKey == meta || e.altKey == meta) &&
         (code == e.charCode || code == e.keyCode)
        ) {
          fun(e, key);
        }
    },
    false);
}

function isString(s) {
  return typeof s == 'string' || s instanceof String;
}

// $N 私家改造版
// elem: "elemName.className#id$name"の形式を許容
function $N(elem, attr, children) {
  if(elem === undefined)
    throw new Error('$N: elem is undefined.');
  if(isString(elem)) {
    var names = elem.split(/(?=\.|\$|#|@)/);
    elem = document.createElement(names.shift());
    names.forEach(
      function(name) {
        var additional = name.substring(1);
        switch(name[0]) {
        case '$':
          ClassNames.add(elem, additional);
          break;
        case '.':
          elem.className += additional;
          break;
        case '#':
          elem.id = additional;
          break;
        case '@':
          elem.setAttribute.apply(elem, additional.split('='));
          break;
        }
      });
  }
  else {
    try {
      elem = elem.cloneNode(children !== undefined);
    } catch(e) {
      throw new Error('$N: elem is not String nor Element');
    }
  }

  if(attr !== undefined) {
    for(key in attr) {
      if(!attr.hasOwnProperty(key)) continue;
      elem.setAttribute(key, attr[key]);
    }
  }

  $F(children, elem);
  return elem;
}

function $F(children, parent) {
  if(parent === undefined)
    parent = document.createDocumentFragment();
  appendChildren(children);
  return parent;

  function appendChildren(children) {
    if(children === undefined || children === null)
      return;
    if(isString(children)) {
      parent.appendChild(document.createTextNode(children));
      return;
    }
    if(children instanceof Array) {
      children.forEach(appendChildren);
      return;
    }
    try {
      parent.appendChild(children);
    } catch(e) {
      log('$F: children', children);
      throw new Error('$F: children is not String, Array, nor Node.');
    }
  }
}

function log() {
  if(!DEBUG)
    return;
  if(console && console.log)
    try {
      unsafeWindow.console.log.apply(console, arguments);
    } catch(e) {
      GM_log('Error on console.log\n' + Array.map(
               arguments,
               function(obj) { return obj.toString(); }
             ).join('\n'));
    }
  else
    Array.forEach(arguments, GM_log);
}
function group() {
  if(!DEBUG)
    return;
  if(console && console.group)
    try {
      unsafeWindow.console.group.apply(console, arguments);
    } catch(e) {
      GM_log('Error on console.group\n' + Array.map(
               arguments,
               function(obj) { return obj.toString(); }
             ).join('\n'));
    }
}
function groupEnd() {
  if(!DEBUG)
    return;
  if(console && console.groupEnd)
    try {
      unsafeWindow.console.groupEnd();
    } catch(e) {
      GM_log('Error on console.groupEnd\n' + Array.map(
               arguments,
               function(obj) { return obj.toString(); }
             ).join('\n'));
    }
}
function getPosition(elem) {
  var pos = {
    top: elem.offsetTop, left: elem.offsetLeft,
    bottom: elem.offsetTop + elem.offsetHeight,
    right: elem.offsetLeft + elem.offsetWidth };

  // top, bottom, left, right を子要素を考慮したものにする
  calcChildrenOffset(elem.childNodes);

  pos.height = pos.bottom - pos.top;
  pos.width = pos.right - pos.left;

  // 親要素の位置を取得
  var target = elem, dx = 0, dy = 0;
  while((target = target.offsetParent) !== null && target != document.body) {
    var p = target;
    dy += target.offsetTop;
    dx += target.offsetLeft;
  }

  // 親要素のスクロールによる要素位置の変化を取得
  // 標準準拠モード: documentElement, 後方互換モード: body のスクロール量を取得
  var scTop = document.documentElement.scrollTop + document.body.scrollTop;
  var scLeft = document.documentElement.scrollLeft + document.body.scrollLeft;
  target = elem;
  // position: fixed; でポップアップを表示させるので，計算した位置から html のスクロール分を引く
  pos.top -= scTop;
  pos.left -= scLeft;

  while((target = target.parentNode) !== null && target != document.body) {
    dy -= target.scrollTop;
    dx -= target.scrollLeft;
    // position: fixed; な親が存在したらそこで探索を止めて html のスクロール分を足して終了
    if(window.getComputedStyle(target, '').position == 'fixed') {
      dy += scTop;
      dx += scLeft;
      break;
    }
  }
  pos.top += dy;
  pos.bottom = pos.top + pos.height;
  pos.left += dx;
  pos.right = pos.left + pos.width;

  if(elem.nodeName == 'AREA')
    calcAreaPosition();

  return pos;

  // 以下，補助関数

  function toInt(s) { return parseInt(s, 10); }

  function calcChildrenOffset(children) {
    Array.forEach(
      children,
      function(target) {
        // target は Element で，elem は target.offsetParent の子孫でなければならない
        if(target.nodeType != 1 ||
           (elem.compareDocumentPosition(target.offsetParent) & 8) == 0)
          return;

        if(target.offsetTop < pos.top)
          pos.top = target.offsetTop;
        if(target.offsetLeft < pos.left)
          pos.left = target.offsetLeft;

        var tBottom = target.offsetTop + target.offsetHeight;
        if(tBottom > pos.bottom)
          pos.bottom = tBottom;
        var tRight = target.offsetWidth + target.offsetLeft;
        if(tRight > pos.right)
          pos.right = tRight;

        calcChildrenOffset(target.childNodes);
      }
    );
  }

  function calcAreaPosition() {
    var coords = elem.coords.replace(/\s*,\s*/g, ',')
      .replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');

    switch(elem.shape) {
    case 'rect':
      var [left, top, right, bottom] = coords.split(/,|\s/g).map(toInt);
      pos.top += top;
      pos.left += left;
      pos.height = bottom - top;
      pos.width = right - left;
      break;
    case 'circle':
      var [cx, cy, r] = coords.split(/,/g).map(toInt);
      pos.top += cy - r;
      pos.left += cx - r;
      pos.height = 2*r;
      pos.width = 2*r;
      break;
    case 'poly':
      var minX = Infinity, maxX = -Infinity;
      var minY = Infinity, maxY = -Infinity;
      coords.split(/\s/).forEach(
        function(xy) {
          var [x, y] = xy.split(/,/).map(toInt);
          if(x < minX) minX = x; if(x > maxX) maxX = x;
          if(y < minY) minY = y; if(y > maxY) maxY = y;
        });
      pos.top += minY;
      pos.left += minX;
      pos.height = maxY - minY;
      pos.width = maxX - minX;
      break;
    }

    pos.bottom = pos.top + pos.height;
    pos.right = pos.left + pos.width;
  }
}

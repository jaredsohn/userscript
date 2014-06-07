// ==UserScript==
// @id             moug-shortcut-keys@yu-tang
// @name           moug shortcut keys
// @namespace      https://userscripts.org/users/441822
// @author         yu-tang
// @version        0.1.0
// @description    Keyboard shortcut for moug.
// @homepageURL    https://userscripts.org/scripts/show/131430
// @updateURL      https://userscripts.org/scripts/source/131430.meta.js
// @include        http://www.moug.net/faq/viewtopic.php*
// @include        http://moug.net/faq/viewtopic.php*
// @match          http://www.moug.net/faq/viewtopic.php*
// @match          http://moug.net/faq/viewtopic.php*
// ==/UserScript==

{  // start local scope

//###################################################
// GM_xpath function (非完全互換、簡易実装です)
//###################################################
if (typeof GM_xpath == 'undefined') {  // for Greasemonkey and Chrome (not Scriptish)
  var GM_xpath = function(arg) {
    var nl = document.evaluate(
        arg.path,
        (arg.node || document),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    if (arg.all) {
      for (var i = 0, l = nl.snapshotLength, elms = []; i < l; i++)
        elms[i] = nl.snapshotItem(i);
      return elms;
    } else {
      return (nl.snapshotLength > 0) ? nl.snapshotItem(0) : null;
    }
  };
}

/**
 * posts - 仮想投稿オブジェクト
 * ==================================================
 * moug のレイアウトは固定幅なので、要素の位置を毎回取得しなおすのは
 * 無駄です。そのため、位置情報は本オブジェクト内で一括管理し、必要な
 * 情報はこのオブジェクトにリクエストして取得するものとします。
 * 
 * Members
 * -------
 * current()        現在の投稿要素 (DOM の table)。
 * next()           次の投稿要素。現在要素が末尾投稿の場合は、フッター。
 * prev()           前の投稿要素。現在要素が先頭投稿の場合は、ヘッダー。
 * nextSamePoster() 現在要素と同じ投稿者の次の投稿要素。現在要素が末尾投稿の場合は、null。
 * prevSamePoster() 現在要素と同じ投稿者の前の投稿要素。現在要素が先頭投稿の場合は、null。
 * first()          先頭の投稿要素。
 * last()           末尾の投稿要素。
 * element(index)   任意の投稿要素。
 * length           投稿数を取得。
 * item(index)      仮想投稿オブジェクトを取得。
 * items            仮想投稿オブジェクトの配列を取得。
 */
var posts = new function(){
  var _info = [];
  function _ensureInit(){
    /* テーブル情報配列の初期化チェック */
    if (_info.length > 0) {
      /* スクリプトによって位置が変わっている場合があるため、末尾要素の上位置を照合 */
      var i = _info[_info.length - 1];
      if (i.offsetTop != i.element.offsetTop) {
        /* 位置情報を最新の状態に更新 */
        i =  _info[0].element;
        var rect =i.getBoundingClientRect();
        var offset = rect.top - i.offsetTop;
        for (var i = 0; i < _info.length; ++i) {
          _info[i].offsetTop =  _info[i].element.offsetTop;
          _info[i].top = Math.round(_info[i].element.offsetTop + offset);
        }
      }
      return;
    }

    var tbl = GM_xpath({
      path: "//table[@class='response']",
      all : true
    });
    /**
      * 下記のパターンに含まれている img 要素は、twitter アバターを
      * 挿入する別スクリプトの存在を考慮したものです。
      */
    var re = /^投稿者:\s(?:<img [^>]+>)?(.+)$/;
    var rect = tbl[0].getBoundingClientRect();
    var offset = rect.top - tbl[0].offsetTop;
    for (var i = 0, l = tbl.length, poster; i < l; ++i) {
      poster = GM_xpath({
        path: ".//th[contains(@class,'messageHeaderR')]/div/span[@class='small']",
        node: tbl[i]
      });
      poster = poster.textContent.replace(re, '$1');
      _info.push({
        index: i,
        element: tbl[i],
        offsetTop: tbl[i].offsetTop,
        top: Math.round(tbl[i].offsetTop + offset),
        poster: poster
      });
    }
  }

  function _getCurrentPostInfo(){
    var screenTopLine = window.scrollY;
    for (var i = 0, l = _info.length; i < l; ++i) {
      if (_info[i].top > screenTopLine){
        return i > 0 ? _info[--i] : _info[0];
      }
    }
    // ここに来るのは、画面上端より下の要素が見つからなかった場合なので、末尾要素情報を返す
    return _info[_info.length - 1];
  }

  function _isContentViewable(element){
    var contentBody = element.getElementsByClassName('messageBox')[0];
    var rect = contentBody.getBoundingClientRect();
    if (rect.top > windowInnerHeight || rect.bottom < 0)
      return false; // 表示範囲の上か下に外れている
    return true;
  }

  this.current = function(){
    _ensureInit();
    return _getCurrentPostInfo().element;
  };

  this.next = function(){
    _ensureInit();
    var screenTopLine = window.scrollY;
    for (var i = 0, l = _info.length; i < l; ++i) {
      if (_info[i].top > screenTopLine) return _info[i].element;
    }
    // ここに来るのは、画面上端より下の要素が見つからなかった場合なので、フッターを返す
    return document.getElementById("footer");
  };

  this.prev = function(){
    _ensureInit();
    var screenTopLine = window.scrollY;
    for (var i = _info.length - 1, l = 0; i >= l; --i) {
      if (_info[i].top < screenTopLine) return _info[i].element;
    }
    // ここに来るのは、画面上端より上の要素が見つからなかった場合なので、ヘッダーを返す
    return document.getElementById("header");
  };

  this.nextSamePoster = function(){
    _ensureInit();
    var currentPostInfo = _getCurrentPostInfo();
    var poster = currentPostInfo.poster;
    for (var i = currentPostInfo.index + 1, l = _info.length; i < l; ++i) {
      if (_info[i].poster == poster) return _info[i].element;
    }
    // ここに来るのは、見つからなかった場合なので、nullを返す
    return null;
  };

  this.prevSamePoster = function(){
    _ensureInit();
    var currentPostInfo = _getCurrentPostInfo();
    var poster = currentPostInfo.poster;
    for (var i = currentPostInfo.index - 1, l = 0; i >= l; --i) {
      if (_info[i].poster == poster) return _info[i].element;
    }
    // ここに来るのは、見つからなかった場合なので、nullを返す
    return null;
  };

  this.first = function(){
    _ensureInit();
    return _info[0].element;
  };

  this.last = function(){
    _ensureInit();
    return _info[_info.length - 1].element;
  };

  this.element = function(index){
    if (_info.length == 0) _ensureInit();
    return _info[index].element;
  };

  this.item = function(index){_ensureInit();return _info[index]};
  this.__defineGetter__("items", function() {_ensureInit(); return _info; });
  this.__defineGetter__("length", function() {if (_info.length == 0) _ensureInit(); return _info.length; });

};

/**
 * shortcut - ショートカット オブジェクト
 * ======================================
 * フックしたいキーコード: 関数オブジェクト。
 */
var shortcut = {
  /* 0-9 : jump to specified post by id */
  '0': function(input){ /* input = {char, prevChar, elapsed} */
    var jumpTo = input.char;
    if (input.elapsed < 1000) { // 1 秒未満の場合
      if (/^\d$/.test(input.prevChar)){  // 数値の場合
        var i = Number(input.prevChar + input.char);
        var j = posts.length;
        if (i > 0 && i <= j){
          jumpTo = i.toString();
        }
      }
    }
    if (jumpTo != '0') {
      var e = posts.element(Number(jumpTo) - 1);
      if (e) e.scrollIntoView(true);
    }
  },
  /* "j" : next post */
  'j': function(){
    posts.next().scrollIntoView(true);
  },
  /* "k" : prev post */
  'k': function(){
    posts.prev().scrollIntoView(true);
  },
  /* "h" : next post by same poster */
  'h': function(){
    var post = posts.nextSamePoster();
    if (post) post.scrollIntoView(true);
  },
  /* "l" : prev post by same poster */
  'l': function(){
    var post = posts.prevSamePoster();
    if (post) post.scrollIntoView(true);
  },
  /* "u" : first post */
  'u': function(){
    posts.first().scrollIntoView(true);
  },
  /* "n" : last post */
  'n': function(){
    posts.last().scrollIntoView(true);
  },
  /* "?" : show cheat sheet */
  '?': function(){
    help.show();
  }
};
for (var i = 49; i < 58; ++i) { shortcut[String.fromCharCode(i)] = shortcut['0'];}  // '1'-'9' = '0'


/**
 * help
 */
var help = {
  hide: function(){
    var bg = document.getElementById('cheatSheetBg');
    if (bg && bg.style.display != 'none') bg.style.display = 'none';
  },
  show: function(){
    const HEIGHT = 280, WIDTH = 200;
    var bg = document.getElementById('cheatSheetBg');
    if (bg) {
      /* 既に表示中の場合は、トグル */
      bg.style.display = (bg.style.display != 'none' ? 'none' : 'block');
    } else {
      bg = document.createElement('div');
      bg.id = 'cheatSheetBg';
      bg.setAttribute( 'style', '\
position: fixed;\
top: 0;\
left: 0;\
right: 0;\
bottom: 0;\
background: none repeat scroll 0 0 rgba(0, 0, 0, 0.5);\
' );
      bg.setAttribute( 'onClick', 'this.style.display = "none";' );
      document.body.appendChild(bg);
      var cs = document.createElement('div');
      cs.id = 'cheatSheet';
      cs.innerHTML = '\
<p id="shortcut-title" style="text-align:center;">\
キーボード ショートカット</p><hr />\
<p><code class="shortcut-key">J</code>次の投稿</p>\
<p><code class="shortcut-key">K</code>前の投稿</p>\
<p><code class="shortcut-key">H</code>現在の投稿者の次の投稿</p>\
<p><code class="shortcut-key">L</code>現在の投稿者の前の投稿</p>\
<p><code class="shortcut-key">U</code>最初の投稿</p>\
<p><code class="shortcut-key">N</code>最後の投稿</p>\
<p><code class="shortcut-key">0</code>～<code class="shortcut-key">9</code>n 番目の投稿</p>\
<p style="margin-left:1em;font-size:x-small;">※ 連続入力で二桁番目の投稿指定</p>\
<p><code class="shortcut-key">?</code>ショートカットのヘルプ</p>\
';
      cs.setAttribute( 'style', '\
position: fixed;\
width: ' + WIDTH + 'px;\
height: ' + HEIGHT + 'px;\
margin: auto;\
top: 0;\
right: 0;\
bottom: 0;\
left: 0;\
background: white;\
border-radius: 10px;\
padding: 10px;\
box-shadow: 2px 2px 10px #000;'
      );
      bg.appendChild(cs);
    }
  }
};

function setKbShortcut() {
  document.addEventListener("keypress", function(e) {
    // initialize.
    var _self = arguments.callee;
    var pressed = String.fromCharCode(e.which); /* 大文字と小文字を意図的に揃えていないので、拾う側で注意 */

    // '?' 以外の文字が入力された場合、チートシート表示中であれば非表示にします。
      if (pressed != '?')
        help.hide();

    // フォーカスが検索テキストボックスに有った場合は、入力の邪魔をしない。
    // また Alt キーや Ctrl キーが押下されていた場合も、邪魔をしない。
    if ( e.target.tagName.toLowerCase() == 'input'
      || e.altKey
      || e.ctrlKey
      || e.metaKey )
      return;

    if (shortcut.hasOwnProperty(pressed))
      shortcut[pressed]({
        char: pressed,
        prevChar: _self.char || '',
        elapsed: Date.now() - ( _self.charPressedTime || 0 )
      });

    // store current info.
    _self.char = pressed;
    _self.charPressedTime = Date.now();
  }, false);

};  // end of setKbShortcut function

function addStyles() {
  /* cheatSheet */
  var style = '\
div#cheatSheet>p{line-height: 2em;}\n\
p#shortcut-title{font-weight:bold;}\n\
code.shortcut-key{margin: auto 0.8em;\
-moz-appearance:button;\
-webkit-appearance:button;\
padding:3px 7px;\
}\n\
@media screen and (-webkit-min-device-pixel-ratio:0){\
div#cheatSheet>p{line-height: 1.7em;}\
}' /* CSS hack for webkit */

  GM_addStyle(style);
} // end of addStyles function

/*
 * URL が不正または閲覧期間が過ぎた等の理由でスレッドが存在しない
 * 場合、下記条件式は null を返します。
 * その場合は、ショートカットを有効にしません。
 */
if (GM_xpath({path: "//table[@class='response']"})) {
  addStyles();
  setKbShortcut();
}

} // end of local scope

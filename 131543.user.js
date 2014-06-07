// ==UserScript==
// @id             moug-toc@yu-tang
// @name           moug toc
// @namespace      https://userscripts.org/users/441822
// @author         yu-tang
// @version        0.2.0
// @description    table of contents for moug.
// @homepageURL    https://userscripts.org/scripts/show/131543
// @updateURL      https://userscripts.org/scripts/source/131543.meta.js
// @include        http://www.moug.net/faq/viewtopic.php*
// @include        http://www.moug.net/faq/posting.php*
// @include        http://moug.net/faq/viewtopic.php*
// @include        http://moug.net/faq/posting.php*
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
 * first()          先頭の投稿要素。
 * last()           末尾の投稿要素。
 * element(index)   任意の投稿要素。
 * length           投稿数を取得。
 * item(index)      仮想投稿オブジェクトを取得。
 * getViewablePostIndexes() 表示範囲内に本文が見えている投稿要素のインデックス配列。
 * getPostersSortByPostCountDesc()  投稿者の配列(投稿数の多い順)。
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
        // カスタム イベントを発行
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('postsHeightChanged', true, false);
        document.dispatchEvent(evt);
      }
      return;
    }

    /**
     * XPath の式が "table[@class='response']" だけだった場合、
     * 返信モードで返信用のフォームが戻り値に混入してしまいます。
     * そのため、親ノードを指定してそれを防いでいます。
     */
    var tbl = GM_xpath({
      path: "//div[@class='boxShadow']/table[@class='response']",
      all : true
    });

    /**
      * 下記のパターンに含まれている img 要素は、twitter アバターを
      * 挿入する別スクリプトの存在を考慮したものです。
      */
    var re = /^投稿者:&nbsp;(?:<img [^>]+>)?(.+)$/;
    var rect = tbl[0].getBoundingClientRect();
    var offset = rect.top - tbl[0].offsetTop;
    for (var i = 0, l = tbl.length, poster, posterHTML, summary; i < l; ++i) {
      poster = GM_xpath({
        path: ".//th[contains(@class,'messageHeaderR')]/div/span[@class='small']",
        node: tbl[i]
      });
      posterHTML = poster.innerHTML.replace(re, '$1');
      summary = tbl[i].getElementsByClassName('messageBox')[0].textContent;
      summary = summary.replace(/\n\n/g, '\n'); /* Chrome では改行(br)がそのまま表示されるため、半分に間引きます */
      if (summary.length >= 512)
        summary = summary.substr(0,511) + '&hellip;'; /* 水平省略記号 (…) */
      //summary = summary.replace(/&/g, '&ampt;'); /* "&" はエンコード不要。エンコードすると title にそのまま表示されるので、むしろしないほうがいい */
      summary = summary.replace(/"/g, '&quot;');
      summary = summary.replace(/</g, '&lt;');
      summary = summary.replace(/>/g, '&gt;');
      _info.push({
        index: i,
        element: tbl[i],
        offsetTop: tbl[i].offsetTop,
        top: Math.round(tbl[i].offsetTop + offset),
        posterHTML: posterHTML,
        summary: summary /* 目次作成後は参照されないはずなので、目次作成時に解放(delete)されます。*/
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

  /* 表示範囲内に本文が見えている投稿要素のインデックス配列を返します */
  this.getViewablePostIndexes = function(){
    _ensureInit();  /* お約束 */

    var idxs = [];
    var windowInnerHeight = window.innerHeight;
    function isContentViewable(element){
      var contentBody = element.getElementsByClassName('messageBox')[0];
      var rect = contentBody.getBoundingClientRect();
      if (rect.top > windowInnerHeight || rect.bottom < 0)
        return false; // 表示範囲の上か下に外れている
      return true;
    }

    /* 画面上端に見えている要素を取得 */
    var e = _getCurrentPostInfo();
    var idx = e.index;
    e = e.element;

    /* 本文が見えているか */
    if (isContentViewable(e))
      idxs.push(idx);

    /* 以下、本文が見えない要素に当たるか、要素が終わるまで、下に向かって走査する */
    var postsLen = _info.length;
    while ( ++idx < postsLen ) {
      e = _info[idx].element;
      if (isContentViewable(e))
        idxs.push(idx);
      else
        break;
    }
    return idxs;
  };

  /* 投稿者配列(投稿数の多い順)を返します */
  this.getPostersSortByPostCountDesc = function(){
    _ensureInit();  /* お約束 */

    var ret = [], hash = {};
    var i, poster, l = _info.length;
    for (i = 0; i < l; ++i) {
      poster = _info[i].posterHTML;
      hash[poster]++ || (hash[poster] = 1); // increment
    }

    // hash to array
    j = 0;
    for (i in hash)
      ret.push({
        poster: i,
        postCount: hash[i],
        className: 'poster' + ++j
          /* クラス名用の識別子。HTML5 と CSS3 で文字種制限が異なるらしいので、厳しい方の CSS3 でも通る値にしておきます。 */
      });

    // sort (desc)
    ret.sort(function(a,b){
      if (a.postCount > b.postCount)
        return -1;
      else if (b.postCount > a.postCount)
        return 1;
      else
        return 0;
    });

    return ret;
  };

  this.item = function(index){_ensureInit();return _info[index]};
  this.__defineGetter__("items", function() {_ensureInit(); return _info; });
  this.__defineGetter__("length", function() {if (_info.length == 0) _ensureInit(); return _info.length; });

};


/**
 * toc オブジェクト
 */
var toc = {
  _div:null,
  _h2:null,
  _ol:null,
  _prevWindowInnerHeight:0,
  _prevBaseTop:0,
  _prevBaseLeft:0,
  _currentIdxs:[]
};

// 目次作成
toc.create = function(){
  var html = '';
  var template = '<li class="{0}" title="{3}"><a href="#p{1}"><span class="poster">{2}</span><span class="summary">{3}</span></a></li>';
  var posters = posts.getPostersSortByPostCountDesc();
  var s = '';
  var postItems = posts.items;

  // posterHTML => className
  var poster2class = {};
  for (var poster, i = 0, l = posters.length; i < l; i++) {
    poster = posters[i];
    poster2class[poster.poster] = poster.className;
  }

  // generate html source.
  for (i = 0, l = postItems.length; i < l; i++) {
    s = template.replace('{0}', poster2class[ postItems[i].posterHTML ]);
    s = s.replace('{1}', (i + 1).toString());
    s = s.replace('{2}', postItems[i].posterHTML);
    s = s.replace(/\{3\}/g, postItems[i].summary);
    html += s;
    // 以後、summary プロパティは参照されないはずなので、解放しておきます。
    delete postItems[i].summary;
  }

  this._base = GM_xpath({
    path: ".//div[@class='boxShadow' and position()=last()]",
    node: document.getElementById('right')
  });
  var div = document.createElement('div');
  div.id = 'toc';
  div.className = 'boxShadow';
  div.innerHTML = '<h2 class="titBorder03">目次</h2><ol class="box">' + html + '</ol>';
  div.setAttribute('style', 'width: ' + this._base.scrollWidth + 'px;');
  document.getElementById('right').appendChild(div);
  this._div = div;
  this._h2 = div.firstChild;
  this._ol = div.lastChild;

  this._ol.addEventListener('click', function(e) {
    e.preventDefault();
    var el = e.target;
    var tag = el.tagName.toLowerCase();
    while (tag != 'a') {
      if (tag == 'li') return;
      el = el.parentElement;
      tag = el.tagName.toLowerCase();
    }
    var href = el.getAttribute('href'); /* ex. '#p23' */
    var index = Number(href.substr(2)) - 1;  /* '#p23' => 22 */
    el = posts.element(index);
    el.scrollIntoView(true);
  }, false);

  // 投稿の高さが変わった場合は、現在表示されている投稿も変化する可能性があるため、目次も更新します。
  document.addEventListener('postsHeightChanged', toc.updateNavAppearance, false);
};

toc.adjustHeight = function(){
  /**
   * 下記だと、Firefox で水平スクロールバーも含んでしまう。
   * var h = window.innerHeight;
   * そのため、上記の値を使用して画面ぴったりに表示させる
   * つもりで高さを調整した要素の最下部が、水平スクロールバー
   * に隠れて見えないという現象が発生します。
   * 水平スクロールバーを含まない内部の高さを取得したいので、
   * document.documentElement.clientHeight の方を使います。
   */
  var h = document.documentElement.clientHeight;
  if (this._prevWindowInnerHeight == h) return;

  this._prevWindowInnerHeight = h;
  h -= this._h2.offsetHeight;
  if (h > 0) this._ol.style.maxHeight = h + 'px';
};

toc.adjustTop = function(){
  var MARGIN_TOP = 7;
  var rect = this._base.getBoundingClientRect();
  if (this._prevBaseTop == rect.top) return;

  this._prevBaseTop = rect.top;
  var top = Math.round(rect.top) + this._base.scrollHeight + MARGIN_TOP;
  if (top < 0) {
    /**
     * フッターまでスクロールダウンした場合、Google の広告が
     * 上にかぶさってくることがあるため、可能であれば目次の
     * 下端が末尾投稿の下端よりも下にならないようにします。
     */
    var tocBottom = this._div.scrollHeight;
    rect = posts.last().parentElement.getBoundingClientRect();
    var lastPostBottom = Math.round(rect.bottom);
    top = (tocBottom > lastPostBottom) ? lastPostBottom - tocBottom : 0;
  }
  this._div.style.top = top + 'px';
};

toc.adjustLeft = function(){
  var rect = this._base.getBoundingClientRect();
  if (this._prevBaseLeft == rect.left) return;

  this._prevBaseLeft = rect.left;
  var left = Math.round(rect.left);
  this._div.style.left = left + 'px';
};

/**
 * 以下のナビゲーション用表示を更新します。
 *  - 現在要素の強調スタイル
 *  - 現在要素が表示範囲外に位置していた場合、表示範囲内に自動でスクロール
 */
toc.updateNavAppearance = function(){
  /**
   * 現在要素の強調スタイルを更新
   *   ここでいう現在要素は、posts.current() を指さない(posts.current() は
   *   常に一要素しか返さない)。
   *   画面内表示されている要素ということなので、複数投稿を含む。
   *   このとき、以下の点に注意する。
   *   - 本文が見えていない投稿要素は、現在要素とみなさない。
   *     具体的には、<div class="messageBox"> が本文を意味するので、
   *     表示範囲にこれを含まない場合は除外する。
   *     したがって、投稿要素の下端（引用ボタンのみ）しか見えていない
   *     上方の投稿要素や、投稿要素の上端（投稿者名のみ）しか見えて
   *     いない下方の投稿要素は、「現在要素」に該当しない。
   *     本文が見えていれば、複数の投稿が「現在要素」に該当し得る。
   */
  var idxs = posts.getViewablePostIndexes();  // 最新の現在要素のインデックス配列
  var prevIdxs = this._currentIdxs;           // 前回の現在要素のインデックス配列

  // 最新の現在要素に含まれない要素からスタイルを削除します。
  var e, idx, deleteCount = 0;
  for (var i in prevIdxs) {
    idx = prevIdxs[i];
    if ( idxs.indexOf(idx) == -1 ) {
      e = toc._ol.childNodes[idx];
      if (e) {
        e.classList.remove('current');
        deleteCount++;
      }
    }
  }

  if (deleteCount || idxs.length != prevIdxs.length) {
    // 現在要素を再設定します。
    for (i in idxs) {
      e = toc._ol.childNodes[idxs[i]];
      if ( e && !e.classList.contains('current') )
        e.classList.add('current');
    }
    this._currentIdxs = idxs;
  }

  /**
   * 現在要素が表示範囲外に位置していた場合、表示範囲内に自動でスクロール
   *   ただし、可能な場合は中央にスクロールする。
   */
   if (idxs.length) {
     var ol = this._ol;
     var rowHeight = ol.childNodes[0].clientHeight;
     var ol_scrollY = ol.scrollTop;
     var ol_scrollHeight = ol.scrollHeight;
     var ol_clientHeight = ol.clientHeight;
     if (ol.scrollHeight > ol.clientHeight) { /* スクロール可能な場合 */
       var rowsInView = Math.floor(ol_clientHeight / rowHeight);
       var rowsUpView = Math.ceil(ol_scrollY / rowHeight);
       var offsetRowsInView = Math.floor((rowsInView - idxs.length) / 2);
       var topIndexInView = [idxs[0]] - offsetRowsInView;
       if (topIndexInView < 0)
         topIndexInView = 0;
       var li = ol.childNodes[topIndexInView];
       var scrollTopNew = li.offsetTop - ol.offsetTop;
       if (ol.scrollTop != scrollTopNew)
         ol.scrollTop = scrollTopNew;
     }
   }
};

function addCustomEvents() {

  // イベント発行用
  function raiseEvent(arg) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(arg.eventName, true, false);
    evt.diffAmount = arg.diffAmount;
    window.dispatchEvent(evt);
  }

  window.addEventListener("scroll", function(e) {
    // initialize.
    var _self = arguments.callee;
    var scrollX = _self.scrollX || 0;
    var scrollY = _self.scrollY || 0;

    // raise custom event "scrollX".
    if (scrollX != window.scrollX)
      raiseEvent({
        eventName: 'scrollX',
        diffAmount: window.scrollX - scrollX
      });

    // raise custom event "scrollY".
    if (scrollY != window.scrollY)
      raiseEvent({
        eventName: 'scrollY',
        diffAmount: window.scrollY - scrollY
      });

    // store current scroll amount.
    _self.scrollX = window.scrollX;
    _self.scrollY = window.scrollY;
  }, false);

  window.addEventListener("resize", function(e) {
    // initialize.
    var _self = arguments.callee;
    var innerWidth = _self.innerWidth || 0;
    var innerHeight = _self.innerHeight || 0;

    // raise custom event "resizeX".
    if (innerWidth != window.innerWidth)
      raiseEvent({
        eventName: 'resizeX',
        diffAmount: window.innerWidth - innerWidth
      });

    // raise custom event "resizeY".
    if (innerHeight != window.innerHeight)
      raiseEvent({
        eventName: 'resizeY',
        diffAmount: window.innerHeight - innerHeight
      });

    // store current window size.
    _self.innerWidth = window.innerWidth;
    _self.innerHeight = window.innerHeight;
  }, false);

  // custom event "scrollY".
  window.addEventListener("scrollY", function(e) {
//GM_log("scrollY event detected!");
    toc.adjustTop();
    toc.updateNavAppearance();
  }, false);

  // custom event "scrollX".
  window.addEventListener("scrollX", function(e) {
//GM_log("scrollX event detected!");
    toc.adjustLeft();
  }, false);

  // custom event "resizeY".
  window.addEventListener("resizeY", function(e) {
//GM_log("resizeY event detected!");
    toc.adjustHeight();
    toc.updateNavAppearance();
  }, false);

  // custom event "resizeX".
  window.addEventListener("resizeX", function(e) {
//GM_log("resizeX event detected!");
    toc.adjustLeft();
    toc.adjustHeight();
    toc.updateNavAppearance();
  }, false);

}  // end of addCustomEvents function

function addStyles() {
  var style = '\
#toc {\
position: fixed;\
font-family: MeiryoKe_PGothic,"メイリオ","ヒラギノ角ゴ Pro W3",sans-serif;\
}\
#toc ol{\
list-style-position:inside;\
padding:0;\
overflow-y:auto;\
}\
#toc h2{background-color: white;}\
#toc li{\
white-space: nowrap;\
overflow:hidden;\
text-overflow: ellipsis;\
padding-left: 0.4em;\
background: white;\
border-bottom: 1px solid threedlightshadow;\
}\
#toc li.current{\
background-image:-moz-linear-gradient(center top, hsla(208, 31%, 72%, 0.296875), hsla(208, 31%, 72%, 0.6484375));\
background-image:-webkit-gradient(linear, center top, center bottom, from(hsla(208, 31%, 72%, .296875)), to(hsla(208, 31%, 72%, .6484375))); /* Chrome, Safari4+ */\
background-image:-webkit-linear-gradient(top, hsla(208, 31%, 72%, .296875), hsla(208, 31%, 72%, .6484375)); /* Chrome10+, Safari5.1+ */\
background-image: linear-gradient(top, hsla(208, 31%, 72%, .296875) hsla(208, 31%, 72%, .6484375)); /* W3C */\
}\
#toc li>a>span.poster{\
color:white;\
padding-left:3px;\
padding-right:3px;\
-moz-border-radius:5px;\
-webkit-border-radius:5px;\
border-radius:5px;\
border:1px solid DimGray;\
text-shadow: black 1px 1px 1px;\
}\
#toc li>a:hover{\
text-decoration:none;\
background-image:-moz-linear-gradient(center top, hsla(208, 31%, 72%, .296875), hsla(208, 31%, 72%, .6484375));/*fx*/\
background-image:-webkit-gradient(linear, center top, center bottom, from(hsla(208, 31%, 72%, .296875)), to(hsla(208, 31%, 72%, .6484375)));/* Chrome, Safari4+ */\
background-image:-webkit-linear-gradient(top, hsla(208, 31%, 72%, .296875), hsla(208, 31%, 72%, .6484375));/* Chrome10+, Safari5.1+ */\
background-image: linear-gradient(top, hsla(208, 31%, 72%, .296875) hsla(208, 31%, 72%, .6484375)); /* W3C */\
}\
#toc li>a>span.summary{padding-left:3px;}';

  // テンプレート
  var template = '\
#toc>ol>li.{0}>a>span.poster{\
background-color:hsl({1},97%,57%);\
}\n\
#toc>ol>li.{0}>a:hover>span.poster{\
background-image:-moz-linear-gradient(center top, hsl({1},97%,77%), hsl({1},97%,27%), hsl({1},97%,57%));\
background-image:-webkit-gradient(linear, center top, center bottom, from(hsl({1},97%,27%)), to(hsl({1},97%,57%)));\
background-image:-webkit-linear-gradient(top,  hsl({1},97%,77%), hsl({1},97%,27%), hsl({1},97%,57%));\
background-image:linear-gradient(top,  hsl({1},97%,77%), hsl({1},97%,27%) hsl({1},97%,57%));\
-webkit-box-shadow: 3px 3px 4px 0px #777;\
-moz-box-shadow: 3px 3px 4px 0px #777;\
box-shadow: 3px 3px 4px 0px #777;\
}\n';

  /**
   * 色相の割り当てルール
   * ====================
   * できるだけ色が重複しないように、かつ似た色が並びにくいように調整します。
   * ただし、厳密な（四色定理的な）割り当て法ではなく、以下の手順での簡易割り当てとします。
   * 
   * a. 色が固定されないよう、ランダムに初期値（分割開始点）を求めます。
   * b. 色相を人数分に等分割します。
   * c. 投稿数の多い投稿者から順に、色を割り当てます。このとき、隣接する色相ではなく、
   *    未割り当て色相帯の中間地点を割り当てるようにします（文章では表現しにくいので、
   *    下記ロジック参照）。
   */
  var posters = posts.getPostersSortByPostCountDesc();
  var hue = Math.ceil(Math.random() * 360);  /* 色相 */
  var len = posters.length;
  var hues = new Array(len);
  var angle = 360 / len;                     /* 色相の移動角度 */
  for (var i = 0; i < len; i++)
    hues[i] = Math.round(hue + angle * i);

  // 色相を割り当て
  var s = '', idx = 0, queue = [hues];
  for (i = 0; i < len; i++) {
    hue = queue[0][idx];

    // スタイル
    s = template.replace( /\{0\}/g, posters[i].className );
    s = s.replace(/\{1\}/g, hue.toString() );
    style += s;

    // 次の色相
    /* 割り当て済みの色相を境界として前後で分割し、キューの末尾へ送る */
    if (idx > 0) queue.push( queue[0].slice(0, idx) );
    if (idx < queue[0].length - 1) queue.push( queue[0].slice(idx + 1, queue[0].length) );
    queue.shift();  /* キューの先頭要素を削除 */
    if (queue.length)
      idx = Math.floor(queue[0].length / 2);
  }
  GM_addStyle(style);

} // end of addStyles function

/*
 * URL が不正または閲覧期間が過ぎた等の理由でスレッドが存在しない
 * 場合、下記条件式は null を返します。
 * その場合は、目次を表示しません。
 */
if (GM_xpath({path: "//table[@class='response']"})) {
  addStyles();
  addCustomEvents();

  toc.create();
  toc.adjustHeight();
  toc.adjustTop();
  toc.adjustLeft();
  toc.updateNavAppearance();
}

} // end of local scope

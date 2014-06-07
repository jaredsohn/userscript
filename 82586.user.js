// ==UserScript==
// @name           Nicopedia Existence Checker
// @namespace      http://mfp.xrea.jp/
// @include        http://www.nicovideo.jp/related_tag/*
// ==/UserScript==

const LOAD_WAIT = 1000;
const SHOW_MARGIN = 20;

const JSONP_CALLBACK = 'gm_nicopedia_existence_checker';
const NICOPEDIA_API_URL = 'http://api.nicodic.jp/e/';
const NICOPEDIA_URL = 'http://dic.nicovideo.jp/a/';
const UA_STRING = 'Mozilla/5.0 Greasemonkey; Nicopedia Existence Checker';
const NICOPEDIA_ON_ICON_URL = 'http://res.nimg.jp/img/common/icon/dic_on.gif';
const NICOPEDIA_OFF_ICON_URL = 'http://res.nimg.jp/img/common/icon/dic_off.gif';


// 2つのソート済み配列をマージする
// x < y => comparer(x, y) < 0
function mergeSorted(a, b, comparer) {
  if (comparer === undefined)
    comparer = function(x, y) x - y;

  let ia = 0, ib = 0, la = a.length, lb = b.length;
  let array = new Array(la + lb);
  while (true) {
    if (ia === la) {
      for (; ib < lb; ib++)
        array[ia+ib] = b[ib];
      break;
    }
    if (ib === lb) {
      for (; ia < la; ia++)
        array[ia+ib] = a[ia];
      break;
    }
    if (comparer(a[ia], b[ib]) <= 0) {
      array[ia+ib] = a[ia];
      ia++;
    } else {
      array[ia+ib] = b[ib];
      ib++;
    }
  }
  return array;
}


// ソート済みの配列中から，指定した値以上の大きさを持つ最小の要素のインデックスを返す
// x < (検索する値) => comparer(x) < 0
function binarySearch(array, comparer) {
  if (array.length === 0)
    return 0;

  if (typeof comparer !== 'function') {
    let n = comparer;
    comparer = function(x) x - n;
  }

  let min = 0, max = array.length - 1;
  if (comparer(array[max]) < 0)
    return max + 1;

  while (min < max) {
    let mid = min + ((max - min) >>> 1);
    if (comparer(array[mid]) >= 0) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }
  return min;
}


// 要素の相対位置を取得する
function getOffset(elem, root) {
  if (root === undefined)
    root = document.documentElement;

  if (elem === null)
    return { top: 0, left: 0 };

  let cmp = root.compareDocumentPosition(elem);
  // elem isn't contained by root
  if ((cmp & document.DOCUMENT_POSITION_CONTAINED_BY) === 0) {
    return { top: 0, left: 0 };
  }

  let pos = { top: elem.offsetTop, left: elem.offsetLeft };
  let p = getOffset(elem.offsetParent, root);
  pos.top += p.top;
  pos.left += p.left;
  return pos;
}


// 現在表示されている要素を取得するためのクラス
let LazyLoader = function(root) {
  if (root === undefined)
    this.root = document.documentElement;
  else
    this.root = root;
  this._elemPool = [];
  this._scrollCallback = [];

  let self = this;
  window.addEventListener('scroll', function() self._updateScrollPos(), false);
  window.addEventListener('resize', function() self._updateScrollPos(), false);
  this._updateScrollPos();
};

LazyLoader.prototype = {
  _elemPool: null,
  _scrollCallback: null,
  _scrollTop: NaN, _scrollBottom: NaN,
  _pointer: -1, _cnt: 0,
  addScrollCallback: function(callback) {
    this._scrollCallback.push(callback);
  },
  removeScrollCallback: function(callback) {
    let idx = this._scrollCallback.indexOf(callback);
    if (idx !== -1)
      this._scrollCallback.splice(idx, 1);
  },
  pushElements: function(elems) {
    let objs = Array.map(elems, function(e) {
                           let pos = getOffset(e, this.root);
                           return { top: pos.top, elem: e };
                         });
    let comparer = function(a, b) a.top - b.top;
    this._elemPool = mergeSorted(this._elemPool, objs.sort(comparer), comparer);
    this._pointer = -1;
  },
  _cleanup: function() {
    let root = this.root;
    // 要素を追加した際にoffsetが変わる可能性があるので再計算しなおす．
    // 順序は変わらないものとする
    this._elemPool = this._elemPool
      .filter(function(e) e.elem !== null)
      .map(function(e) {
             e.top = getOffset(e.elem, root).top;
             return e;
           });
  },
  pop: function() {
    let top = this._scrollTop - SHOW_MARGIN;
    if (this._pointer === -1) {
      this._cnt = 0;
      this._pointer = binarySearch(this._elemPool,
        function(e) e.top - top);
    }

    let len = this._elemPool.length;
    while (this._pointer < len && this._elemPool[this._pointer].elem === null)
      this._pointer++;
    if (this._pointer === len)
      return null;

    let obj = this._elemPool[this._pointer];
    if (obj.top > this._scrollBottom + SHOW_MARGIN)
      return null;

    let elem = obj.elem;
    obj.elem = null;
    this._pointer++;

    // 30回に1回，popされた要素を配列から削除する
    this._cnt++;
    if (this._cnt >= 30) {
      this._cnt = 0;
      this._cleanup();
      this._pointer = -1;
    }

    return elem;
  },
  _updateScrollPos: function() {
    this._pointer = -1;
    this._scrollTop = this.root.scrollTop;
    this._scrollBottom = this.root.scrollTop + this.root.offsetHeight;
    this._scrollCallback.forEach(function(c) c());
  }
};


let NicopediaDecorator = {
  _queue: new LazyLoader(),
  _cache: {},
  _loading: false,
  _load: function(name, callback) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: NICOPEDIA_API_URL + JSONP_CALLBACK + '/' + encodeURIComponent(name),
      headers: { 'User-Agent': UA_STRING },
      onload: function({responseText: text}) {
        let rep = text.replace(
          new RegExp('^' + JSONP_CALLBACK + '\\(\\[(\\d)\\]\\);$'), '$1');
        switch (rep) {
        case '0': callback(false); return;
        case '1': callback(true); return;
        default:  callback(null); return;
        }
      },
      onerror: function() {
        callback(null);
      }
    });
  },
  _insertIcon: function(link) {
    let name = link.textContent;
    let url = NICOPEDIA_URL + encodeURIComponent(name);
    let exist = this._cache[name];

    let icon = document.createElement('a');
    icon.href = url;
    let img = document.createElement('img');
    img.className = 'txticon';

    if (exist === null) {
      img.src = '';
      img.alt = '×';
      icon.title = '読み込み失敗';
    } else if (exist) {
      img.src = NICOPEDIA_ON_ICON_URL;
      img.alt = '百';
      icon.title = '大百科 ' + name + ' の記事を読む';
    } else {
      img.src = NICOPEDIA_OFF_ICON_URL;
      img.alt = '？';
      icon.title = '大百科 ' + name + ' の記事を書く';
    }

    icon.appendChild(img);
    link.parentNode.insertBefore(icon, link);
  },
  _update: function() {
    if (this._loading)
      return;

    this._loading = true;

    // 既に読み込み済みでキャッシュに入っているタグは即座に表示する
    let link = this._queue.pop();
    while (link !== null && link.textContent in this._cache) {
      this._insertIcon(link);
      link = this._queue.pop();
    }

    if (link === null) {
      this._loading = false;
      return;
    }

    let self = this;
    let name = link.textContent;
    this._load(name, function(exist) {
                 self._cache[name] = exist;
                 self._insertIcon(link);
                 setTimeout(function() {
                              self._loading = false;
                              self._update();
                            }, LOAD_WAIT);
               });
  },
  init: function() {
    this._cache.__proto__ = null;
    let self = this;
    this._queue.addScrollCallback(function() { self._update(); });
  },
  decorate: function(links) {
    this._queue.pushElements(links);
    this._update();
  }
};


(function main() {
   function handle(target) {
     let links = target.querySelectorAll(
       'a[href^="tag/"], a[href^="http://www.nicovideo.jp/tag/"]');
     NicopediaDecorator.decorate(links);
   }

   NicopediaDecorator.init();
   document.addEventListener('AutoPagerize_DOMNodeInserted',
                             function({target}) handle(target), false);
   handle(document);
 })();

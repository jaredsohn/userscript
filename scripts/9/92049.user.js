// ==UserScript==
// @name           NicoTag Tab
// @namespace      http://mfp.xrea.jp/
// @description    ニコニコ動画の watch ページに過去のタグのタブを表示する
// @include        http://www.nicovideo.jp/watch/*
// @require        https://gist.github.com/raw/636265/8ed87ee31fe99a9bf06ac89692234280e0ffd9c0/nicovideo_createPanel.js
// @require        https://gist.github.com/raw/636215/a73e4ea2061f54454b80b671ec12ba3b1beaee3d/toDOM.js
// @require        https://gist.github.com/raw/729824/ef816cc60ba7560dd5da402be60fb6d6c10de114/nicotag_gettagsinfo.js
// @require        https://gist.github.com/raw/729855/2dd527aff90dc5271b9e110580a1101f6e885942/datagrid.js
// @require        https://gist.github.com/raw/731046/0e4dd6151f24390c65cd2ee1afe11551b7f99bd8/pager.js
// ==/UserScript==

const DEFAULT_FORCE_UPDATE = true;

const NAME_PREFIX = 'gm-nicotag-tab-';
const CATEGORY_TAGS = [
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
  "R-18"
].join(' ').split(/\s+/);

// ソート済みの配列中から，指定した値以上の大きさを持つ要素の，
// 最小のインデックスを返す
// x < (検索する値) => comparer(x) < 0
function bsearchUpperMin(aArray, aoComparer, aoMin, aoMax) {
  let len = aArray.length;
  if (len === 0) return 0;

  if (typeof aoComparer !== "function") {
    let n = aoComparer;
    aoComparer = function(x) x - n;
  }

  let min = aoMin !== undefined && aoMin >= 0  ? aoMin : 0;
  let max = aoMax !== undefined && aoMax < len ? aoMax : len - 1;
  if (aoComparer(aArray[max]) < 0) return max + 1;

  while (min < max) {
    let mid = min + ((max - min) >>> 1);
    if (aoComparer(aArray[mid]) >= 0) max = mid;     // mid >= n
    else                              min = mid + 1; // mid <  n
  }
  return min;
}

// ソート済みの配列中から，指定した値以下の大きさを持つ要素の，
// 最大のインデックスを返す
// x < (検索する値) => comparer(x) < 0
function bsearchLowerMax(aArray, aoComparer, aoMin, aoMax) {
  let len = aArray.length;
  if (len === 0) return -1;

  if (typeof aoComparer !== "function") {
    let n = aoComparer;
    aoComparer = function(x) x - n;
  }

  let min = aoMin !== undefined && aoMin >= 0  ? aoMin : 0;
  let max = aoMax !== undefined && aoMax < len ? aoMax : len - 1;
  if (aoComparer(aArray[min]) > 0) return -1;

  while (min < max) {
    let mid = min + ((max - min + 1) >>> 1);
    if (aoComparer(aArray[mid]) <= 0) min = mid;     // mid <=  n
    else                              max = mid - 1; // mid >  n
  }
  return max;
}

function strRepeat(str, count) {
  if (count <= 0) return '';
  let ret = '';
  if (count % 2 !== 0) ret = str;
  let part = strRepeat(str, count >> 1);
  return ret + part + part;
}

function zerofill(num, len) {
  let str = String(num);
  return strRepeat(0, len - str.length) + str;
}

function round(num, ord) {
  let coef = parseInt('1' + zerofill(0, ord), 10);
  let bigNum = ~~(num * coef);
  return ~~(bigNum / coef) + '.' + zerofill(bigNum % coef, ord);
}

const timeSpan = (function() {
  const SECONDS = 1000;
  const MINUTES = 60 * SECONDS;
  const HOURS   = 60 * MINUTES;
  const DAYS    = 24 * HOURS;
  const WEEKS   = 7 * DAYS;
  const MONTHS  = 30 * DAYS;
  const YEARS   = 365 * DAYS;
  return function timeSpan(d1, d2) {
    if (d1 > d2) [d2, d1] = [d1, d2];

    if (d2.getFullYear() !== d1.getFullYear()
        || d2.getMonth() !== d1.getMonth()) {
      let month = (d2.getFullYear() * 12 + d2.getMonth())
        - (d1.getFullYear() * 12 + d1.getMonth());
      let d2p = new Date(
        d1.getFullYear(), d1.getMonth(), d2.getDate(),
        d2.getHours(), d2.getMinutes(), d2.getSeconds(), d2.getMilliseconds());
      if (d2p < d1)
        month--;
      if (month > 0) {
        if (month < 12)
          return month + 'ヶ月';
        return ~~(month / 12) + '年' + (month % 12) + 'ヶ月';
      }
    }
    let diff = d2 - d1;
    if (diff >= WEEKS)   return ~~(diff / WEEKS) + '週間';
    if (diff >= DAYS)    return ~~(diff / DAYS) + '日';
    if (diff >= HOURS)   return ~~(diff / HOURS) + '時間';
    if (diff >= MINUTES) return ~~(diff / MINUTES) + '分';
    return (diff / SECONDS) + '秒';
  };
})();

function locale(date) {
  return [
    zerofill(date.getFullYear(), 4),
    zerofill(date.getMonth() + 1, 2),
    zerofill(date.getDate(), 2)
  ].join('/') + ' ' + [
    zerofill(date.getHours(), 2),
    zerofill(date.getMinutes(), 2),
    zerofill(date.getSeconds(), 2)
  ].join(':');
}

const Filter = function(viewer, grid, namePrefix) {
  this._viewer = viewer;
  this._grid = grid;
  this._namePrefix = namePrefix;
  this._enableMigemo = 'migemo' in unsafeWindow
    && 'provider' in unsafeWindow.migemo
    && unsafeWindow.migemo.provider.indexOf('XUL/Migemo') === 0;
};

Filter.prototype = {
  _viewer: null, _grid: null, _namePrefix: null,
  _created: false,
  _enableMigemo: false, get enableMigemo() this._enableMigemo,
  _div: null, get element() {
    if (!this.created) this.update();
    return this._div;
  },
  update: function() {
    this._created = true;
    this._div = <div class={this._namePrefix + 'filter-container'}/>.toDOM();

    this._div.appendChild(<>
      <label><em>フィルタ:</em>
        <input type="text" size="30"
               name={this._namePrefix + 'filter-input'}/></label>
      <label><input type="radio" name={this._namePrefix + 'filter-type'}
                    value="normal"/>通常</label>
      <label><input type="radio" name={this._namePrefix + 'filter-type'}
                    value="regexp"/>正規表現</label>
      <label><input type="radio" name={this._namePrefix + 'filter-type'}
                    value="migemo"/>Migemo</label>
      <label><input type="checkbox"
                    name={this._namePrefix + 'filter-ignore-case'}
                    />大文字/小文字を区別しない</label>
    </>.toDOM());
    this._div.querySelector('input[value="migemo"]').disabled
      = !this.enableMigemo;
    this._div.querySelector('input[value="' + this._type + '"]').checked
      = true;
    this._div.querySelector('input[name$="filter-ignore-case"]').checked
      = this._ignoreCase;
    this._div.addEventListener('change', this, false);
    this._div.addEventListener('keyup', this, false);
  },
  _text:'',
  _type: GM_getValue('default_filter_type', 'normal'),
  _ignoreCase: Boolean(GM_getValue('default_filter_ignore_case', true)),
  handleEvent: function({ target }) {
    let text = this._text;
    switch (target.name) {
    case this._namePrefix + 'filter-input':
      if (target.value === this._text) return;
      this._text = target.value;
      break;
    case this._namePrefix + 'filter-type':
      if (target.value === this._type) return;
      GM_setValue('default_filter_type', this._type = target.value);
      break;
    case this._namePrefix + 'filter-ignore-case':
      if (target.checked === this._ignoreCase) return;
      GM_setValue('default_filter_ignore_case',
                  this._ignoreCase = target.checked);
      break;
    default:
      return;
    }
    this._updateFilter();
    this._startUpdateGrid();
  },
  _parseTerm: function(text) {
    let andTerms = [];
    let notTerms = [];

    let notFlag = false;
    text.split(/\s+/).forEach(function(t) {
      if (t === '') return;
      if (t === '-') {
        notFlag = true;
        return;
      }
      if (t[0] === '-') notTerms.push(t.slice(1));
      else if (notFlag) notTerms.push(t);
      else              andTerms.push(t);
      notFlag = false;
    });

    return [ andTerms, notTerms ];
  },
  _updateFilter: function() {
    if (this._text === '') {
      this._grid.filter = null;
      return;
    }

    switch (this._type) {
    case 'normal':
      {
        let [ andTerms, notTerms ] = this._parseTerm(this._text);
        if (this._ignoreCase) {
          andTerms = andTerms.map(function(t) t.toLowerCase());
          notTerms = notTerms.map(function(t) t.toLowerCase());
          this._grid.filter = function(data) {
            let name = data.name.toLowerCase();
            return andTerms.every(function(t) name.indexOf(t) !== -1)
              && notTerms.every(function(t) name.indexOf(t) === -1);
          };
        } else {
          this._grid.filter = function(data) {
            let name = data.name;
            return andTerms.every(function(t) name.indexOf(t) !== -1)
              && notTerms.every(function(t) name.indexOf(t) === -1);
          };
        }
        break;
      }
    case 'regexp':
      try {
        let regexp = new RegExp(this._text, this._ignoreCase ? 'i' : '');
        this._grid.filter = function(data) regexp.test(data.name);
      } catch(e) {
        this._grid.filter = null;
        return;
      }
      break;
    case 'migemo':
      {
        let migemo = unsafeWindow.migemo;
        let flag = this._ignoreCase ? 'i' : '';
        let [ andRegExp, notRegExp ] = this._parseTerm(this._text).map(
          function(terms) terms.map(
            function(t) new RegExp(migemo.query(t), flag)));

        this._grid.filter = function(data) {
          let name = data.name;
          return andRegExp.every(function(r) r.test(name))
            && notRegExp.every(function(r) !r.test(name));
        };
      }
      break;
    }
  },
  _timer: null,
  _startUpdateGrid: function() {
    if (this._timer !== null)
      clearTimeout(this._timer);

    let self = this;
    this._timer = setTimeout(function() {
      self._grid.update();
      self._viewer.updatePager();
    }, 300);
  }
};

const DataGridProperty = (function() {
  function indicator(data, isLoose) {
    let margin = isLoose ? 0.5 : 0;
    let className = NAME_PREFIX + (isLoose ? 'loose-' : '')
      + 'lifetime-indicator';
    let [ first, last ] = isLoose
      ? [ data.looseFirstPer, data.looseLastPer ]
      : [ data.firstPer, data.lastPer ];
    let span = round(data.firstPer * 100, 2) + '% ~ '
      + round(data.lastPer * 100, 2) + '%';
    let looseSpan = round(data.looseFirstPer * 100, 2) + '% ~ '
      + round(data.looseLastPer * 100, 2) + '%';
    let title = span === looseSpan ? span : span + ' (' + looseSpan + ')';
    return <div class={NAME_PREFIX + 'lifetime-indicator-wrapper'}>
      <img class={className} title={title}
           style={ 'left:' + (first - margin) * 200 + '%;'
                   + 'right:' + (0.5 - (last - margin)) * 200 + '%;'
                   + 'width:' + (last - first) * 200 + '%;' }/>
    </div>;
  }
  function dateSpan(data, isLast) {
    let date = isLast ? data.last : data.first;
    return <>
      <span title={timeSpan(date, new Date()) + '前'}>
        {locale(date)}
      </span>
      {indicator(data, isLast)}
    </>.toDOM();
  }
  const CATEGORY_ICON = <img src="http://res.nimg.jp/img/watch/ctg.png"/>;
  const NICO_ICON = <img src="http://dic.nicovideo.jp/img/nv.gif"/>;
  const PEDIA_ON_ICON =
    <img src="http://res.nimg.jp/img/common/icon/dic_on.png"/>;
  const PEDIA_OFF_ICON =
    <img src="http://res.nimg.jp/img/common/icon/dic_off.png"/>;

  let source = [
    [ 'current', '*', true, { comparer: 'bool',
      title: '現存しているか', sortDefaultOrder: -1,
      content: function(data) data.current ? '*' : '' } ],
    [ 'locked', '★', true, { comparer: 'bool',
      title: 'ロックされているか', sortDefaultOrder: -1,
      content: function(data) data.locked ? '★' : '' } ],
    [ 'category', CATEGORY_ICON.toDOM(), true, { comparer: 'bool',
      title: 'カテゴリタグか', sortDefaultOrder: -1,
      content: function(data) data.category ? CATEGORY_ICON.toDOM() : '' } ],
    [ 'name',   '名前', true,  { comparer: 'string' } ],
    [ 'search', '検',   false, { title: 'ニコニコ動画でタグ検索',
      content: function(data) {
        return <a href={'/tag/' + encodeURIComponent(data.name)}
                  title={'タグ検索「' + data.name + '」'}
                  target="_blank">{NICO_ICON}</a>.toDOM();
      } } ],
    [ 'pedia',  '百',   false, { title: 'ニコニコ大百科の記事',
      content: function(data) {
        if (data.pedia === null) return '';
        return <a href={'http://dic.nicovideo.jp/a/'
                        + encodeURIComponent(data.name)}
                  title={'大百科「' + data.name + '」の記事を'
                         + (data.pedia ? '読む' : '書く')}
                  target="_blank">
          {data.pedia ? PEDIA_ON_ICON : PEDIA_OFF_ICON}
        </a>.toDOM();
      } } ],
    [ 'first',  '初出', true,  { comparer: 'date',
      title: 'タグが最初に発見された日時',
      content: function(data) dateSpan(data, false) } ],
    [ 'last',   '最後', true, { comparer: 'date',
      title: 'タグが最後に発見された日時',
      content: function(data) dateSpan(data, true) } ],
    [ 'span',   '期間', true, {
      comparer: function(d1, d2) {
        let span = (d1.last - d1.first) - (d2.last - d2.first);
        if (span !== 0) return span;
        return (d1.looseLast - d1.looseFirst) - (d2.looseLast - d2.looseFirst);
      },
      title: 'タグの生存期間', sortDefaultOrder: -1,
      content: function(data) {
        let span = timeSpan(data.first, data.last);
        let looseSpan = timeSpan(data.looseFirst, data.looseLast);
        let spanElem = <span class={NAME_PREFIX + 'normal-span'}>{span}</span>;
        if (span === looseSpan) return spanElem.toDOM();
        return (spanElem
                + <span class={NAME_PREFIX + 'loose-span'}>({looseSpan})</span>
               ).toDOM();
      } } ],
    [ 'good',   '○',   true, { comparer: 'number', sortDefaultOrder: -1,
      title: 'Good と評価された回数' } ],
    [ 'bad',    '×',    true, { comparer: 'number', sortDefaultOrder: -1,
      title: 'Bad と評価された回数' } ],
    [ 'rank',   '評',   true, { comparer: 'number', sortDefaultOrder: -1,
      title: 'タグの総合評価 (= [Good] - [Bad])' } ]
  ];
  return source.map(function([ id, label, sortable, options ]) {
    let obj = options || {};
    obj.id = id; obj.label = label; obj.sortable = sortable;
    return obj;
  });
})();


const Viewer = function(videoID, currentTags, lockedTags) {
  this._videoID     = videoID;
  this._currentTags = currentTags;
  this._lockedTags  = lockedTags;

  this._grid   = new window['mfp.xrea.jp'].DataGrid(DataGridProperty, NAME_PREFIX);
  this._pager  = new window['mfp.xrea.jp'].Pager(NAME_PREFIX);
  this._filter = new Filter(this, this._grid, NAME_PREFIX);

  this._grid.setCaption(this._createCaption());

  let df = document.createDocumentFragment();
  df.appendChild(this._createButtons());
  df.appendChild(this._status = <div>読み込み中</div>.toDOM());
  df.appendChild(this._filter.element);
  df.appendChild(this._grid.element);

  let self = this;
  this._pager.addCallback(function(page) {
    self._grid.page = page;
    self._grid.update();
  });

  let { panel, label } = nicovideo_createPanel('nicotag', 'タグ履歴');
  this._panel = panel;
  this._label = label;
  label.addEventListener('click', function() {
    self._instantShow = true;
    if (self._unhandledData !== null)
      self._setData(self._unhandledData);
  }, false);
  this._panel.appendChild(df);
};

Viewer.prototype = {
  _videoID: null, _currentTags: null, _lockedTags: null,
  _panel: null, _label: null,
  _grid: null, _pager: null, _reloadButton: null, _captionStatus: null,
  _instantShow: false, _unhandledData: null,
  update: function(forceUpdate, callback) {
    this._setStatus('??', '読み込み中');
    this._reloadButton.disabled = true;
    let self = this;
    nicotag_getTagsInfo(this._videoID, function(isSuccess, data) {
      if (isSuccess) {
        self._setStatus(data.count, '');
        if (self._instantShow)
          self._setData(data);
        else
          self._unhandledData = data;
      } else {
        self._setStatus(
          '失敗', '読み込み失敗: ' + data.status + ' ' + data.statusText);
      }
      self._reloadButton.disabled = false;

      if (typeof callback === 'function')
        callback(isSuccess);
    }, forceUpdate);
  },
  _setData: function(data) {
    this._unhandledData = null;
    this._convertData(data);
    this._setCaption(data);

    this._grid.setData(data.tags);
    this._grid.update();
    this.updatePager();
    let self = this;
    setTimeout(function() { self._startPediaUpdate(data.tags); }, 500);
  },
  updatePager: function() {
    this._pager.update(this._grid.pageLength);
    this._pager.goTo(0);
  },
  _startPediaUpdate: function(tags) {
    let grid = this._grid;
    tags.forEach(function(tag, i) {
      unsafeWindow.Nicopedia.Article.get(tag.name, 'a')
        .loadWritten(function(data) {
          tag.pedia = data.written;
          let row = grid.getRowByData(tag);
          if (row !== null)
            row.update();
        });
    });
  },
  _createTicks: function(tags) {
    let dateHash = {};
    dateHash.__proto__ = null;

    tags.forEach(function(tag) {
      dateHash[tag.first.getTime()] = true;
      dateHash[tag.last.getTime()] = true;
    });

    let ticks = [];
    for (let t in dateHash) {
      let d = new Date();
      d.setTime(t);
      ticks.push(d);
    }
    ticks.sort(function(a, b) a - b);
    return ticks;
  },
  _convertData: function(data) {
    let span = data.last - data.first;
    let current = this._currentTags;
    let locked = this._lockedTags;

    let ticks = this._createTicks(data.tags);

    data.tags.forEach(function(tag) {
      let first = bsearchLowerMax(ticks, function(time) time - tag.first) - 1;
      if (first < 0) first = 0;
      tag.looseFirst = ticks[first];

      let last = bsearchUpperMin(ticks, function(time) time - tag.last) + 1;
      if (last >= ticks.length) last = ticks.length - 1;
      tag.looseLast = ticks[last];

      tag.current = current.indexOf(tag.name) !== -1;
      tag.locked = locked.indexOf(tag.name) !== -1;
      tag.category = CATEGORY_TAGS.indexOf(tag.name) !== -1;
      tag.pedia = null;
      if (span !== 0) {
        tag.firstPer      = (tag.first - data.first) / span;
        tag.lastPer       = (tag.last  - data.first) / span;
        tag.looseFirstPer = (tag.looseFirst - data.first) / span;
        tag.looseLastPer  = (tag.looseLast  - data.first) / span;
      } else {
        tag.firstPer      = 0;
        tag.lastPer       = 1;
        tag.looseFirstPer = 0;
        tag.looseLastPer  = 1;
      }
    });
  },
  _createCaption: function() {
    this._captionStatus = <span/>.toDOM();
    let df = document.createDocumentFragment();
    df.appendChild(this._captionStatus);
    df.appendChild(this._createNavi());
    return df;
  },
  _createNavi: function() {
    let navi = <div class={NAME_PREFIX + 'page-navi'}/>.toDOM();
    navi.appendChild(this._pager.element);
    navi.appendChild(document.createTextNode(' '));

    let self = this;
    let selectorLabel = <label>表示件数:</label>.toDOM();
    let selector = <select/>;
    [ 10, 20, 30, 50, 100 ].forEach(
      function(n) selector.appendChild(<option value={n}>{n}</option>));
    selector.appendChild(<option value="0">全部</option>);
    selector.option[1].@selected = 'selected';
    selector = selector.toDOM();
    let grid = this._grid;
    grid.rowPerPage = 20;
    selector.addEventListener('change', function(e) {
      grid.rowPerPage = parseInt(selector.value, 10);
      grid.page = 0;
      grid.update();
      self._pager.update(grid.pageLength);
      self._pager.goTo(0);
    }, false);
    selectorLabel.appendChild(selector);
    navi.appendChild(selectorLabel);

    return navi;
  },
  _createButtons: function() {
    let container = document.createElement('div');

    {
      let reloadButtons = <span/>.toDOM();
      this._reloadButton = <button>再読み込み</button>.toDOM();
      let isForce = <input type="checkbox" checked="checked"/>.toDOM();
      let forceLabel = <label>最新のタグを取得する</label>.toDOM();
      forceLabel.insertBefore(isForce, forceLabel.firstChild);
      let self = this;
      this._reloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        self.update(isForce.checked);
      }, false);
      reloadButtons.appendChild(this._reloadButton);
      reloadButtons.appendChild(document.createTextNode(' '));
      reloadButtons.appendChild(forceLabel);

      container.appendChild(reloadButtons);
    }

    container.appendChild(document.createTextNode(' (powered by '));

    {
      let url = 'http://www.nicotag.jp/watch/' + this._videoID;
      let link = <a href={url} target="_blank">ニコタグ</a>.toDOM();
      container.appendChild(link);
    }

    container.appendChild(document.createTextNode(')'));

    return container;
  },
  _setStatus: function(label, status) {
    this._label.firstChild.textContent = 'タグ履歴(' + label + ')';
    this._status.textContent = status;
  },
  _setCaption: function(data) {
    this._captionStatus.textContent = '';
    this._captionStatus.appendChild(<>
      <strong>データ集計期間:</strong>&#xa0;
      { locale(data.first) } ~ { locale(data.last) }
      ({ timeSpan(data.first, data.last) })
    </>.toDOM());
  }
};


const STYLE = <><![CDATA[
  #itab_nicotag { font-size: 12px; }

  .<%page-navi%>    { float: right; }
  a.<%current-page%>    { text-decoration: underline !important;
                          font-weight: bold; }
  a.<%page-link%>       { text-decoration: none; margin: 0 2px; }
  a.<%page-link%>:hover { text-decoration: underline; }

  .<%filter-container%> {
    margin: 5px 0; padding: 5px; border: 1px solid silver;
  }
  .<%filter-container%> em { font-weight: bold; }

  #<%table%> {
    width: 100%; clear: both;
    border-collapse: collapse; border: 1px solid black;
  }
  #<%table%> td, #<%table%> th { border: 1px solid black; padding: 0 2px; }
  #<%table%> th { text-align: center; background-color: #7db1e0; }
  #<%table%> > thead a { display: block; text-decoration: none; }
  #<%table%> > tbody > tr:nth-child(even) { background-color: #ececec; }
  #<%table%> > tbody > tr:hover           { background-color: #ccc;    }

  .<%lifetime-indicator-wrapper%> { margin: 0 -2.5px; }
  .<%lifetime-indicator%>, .<%loose-lifetime-indicator%> {
    display: block; position: relative;
    min-width: 1px; height: 3px;
  }
  .<%lifetime-indicator%>       { background-color: red;                  }
  .<%loose-lifetime-indicator%> { background-color: rgba(255, 0, 0, 0.3); }

  #<%table%> > thead > tr > th:before {
    display: block;
    text-align: right;
    height: 0;
    color: gray;
  }
  .<%sort-ascending%>:before  { content: "▲"; }
  .<%sort-descending%>:before { content: "▼"; }

  .<%col-current%>                             { width: 1ch; }
  .<%col-locked%>                              { width: 1em; }
  .<%col-category%>                            { width: 21px; }
  .<%col-name%>                                { }
  .<%col-search%>, .<%col-pedia%>              { width: 20px; }
  .<%col-first%>,  .<%col-last%>               { width: 19ch; }
  .<%col-span%>                                { width: 6em; }
  .<%col-good%>,   .<%col-bad%>, .<%col-rank%> { width: 3ch; }

  .<%cell-current%>, .<%cell-category%>            { text-align: center; }
  .<%cell-locked%>  { text-align: center; color: #f90; }
  .<%cell-search%>, .<%cell-pedia%>                { text-align: center; }
  .<%cell-first%>,  .<%cell-last%>, .<%cell-span%> { text-align: center; }
  .<%cell-good%>,   .<%cell-bad%>,  .<%cell-rank%> { text-align: right;  }

  .<%cell-first%>,  .<%cell-last%> { line-height: 1.2; }

  .<%normal-span%>, .<%loose-span%> { white-space: pre; }
  .<%loose-span%> { font-size: 80%; }
]]></>.toString().replace(/<%([-a-z]+)%>/g, NAME_PREFIX + '$1');


(function main() {
  GM_addStyle(STYLE);
  let video  = unsafeWindow.Video;
  let viewer = new Viewer(video.id, video.tags, video.lockedTags);
  viewer.update(DEFAULT_FORCE_UPDATE);
})();

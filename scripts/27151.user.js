// ==UserScript==
// @name           nicovideo Tag Edit Helper
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Help you edit tags of nicovideo's movies.
// @include        http://www.nicovideo.jp/watch/*
// @include        http://tw.nicovideo.jp/watch/*
// @include        http://de.nicovideo.jp/watch/*
// @include        http://es.nicovideo.jp/watch/*
// ==/UserScript==

String.toHalfWidth = new function() {
  var reg = /[\uff01-\uff5e]/g;
  var fun = function(m) {
    return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
  };
  return function(s) { return s.replace(reg, fun); };
};
String.prototype.toHalfWidth = function() {
  return String.toHalfWidth(this);
};
String.normalize = function(s) { return s.toHalfWidth().toLowerCase(); };
String.prototype.normalize = function() { return String.normalize(this); };
String.normalizeSpace = function(s) { return s.replace(/\s+/g, ' ').replace(/^\s/, '').replace(/\s$/, ''); };
String.prototype.normalizeSpace = function() { return String.normalizeSpace(this); };

String.decodeEntityReference = new function() {
  var span = $N('span');
  return function(s) {
    span.innerHTML = s;
    return span.firstChild.nodeValue;
  };
};
String.prototype.decodeEntityReference = function() { return String.decodeEntityReference(this); };

String.prototype.forEach = function(regex, func) {
  var r;
  if(!regex.global) {
    if((r = regex.exec(this)) != null)
      func.apply(this, r);
    return;
  }
  while((r = regex.exec(this)) != null) {
    func.apply(this, r);
  }
};


Number.prototype.fill = function(order) {
  var s = this.toString();
  while(s.length < order)
    s = '0' + s;
  return s;
};

Number.prototype.toJpString = function() {
  if(isNaN(this) || isFinite(this))
    return this.toString();
  if(this > 0)
    return '∞';
  return '-∞';
};
Date.prototype.toDateSpanString = function(date) {
  if(this < date)
    return date.toDateSpanString(this);
  var year = this.getFullYear() - date.getFullYear();
  var month = this.getMonth() - date.getMonth();
  if(month < 0) {
    year--;
    month += 12;
  }
  if(year > 0 || month > 0)
    return (year > 0 ? year + '年' : '') + month + 'ヶ月';
  var num = Math.floor((this - date) / 1000);
  var day = Math.floor(num / (24 * 60 * 60));
  if(day > 0)
    return day + '日';
  var hour = Math.floor(num / (60 * 60));
  if(hour > 0)
    return hour + '時間';
  var minute = Math.floor(num / 60);
  if(minute > 0)
    return minute + '分';
  return num + '秒';
};
Date.prototype.toJpString = function() {
  return [this.getFullYear(), (this.getMonth()+1).fill(2), this.getDate().fill(2)].join('/') + ' '
    + [this.getHours().fill(2), this.getMinutes().fill(2), this.getSeconds().fill(2)].join(':');
};
Date.fromISO8601 = function(str) {
  var date = new Date();
  date.setISO8601(str);
  return date;
};
Date.prototype.setISO8601 = new function() {
  var regstr = "^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2})" +
    "(?:T([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:\.([0-9]+))?)?" +
    "(?:Z|(?:([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$";
  var regexp = new RegExp(regstr);
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
    time = (Number(date) + (offset * 60 * 1000));

    this.setTime(Number(time));
  };
};

function equalsTo(x) { return function (y) { return x == y;}; }
function notEqualsTo(x) { return function (y) { return x != y;}; }
function likesTo(x) {
  var normalized = x.normalize();
  return function(y) {
    return normalized == y.normalize();
  };
}
function notLikesTo(x) {
  var normalized = x.normalize();
  return function(y) {
    return normalized != y.normalize();
  };
}

Array.contains = function(array, x) {
  return Array.some(array, equalsTo(x));
};
Array.prototype.contains = function(x) {
  return Array.contains(this, x);
};
Array.likeContains = function(array, x) {
  return Array.some(array, likesTo(x));
};
Array.prototype.likeContains = function(x) {
  return Array.likeContains(this, x);
};

function addClassName() {
  var elem = Array.shift(arguments);
  var classNames = elem.className.split(/\s+/);
  Array.forEach(arguments, function(name) {
                  if(!classNames.contains(name))
                    classNames.push(name);
                });
  elem.className = classNames.join(' ');
}
function removeClassName() {
  var elem = Array.shift(arguments);
  var arg = arguments;
  elem.className = elem.className.split(/\s+/).filter(
    function(exist_name) {
      return !Array.contains(arg, exist_name);
    }).join(' ');
}
function toggleClassName() {
  var elem = Array.shift(arguments);
  var classNames = elem.className.split(/\s+/);
  Array.forEach(arguments, function(name) {
                  var old_len = classNames.length;
                  classNames = classNames.filter(notEqualsTo(name));
                  if(old_len == classNames.length)
                    classNames.push(name);
                });
  elem.className = classNames.join(' ');
}

const Single = {};

function $(name) { return document.getElementById(name); }
//var $ = document.getElementById;

function $exp(exp, ownerDocument) {
  if(!ownerDocument) ownerDocument = document;
  var resolver = document.createNSResolver(ownerDocument);
  var def = (document.contentType == 'application/xhtml+xml') ? 'http://www.w3.org/1999/xhtml' : '';
  return ownerDocument.createExpression(
    exp,
    function(prefix) {
      return resolver.lookupNamespaceURI(prefix) || def;
    });
}

function $X(exp, context, type /* want type */) {
  if (typeof context == 'function') {
    type    = context;
    context = null;
  }
  if(typeof exp == 'string' || exp instanceof String)
    exp = $exp(exp, context.ownerDocument || context);

  var result, ret, i;
  switch (type) {
  case String:  return exp.evaluate(context, XPathResult.STRING_TYPE,  null).stringValue;
  case Number:  return exp.evaluate(context, XPathResult.NUMBER_TYPE,  null).numberValue;
  case Boolean: return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
  case Single:  return exp.evaluate(context, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  case Array:
    result = exp.evaluate( context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    ret = [];
    for (i = 0, len = result.snapshotLength; i < len; i++)
      ret.push(result.snapshotItem(i));
    return ret;
  case undefined:
    result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
      // not ensure the order.
      ret = [];
      i = null;
      while ((i = result.iterateNext()) != null);
        ret.push(i);
      return ret;
    }
    return null;
  default:
    throw(TypeError('$X: specified type is not valid type.'));
  }
}

function $N(elem, attr, children) {
  if(!elem) return null;
  if(typeof elem == 'string' || elem instanceof String)
    elem = document.createElement(elem);
  else
    elem = elem.cloneNode(!children);
  for (key in attr) {
    if (!attr.hasOwnProperty(key)) continue;
    elem.setAttribute(key, attr[key]);
  }
  function recAppend(child) {
    if(typeof child == 'string' || child instanceof String)
      elem.appendChild(document.createTextNode(child));
    else if(child instanceof Array)
    child.forEach(recAppend);
    else if(child)
    elem.appendChild(child);
  }
  recAppend(children);
  return elem;
}





GM_addStyle(<><![CDATA[
                   #tag_edit_form > div > table._GM_table {
                     max-width: 300px;
                   }
                   #_GM_view_area {
                     width: 450px;
                     float: right;
                     top: 0;
                     left: 300px;
                     background-color: white;
                     margin: 0 10px;
                     border: 1px outset gray;
                     padding: 5px 0 0;
                     font-size: 12px;
                     line-height: 2;
                   }
                   #_GM_view_area p {
                     padding: 0 10px;
                   }
                   #_GM_view_area p+p+p {
                     padding: 5px 10px;
                   }
                   #_GM_tags_container {
                     padding: 5px 10px !important;
                     border: 1px solid silver;
                     border-width: 1px 0;
                     max-height: 300px;
                     overflow-y: auto;
                     margin: 0;
                     line-height: 2.1;
                     word-spacing: 2px;
                   }
                   #_GM_site_info {
                     border-bottom: 1px solid silver;
                   }
                     ._GM_selection {
                       border: 1px solid silver;
                       padding: 1px 3px;
                       white-space: nowrap;
                       cursor: pointer;
                       vertical-align: middle;
                         -moz-outline: 0.2em solid transparent;
                         -moz-outline-offset: -2px;
                     }
                     ._GM_selection:hover { background-color: #e8e8ff; }
                     ._GM_disabled {
                       color: gray;
                       background-color: #dddddd !important;
                       border-style: inset;
                       cursor: default;
                       display: inline !important;
                     }
                     ._GM_selected {
                       background-color: silver;
                       border-style: inset;
                       display: inline !important;
                     }
                     ._GM_additional { font-weight: bolder; }
                     ._GM_stared::before {
                       content: '★';
                       color: #f90;
                       padding: 0 3px;
                     }
                     ._GM_category::after {
                       content: 'カテゴリ';
                       color: #f30;
                       font-weight: bolder;
                       font-size: 80%;
                       padding: 0 3px;
                     }
                     ._GM_template {
                       text-decoration: underline;
                       background-color: #ffcccc;
                       display: inline !important;
                     }
                     ._GM_template._GM_selected {
                       background-color: #ffaaaa;
                     }
                     ._GM_service_name_focus {
                         -moz-outline: red 2px solid;
                         -moz-outline-offset: -1px;
                     }
                     ._GM_nicotag_focus   ._GM_nicotag,
                     ._GM_nicochart_focus ._GM_nicochart,
                     ._GM_nearch_focus    ._GM_nearch,
                     ._GM_gsearch_focus   ._GM_gsearch {
                         -moz-outline: red 0.3em solid !important;
                         -moz-outline-radius: 5px;
                         -moz-outline-offset: -3px;
                     }
                     ._GM_nicotag_focus   + #_GM_site_info ._GM_nicotag::before,
                     ._GM_nicochart_focus + #_GM_site_info ._GM_nicochart::before,
                     ._GM_nearch_focus    + #_GM_site_info ._GM_nearch::before,
                     ._GM_gsearch_focus   + #_GM_site_info ._GM_gsearch::before {
                       color: red !important;
                     }
                     ._GM_emphasis_all + #_GM_site_info ._GM_service_name::before {
                       content: '■';
                     }
                     ._GM_service_name_focus._GM_nicotag,
                     ._GM_emphasis_all ._GM_nicotag   { -moz-outline-color: green; }
                     ._GM_service_name_focus._GM_nicochart,
                     ._GM_emphasis_all ._GM_nicochart { -moz-outline-color: orange; }
                     ._GM_service_name_focus._GM_nearch,
                     ._GM_emphasis_all ._GM_nearch    { -moz-outline-color: brown; }
                     ._GM_service_name_focus._GM_gsearch,
                     ._GM_emphasis_all ._GM_gsearch   { -moz-outline-color: navy; }

                   #_GM_site_info ._GM_nicotag::before   { color: green; }
                   #_GM_site_info ._GM_nicochart::before { color: orange; }
                   #_GM_site_info ._GM_nearch::before    { color: brown; }
                   #_GM_site_info ._GM_gsearch::before   { color: navy; }

                   #_GM_rank_setting button {
                     font-size: 0.8em;
                     padding: 0;
                   }
                 ]]></>);

const name_prefix = "_GM_";
const view_area_id = name_prefix + "view_area";
const tags_container_id = name_prefix + "tags_container";
const site_info_id = name_prefix + "site_info";
const rank_setting_id = name_prefix + "rank_setting";
const video_id = unsafeWindow.Video.id;
const nicovideo_domain = location.href.match(/^http:\/\/(.+)\.nicovideo\.jp/)[1];
const request_url = 'http://' + nicovideo_domain + '.nicovideo.jp/tag_edit/' + video_id;
const TagNamePrefix = 'TAG_';
const max_tag_length = 10;
const KEY_SPACE = 32;
const GM_TAGS_KEY = 'template_tags';
const category_tags = ["公式", "総合", "音楽", "エンターテイメント", "アニメ", "ゲーム", "ラジオ", "スポーツ", "科学", "料理", "政治", "動物", "歴史", "自然", "ニコニコ動画講座", "演奏してみた", "歌ってみた", "踊ってみた", "投稿者コメント", "日記", "アンケート", "チャット", "テスト", "台灣", "その他", "R-18"];

var TemplateTags = {
  tags: eval(GM_getValue(GM_TAGS_KEY)) || [],
  append: function(tagname) {
    if(!this.tags.likeContains(tagname)) {
      this.tags.push(tagname);
      this.updateGMValue();
    }
  },
  remove: function(tagname) {
    this.tags = this.tags.filter(notLikesTo(tagname));
    this.updateGMValue();
  },
  updateGMValue: function() {
    GM_setValue(GM_TAGS_KEY, this.tags.toSource());
  }
};

var TagsGetter = function(name, className, url, max_tag_length, extract_tags) {
  this._tags = null;
  this._update_callbacks = [];
  this._loading = false;
  this.name = name;
  this.className = name_prefix + className;
  this.url = url;
  this.max_tag_length = max_tag_length;
  this._extract_tags = extract_tags;
};


TagsGetter.prototype = {
  reset: function() { this._tags = null; },
  getTags: function(callback) {
    if(typeof callback != 'function')
      return;
    var self = this;
    if(this._tags === null)
      this.update(function() { callback(self._tags, self); });
    else
      callback(this._tags, this);
  },
  update: function(callback) {
    if(typeof callback == 'function')
      this._update_callbacks.push(callback);
    if(this.loading)
      return;
    this.loading = true;
    var self = this;
    GM_xmlhttpRequest(
      {
        method: 'GET',
        url: this.url,
        headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey; nicovideo Tag Edit Helper'},
        onload: function(response) {
          if(response.status == 200)
            self._tags = self._extract_tags(response);
          else
            self._tags = [];
          self._tags.forEach(function(tag) {
                               tag.service = self;
                             });
          var callback;
          while((callback = self._update_callbacks.shift()) !== undefined)
            callback();
          self.loading = false;
        }
      });
  }
};

var parser = new DOMParser();
var nicotagTags = new TagsGetter(
  'ニコタグ', 'nicotag', 'http://www.nicotag.jp/api/updtagsinfo/' + video_id, 300,
  function(response) {
    var doc = parser.parseFromString(response.responseText, 'text/xml');
    this.watch_url = $X('//video_tags/watch_url/text()', doc, String);
    this.date_from = Date.fromISO8601($X('//video_tags/first_keep/text()', doc, String));
    this.date_to = Date.fromISO8601($X('//video_tags/last_keep/text()', doc, String));
    this.date_span = this.date_to - this.date_from;
    this.last_added = this.date_to;
    var self = this;
    var tags = Array.map(
      doc.getElementsByTagName('tag'),
      function(elem) {
        var tag = {};
        tag.name = elem.getElementsByTagName('name')[0].firstChild.nodeValue;
        tag.date_from = Date.fromISO8601(elem.getElementsByTagName('first_added')[0].firstChild.nodeValue);
        tag.date_to = Date.fromISO8601(elem.getElementsByTagName('last_added')[0].firstChild.nodeValue);
        tag.date_span = tag.date_to - tag.date_from;
        tag.vote_rank = parseInt(elem.getElementsByTagName('rank')[0].firstChild.nodeValue);
        tag.exist_rank = 1;
        if(tag.date_to > self.date_to) {
          self.date_to = tag.date_to;
          self.date_span = self.date_to - self.date_from;
        }
        return tag;
      });
    tags.forEach(
      function(tag) {
        if(self.span != 0)
          tag.exist_rank = tag.date_span / self.date_span;
        tag.rank = 16 * tag.vote_rank + 24 * tag.exist_rank;
        return tag;
      });
    return tags;
  });
nicotagTags.update();

var nicochartTags = new TagsGetter(
  'ニコチャート', 'nicochart', 'http://www.nicochart.jp/watch/' + video_id, 10,
  function(response) {
    var tags = [];
    if(response.responseText.match(new RegExp('<dd class="tag">((\\s|.)+?)</dd>', 'm'))) {
      RegExp.$1.forEach(
        new RegExp('<a href="../tag/[^"]+">([^<]+)</a>', 'g'),
        function(_, tag) {
          tags.push({name: tag.decodeEntityReference()});
        });
    }
    this.date_from = null;
    if((new RegExp('<p class="date">\\((\\d+)/(\\d+)/(\\d+) (\\d+):(\\d+):(\\d+)\\)')).test(response.responseText)) {
      this.date_to = new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
    }
    return tags;
  });

var nearchTags = new TagsGetter(
  'Nearch', 'nearch', 'http://nearch.jp/watch/' + video_id + '/tag/all.xml', Number.POSITIVE_INFINITY,
  function(response) {
    var doc = parser.parseFromString(response.responseText, 'text/xml');
    var tags = Array.map(
      doc.getElementsByTagName('tag'),
      function(node) {
        var tag = {};
        tag.name = node.textContent;
        return tag;
      });
    response.responseText.forEach(
      new RegExp('<span class="tagcloud(\\d+)">&nbsp;<a href="/video/tags/[^"]+">([^<]+)</a>', 'g'),
      function(_, rank, tag) {
        tags.push({name: tag.decodeEntityReference(), rank: parseInt(rank)});
      });
    this.date_from = null;
    if(new RegExp('<span class="updated">\\s+Updated\\s+(\\d+)/(\\d+)/(\\d+) (\\d+):(\\d+):(\\d+)\\s+</span>', 'm').test(response.responseText)) {
      this.date_to = new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
    }
    return tags;
  });

var gsearchTags = new TagsGetter(
  'Gsearch', 'gsearch', 'http://nico.grn-web.net/videodata/' + video_id, 10,
  function(response) {
    var tags = [];
    if(response.responseText.match(
         new RegExp('<p class="tag">((\\s|.)+?)</p>', 'm'))) {
      RegExp.$1.forEach(
        new RegExp('<a href="http://nico.grn-web.net/tag/[^"]+" >([^<]+)</a>', 'g'), function(_, tag) {
          tags.push({name: tag.decodeEntityReference()});
        });
    }
    this.date_from = null;
    if((new RegExp('<span class="sn">\\[(\\d+)-(\\d+)-(\\d+) (\\d+):(\\d+):(\\d+)\\]')).test(response.responseText)) {
      this.date_to = new Date(RegExp.$1, RegExp.$2-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
    }
    return tags;
  });

var allTagsGetter = {
  _create_new_callback: function(callback, finished_callback) {
    var finished_len = 0, len = this.services.length;
    return function() {
      if(typeof callback == 'function')
        callback.apply(window, arguments);
      finished_len++;
      if(finished_len == len && typeof finished_callback == 'function')
        finished_callback();
    };
  },
  services: [nicotagTags, nicochartTags, nearchTags, gsearchTags],
  reset: function() {
    this.services.forEach(function(searvice) { searvice.reset(); });
  },
  getTags: function(callback, finished_callback) {
    var new_callback = this._create_new_callback(callback, finished_callback);
    this.services.forEach(function(searvice) { searvice.getTags(new_callback); });
  },
  update: function(callback, finished_callback) {
    var new_callback = this._create_new_callback(callback, finished_callback);
    this.services.forEach(function(searvice) { searvice.update(new_callback); });
  }
};


var Tag = function(tagname) {
  this.original_name = tagname;
  this.encoded_original_name = encodeURI(tagname);
  this.name = tagname.normalize();
  this.hashname = TagNamePrefix + this.name;
  this._import_from = [];
};
Tag.element_prototype = $N('span', {'class': '_GM_selection'}, '');
Tag.createHashName = function(tagname) { return TagNamePrefix + tagname.normalize(); };
Tag.prototype = {
  _element: null,
  get element() {
    if(this._element != null)
      return this._element;
    this._element = Tag.element_prototype.cloneNode(true);
    this._element.firstChild.nodeValue = this.original_name;
    this.updateTitle();

    var self = this;
    this._element.addEventListener(
      'mousedown',
      function(e) {
        if(e.shiftKey)
          e.preventDefault(); // 範囲選択をキャンセル
      }, false);
    this._element.addEventListener(
      'mouseup',
      function(e) {
        if(e.altKey && e.shiftKey)
          return GM_openInTab('http://www.nicotag.jp/tag/' + self.encoded_original_name);
        if(e.altKey)
          return GM_openInTab('http://www.nicovideo.jp/tag/' + self.encoded_original_name);
        if(e.ctrlKey)
          return self.is_template = !self.is_template;
        if(self.disabled)
          return null;
        if(e.shiftKey)
          return self.container.selectRange(self);
        return self.toggleSelected();
      }, false);
    return this._element;
  },
  _disabled: false,
  get disabled() {
    return this._disabled;
  },
  set disabled(val) {
    this._disabled = val;
    if(val)
      addClassName(this.element, '_GM_disabled');
    else
      removeClassName(this.element, '_GM_disabled');
    return val;
  },
  _is_selected: false,
  get is_selected() {
    return this._is_selected;
  },
  set is_selected(val) {
    if(val == this._is_selected || this.disabled)
      return this._is_selected;
    this._is_selected = this.container.setSelectedValue(this, val);
    if(this._is_selected)
      addClassName(this.element, '_GM_selected');
    else
      removeClassName(this.element, '_GM_selected');
    return this._is_selected;
  },
  toggleSelected: function() {
    var old = this.is_selected;
    this.is_selected = !old;
    if(this.is_selected != old)
      this.container.changeByClick(this);
  },
  _is_template: false,
  get is_template() {
    return this._is_template;
  },
  set is_template(val) {
    this._is_template = val;
    if(val) {
      addClassName(this.element, '_GM_template');
      TemplateTags.append(this.original_name);
    }
    else {
      removeClassName(this.element, '_GM_template');
      TemplateTags.remove(this.original_name);
    }
    this.updateTitle();
    return val;
  },
  _is_additional: false,
  get is_additional() {
    return this._is_additional;
  },
  set is_additional(val) {
    this._is_additional = val;
    if(val)
      addClassName(this.element, '_GM_additional');
    else
      removeClassName(this.element, '_GM_additional');
    return val;
  },
  updateTitle: function() {
    var services = ((this.is_template)? ['テンプレート'] : []).concat(this._import_from).join(', ');
    if(services == '')
      services = 'なし';
    this.element.title = '『' + this.original_name + '』';
    if(this._rank != null)
      this.element.title += ', ランク: ' + Math.floor(this._rank + 0.5);
    this.element.title += ', 取得元: ' + services;
  },
  _ranked_length: 0,
  _rank: null,
  setData: function(data) {
    this._data = data;
    if(data.service) {
      this._import_from.push(data.service.name);
      this.element.addEventListener(
        'mouseover',
        function() {
          addClassName(data.service.link_container, '_GM_service_name_focus');
        }, false);
      this.element.addEventListener(
        'mouseout',
        function() {
          removeClassName(data.service.link_container, '_GM_service_name_focus');
        }, false);
      this.updateTitle();
    }
    if(typeof data.rank == 'number') {
      if(this._rank == null)
        this._rank = 0;
      this._ranked_length++;
      this._rank += (data.rank - this._rank) / this._ranked_length;
      var new_rank = Math.floor(this._rank + 0.5);
      if(new_rank > 24)
        new_rank = 24;
      if(new_rank < 0)
        new_rank = 0;
      if(this._rank_className != null)
        removeClassName(this.element, this._rank_className);
      this._rank_className = '_GM_tags_rank_' + new_rank;
      addClassName(this.element, this._rank_className);
      this.updateTitle();
    }
  },
  toString: function() {
    return this.original_name;
  }
};



var AllTags = function(appended_tags_length) {
  this.max_selectable_length = Math.max(max_tag_length - appended_tags_length, 0);
  this.tags = [];
  this.last_clicked = null;
  this.click_callbacks = [];
  this._container = null;
};
AllTags.space_element = $N('span', {style: 'font-size: 0.5em;'}, ' ');
AllTags.prototype = {
  current_selected_length: 0,
  get is_appendable() {
    return this.max_selectable_length - this.current_selected_length > 0;
  },
  get selected_length() {
    return this.tags.count(function(tag) { return tag.is_selected; });
  },
  get container() {
    return this._container;
  },
  set container(val) {
    this._container = val;
    if(val != null)
      this.tags.forEach(
        function(tag) {
          val.appendChild(tag.element);
          val.appendChild(AllTags.space_element.cloneNode(true));
        });
    return val;
  },
  getTag: function(tagname) {
    return this.tags[Tag.createHashName(tagname)] || null;
  },
  getHiddenTag: function(tagname) {
    tagname = tagname.normalizeSpace();
    if(tagname == '')
      return null;
    var tag = this.getTag(tagname);
    if(tag == null) {
      tag = new Tag(tagname, this);
      tag.is_hidden = true;
      this.tags[tag.hashname] = tag;
    }
    return tag;
  },
  appendTag: function(tagname, additional) {
    tagname = tagname.normalizeSpace();
    if(tagname == '')
      return null;
    var tag = this.getTag(tagname);
    if(tag != null) {
      if(!tag.is_hidden)
        return tag;
      else
        tag.is_hidden = false;
    }
    else
      tag = new Tag(tagname, this);
    if(additional)
      tag.is_additional = true;
    tag.container = this;
    tag.index = this.tags.length;
    this.tags.push(tag);
    this.tags[tag.hashname] = tag;
    if(this.container != null) {
      this.container.appendChild(tag.element);
      this.container.appendChild(AllTags.space_element.cloneNode(true));
    }
    return tag;
  },
  setSelectedValue: function(tag, val) {
    if(val == false) {
      this.current_selected_length--;
      return false;
    }
    if(!this.is_appendable)
      return false;
    this.current_selected_length++;
    return true;
  },
  setSelectedFromString: function(selected_tagnames) {
    this.setSelected(selected_tagnames.normalizeSpace().split(/\s+/));
  },
  setSelected: function(selected_tagnames) {
    this.resetSelected();
    var self = this;
    selected_tagnames.forEach(
      function(tagname) {
        var tag = self.appendTag(tagname, true);
        if(tag != null)
          tag.is_selected = true;
      });
  },
  resetSelected: function() {
    this.tags.forEach(function(tag) { tag.is_selected = false; });
  },
  selectAll: function() {
    this.tags.forEach(function(tag) { tag.is_selected = true; });
  },
  toInputString: function() {
    return this.tags.filter(function(tag) { return tag.is_selected; }).join(' ');
  },
  changeByClick: function(tag) {
    this.last_clicked = tag;
    this.click_callbacks.forEach(function(callback) {
                                   callback(tag);
                                 });
  },
  selectRange: function(tag_end) {
    var tag_start = tag_end.index;
    if(this.last_clicked != null)
      tag_start = this.last_clicked.index;
    tag_end = tag_end.index;
    var i;
    if(tag_start < tag_end)
      for(i = tag_start + 1; i <= tag_end; i++)
        this.tags[i].toggleSelected();
    else if(tag_start > tag_end)
    for(i = tag_start - 1; i >= tag_end; i--)
      this.tags[i].toggleSelected();
    else
      this.tags[tag_start].toggleSelected();
  }
};

function createInputEvents(input, alltags) {
  input.addEventListener(
    'keyup',
    function(e) {
      if(e.keyCode == KEY_SPACE)
        alltags.setSelectedFromString(input.value);
    }, false);
  input.addEventListener(
    'blur',
    function() {
      alltags.setSelectedFromString(input.value);
    }, false);
  alltags.click_callbacks.push(
    function(tag) {
      input.value = input.value.split(/\s+/).filter(notEqualsTo('')).filter(notLikesTo(tag.name)).join(' ');
      if(tag.is_selected) {
        if(input.value != '')
          input.value += ' ';
        input.value += tag.original_name;
      }
    });
}

function createCommandButtons(container, alltags, input) {
  var selectAll = $N('span', {'class': name_prefix + 'selection'}, '全て選択');
  var selectReset = $N('span', {'class': name_prefix + 'selection'}, 'リセット');
  var reload = $N('span', {'class': name_prefix + 'selection'}, '再読み込み');
  var addTemplate = $N('span', {'class': name_prefix + 'selection'}, '新規テンプレート');

  if(input) {
    selectAll.addEventListener(
      'click',
      function() {
        alltags.selectAll();
        input.value = alltags.toInputString();
      }, false);

    selectReset.addEventListener(
      'click',
      function() {
        alltags.resetSelected();
        input.value = alltags.toInputString();
      }, false);
  }

  reload.addEventListener(
    'click',
    function() {
      container.parentNode.removeChild(container);
      allTagsGetter.reset();
      appendTagsList();
    }, false);

  addTemplate.addEventListener(
    'click',
    function() {
      var tagnames = prompt('テンプレートに追加したいタグを入力してください。(スペース区切り)', '');
      if(tagnames == null || tagnames == '')
        return;
      tagnames.normalizeSpace().split(/\s+/).forEach(
        function(tagname) {
          var tag = alltags.appendTag(tagname);
          if(tag != null)
            tag.is_template = true;
        });
    }, false);

  container.appendChild($N('p', {}, [
                             selectAll, ' ', selectReset, ' ', reload, ' ', addTemplate
                           ]));
  return {selectAll: selectAll, selectReset: selectReset, reload: reload, addTemplate: addTemplate};
}

function createTagsInfo(container, alltags) {
  var alltags_counter = $N('span', {}, alltags.tags.length + '件');
  var selected_counter = $N('span', {}, '0');
  alltags.watch('current_selected_length', function(name, oldVal, newVal) {
                  selected_counter.innerHTML = newVal;
                  return newVal;
                });

  container.appendChild($N('p', {}, [
                             $N('strong', {}, '過去のタグ: '), alltags_counter, ' ',
                             $N('strong', {}, '新しいタグ: '),
                             $N('span', {}, [selected_counter, '/' + alltags.max_selectable_length + ' '])
                           ]));
  return {alltags_counter: alltags_counter, selected_counter: selected_counter};
}

function appendTagsList() {
  var tag_frm = document.getElementById('tag_edit_form');
  var tables = document.querySelectorAll('#tag_edit_form > div > table');
  var tags_table = tables[1];
  if(tags_table == null) return;
  tags_table.style.cssFloat = "left";
  tags_table.className = '_GM_table';

  var current_tags =
    $X('descendant::tr/td[1][not(contains(@class, "dot_1"))]/text()[normalize-space(.) != ""]',
       tags_table, Array).map(
         function(node) { return node.nodeValue.normalizeSpace(); });
  var stared_tags =
    $X('descendant::tr/td[1][not(contains(@class, "dot_1"))][span/text() = "★"]/text()[normalize-space(.) != ""]',
       tags_table, Array).map(function(node) { return node.nodeValue.normalizeSpace(); });
  var div = $N('div', {id: view_area_id});
  tags_table.parentNode.insertBefore(div, tags_table.nextSibling);
  tags_table.parentNode.insertBefore($N('br', {style: 'clear: both;'}),
                                    div.nextSibling);

  var alltags = new AllTags(current_tags.length);

  TemplateTags.tags.forEach(
    function(tagname) {
      var tag = alltags.appendTag(tagname);
      if(tag != null)
        tag.is_template = true;
    });
  current_tags.forEach(
    function(tagname) {
      var tag = alltags.getHiddenTag(tagname);
      if(tag != null)
        tag.disabled = true;
    });
  stared_tags.forEach(
    function(tagname) {
      var tag = alltags.getHiddenTag(tagname);
      if(tag != null)
        addClassName(tag.element, '_GM_stared');
    });
  category_tags.forEach(
    function(tagname) {
      var tag = alltags.getHiddenTag(tagname);
      if(tag != null) {
        addClassName(tag.element, '_GM_category');
      }
    });
  var input =
    document.querySelector('#tag_edit_form > div > form input[type="text"]');
  if(input !== null) {
    createInputEvents(input, alltags);
    if(input.value != '')
      alltags.setSelectedFromString(input.value);
  }

  var tag_info = createTagsInfo(div, alltags);
  var command_buttons = createCommandButtons(div, alltags, input);

  var tags_container = $N('p', {id: tags_container_id});
  alltags.container = tags_container;
  div.appendChild(tags_container);

  var site_info = $N('p', {id: site_info_id});
  var emphasis_check = $N('input', {type: 'checkbox'});
  emphasis_check.addEventListener(
    'change',
    function() {
      if(emphasis_check.checked)
        addClassName(tags_container, '_GM_emphasis_all');
      else
        removeClassName(tags_container, '_GM_emphasis_all');
    }, false);
  site_info.appendChild($N('label', {}, [emphasis_check, '強調']));
  site_info.appendChild(document.createTextNode(' '));
  div.appendChild(site_info);

  var rank_setting = $N('p', {id: rank_setting_id});
  var rank_check = $N('input', {type: 'checkbox'});
  rank_check.addEventListener(
    'change',
    function() {
      if(rank_check.checked)
        addClassName(tags_container, '_GM_rank_visible');
      else
        removeClassName(tags_container, '_GM_rank_visible');
    }, false);
  var min_input = $N('input', {type: 'text', value: 0.7, size: 2}, '');
  var middle_input = $N('input', {type: 'text', value: 1, size: 2}, '');
  var max_input = $N('input', {type: 'text', value: 2, size: 2}, '');
  var show_min_input = $N('input', {type: 'text', value: 0, size: 2}, '');
  min_input.addEventListener('change', updateTagFontSize, false);
  middle_input.addEventListener('change', updateTagFontSize, false);
  max_input.addEventListener('change', updateTagFontSize, false);
  show_min_input.addEventListener('change', updateTagFontSize, false);
  var show_min_minus_button = $N('button', {}, '-');
  var show_min_plus_button = $N('button', {}, '+');
  show_min_minus_button.addEventListener(
    'click',
    function() {
      show_min_input.value = parseInt(show_min_input.value) - 1;
      updateTagFontSize();
    }, false);
  show_min_plus_button.addEventListener(
    'click',
    function() {
      show_min_input.value = parseInt(show_min_input.value) + 1;
      updateTagFontSize();
    }, false);
  rank_setting.appendChild($N('label', {}, [rank_check, 'ランク別表示']));
  rank_setting.appendChild(document.createTextNode(' '));
  rank_setting.appendChild($N('strong', {}, 'フォントサイズ: '));
  rank_setting.appendChild(document.createTextNode(' '));
  rank_setting.appendChild($N('label', {}, ['最小', min_input]));
  rank_setting.appendChild(document.createTextNode(' '));
  rank_setting.appendChild($N('label', {}, ['中間', middle_input]));
  rank_setting.appendChild(document.createTextNode(' '));
  rank_setting.appendChild($N('label', {}, ['最大', max_input]));
  rank_setting.appendChild(document.createTextNode(' '));
  rank_setting.appendChild($N('strong', {}, '表示する最小ランク: '));
  rank_setting.appendChild($N('label', {}, show_min_input));
  rank_setting.appendChild($N('label', {}, show_min_minus_button));
  rank_setting.appendChild($N('label', {}, show_min_plus_button));
  rank_check.checked = true;
  addClassName(tags_container, '_GM_rank_visible');
  div.appendChild(rank_setting);

  //        this.element.style.fontSize = 0.3 + 0.7 * this._rank / 12 + 'em';
  function setTagFontSized(min, middle, max, show_min_rank) {
    var arr = [];
    for(var i = 0; i <= 12; i++) {
      var x = i * i / 12 / 12;
      var small_size = min + (middle - min) * x;
      var large_size = max - (max - middle) * x;
      arr.push('._GM_rank_visible ._GM_tags_rank_' + i + ' { font-size: ' + small_size + 'em; }');
      arr.push('._GM_rank_visible ._GM_tags_rank_' + (24 - i) + ' { font-size: ' + large_size + 'em; }');
      if(24 - i < show_min_rank) {
        arr.push('._GM_rank_visible ._GM_tags_rank_' + i + ' { display: none; }');
        arr.push('._GM_rank_visible ._GM_tags_rank_' + (24 - i) + ' { display: none; }');
      }
      else if(i < show_min_rank) {
        arr.push('._GM_rank_visible ._GM_tags_rank_' + i + ' { display: none; }');
        arr.push('._GM_rank_visible ._GM_tags_rank_' + (24 - i) + ' { display: inline; }');
      }
      else {
        arr.push('._GM_rank_visible ._GM_tags_rank_' + i + ' { display: inline; }');
        arr.push('._GM_rank_visible ._GM_tags_rank_' + (24 - i) + ' { display: inline; }');
      }
    }
    GM_addStyle(arr.join('\n'));
  }
  function updateTagFontSize() {
    setTagFontSized(parseFloat(min_input.value), parseFloat(middle_input.value), parseFloat(max_input.value), parseInt(show_min_input.value));
  }
  setTagFontSized(0.7, 1, 2, 0);

  allTagsGetter.getTags(
    function(newtags, service) {
      div.removeChild(tags_container);
      newtags.forEach(
        function(tagdata) {
          var tag = alltags.appendTag(tagdata.name);
          tag.setData(tagdata);
          addClassName(tag.element, service.className);
        });
      if(alltags.tags.length < 100)
        show_min_input.value = 0;
      else if(alltags.tags.length < 200)
      show_min_input.value = 2;
      else if(alltags.tags.length < 300)
      show_min_input.value = 4;
      else if(alltags.tags.length < 400)
      show_min_input.value = 6;
      else if(alltags.tags.length < 500)
      show_min_input.value = 8;
      else if(alltags.tags.length < 1000)
      show_min_input.value = 10;
      else
        show_min_input.value = 12;
      updateTagFontSize();
      div.insertBefore(tags_container, site_info);
      tag_info.alltags_counter.innerHTML = alltags.tags.length + '件';

      var now = new Date();
      function dateToString(date) {
        if(date)
          return date.toJpString() + ' (' + now.toDateSpanString(date) + '前)';
        else if(typeof date == 'undefined')
        return '---';
        else
          return '???';
      }
      var title = '期間: ' + dateToString(service.date_from) + ' 贈ｫ ' + dateToString(service.date_to);
      service.link = $N('a', {href: service.watch_url || service.url, title: title}, service.name);
      service.link_container = $N(
        'span', {'class': '_GM_service_name ' + service.className}, [
          $N('strong', {}, [service.link, ': ']),
          newtags.length + '/' + service.max_tag_length.toJpString() + '件'
        ]);
      service.link_container.addEventListener(
        'mouseover',
        function() {
          addClassName(tags_container, service.className + '_focus');
        }, false);
      service.link_container.addEventListener(
        'mouseout',
        function() {
          removeClassName(tags_container, service.className + '_focus');
        }, false);

      site_info.appendChild(service.link_container);
      site_info.appendChild(document.createTextNode(' '));
    }, function() {
      current_tags.forEach(
        function(tagname) {
          var tag = alltags.appendTag(tagname);
          if(tag != null)
            tag.disabled = true;
        });
    });
}



function loadTagEditForm(param) {
  if(!param) param = "";
  var edit_form = $('tag_edit_form');
  var video_controls = $('video_controls');
  if(!edit_form) {
    edit_form = $N('div', {id: 'tag_edit_form'});
    video_controls.parentNode.insertBefore(edit_form, video_controls.nextSibling);
  }
  video_controls.style.display = 'none';
  edit_form.innerHTML = '<img src="img/watch/tool_loading.gif" alt="処理中">';
  GM_xmlhttpRequest(
    {
      method: 'POST',
      url: request_url,
      data: param,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      onload: function(response) {
        edit_form.innerHTML = response.responseText;
        appendTagsList();
      },
      onerror: function(response) {
        edit_form.style.display = 'none';
        video_controls.style.display = '';
        alert('タグを編集できません');
      }
    });
}

unsafeWindow.startTagEdit = function() {
  setTimeout(loadTagEditForm, 10);
};

unsafeWindow.refreshTagEdit = function(form, loading_container) {
  var tagEditLoadingStatus = unsafeWindow.tagEditLoadingStatus;

  loading_container = $(loading_container);

  var loading_text = '';
  var cmd = $X('descendant::input[@type="hidden"][@name="cmd"]', form, Single);
  if (cmd) {
    cmd = cmd.getValue();
    if (cmd in tagEditLoadingStatus) {
      loading_text = tagEditLoadingStatus[cmd];
    }
  }

  Array.forEach(
    document.getElementById('tag_edit_form').getElementsByTagName('form'),
    function(form) {
      Array.forEach(form.elements, function(elem) { elem.disabled = true; });
    });

  var param = Array.map(
    form.elements,
    function(elem) {
      return encodeURI(elem.name) + "=" + encodeURI(elem.value);
    }).join('&');
  var t = function () { return (new Date()).getTime(); };
  var next = t() + 0xbb8;
  var refresh_timer = setInterval(
    function() {
      var d = next - t();
      if(d > 0) {
        loading_container.innerHTML = loading_text + '　あと ' + Math.ceil(d / 0x3e8) + ' 秒';
      } else {
        clearInterval(refresh_timer);
        setTimeout(function() {
                     allTagsGetter.reset();
                     loadTagEditForm(param);
                   }, 10);
      }
    }, 300);
  return false;
};

// unsafeWindow.startTagEdit();
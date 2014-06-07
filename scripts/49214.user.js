// ==UserScript==
// @name           Hatabu Asin Link Extender
// @revision       1
// @author         blueberrystream a.k.a. KID
// @namespace      http://kid0725.usamimi.info
// @include        http://b.hatena.ne.jp/asin*
// ==/UserScript==

// 読書メーターアイコン
// [JavaScript] dataスキームURI生成（画像データのBase64変換） http://www.kawa.net/works/js/data-scheme/base64.htmlで生成しました
var DOKUSHO_ICON = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACx'+
    'jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADZJREFU'+
    'OE9j/A8EDJQAkAHEAqP1qv+RMdhyYjWD1I00A7D5l6QwGGIGEOtcnGEwagAp2QlTLQBrUeRM+s0m'+
    'rwAAAABJRU5ErkJggg==';
var BKLOG_ICON = 'data:image/x-icon;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAD/////j7mw76r/93u+'+
    '4P+x4DAHAAAAQElEQVQImWXNQQoAIAhE0dFqr52guv8hU0sI+qvHgAhkpJE8OLsA4hnI41ymw2I1'+
    'lNqYemJd8I9hFwHSs8B/ZRscwgOs79jW3wAAAABJRU5ErkJggg==';

/* jQueryを使えるようにする */
// We Ain't Seen Nothin' Yet. : GreasemonkeyスクリプトにjQueryを読み込む汎用スクリプト http://blog.fulltext-search.biz/articles/2008/03/01/jquery-loader-for-greasemonkey
// External jQuery Loader
/** Usage:
var loader = new jQueryLoader(
  { // jQuery Core: required
    name: 'jQuery',
    version: '1.2.3',
    url: 'http://blog.fulltext-search.biz/javascripts/gm/jquery-1.2.3.min.js'
  },
  [
    { // jQuery Plugin: optional
      name: 'reflect',
      version: '1.0', // optional: use '1.0' if undefined
      url: 'http://blog.fulltext-search.biz/javascripts/gm/jquery.reflect.js'
    }
  ]
);
**/
function jQueryLoader() { this.initialize.apply(this, arguments); };
var Util = {
  bind: function() {
    if (arguments.length < 3 && arguments[1] === undefined) return arguments[0];
    var args = Util.toArray(arguments), __method = args.shift(), object = args.shift();
    return function() {
      return __method.apply(object, args.concat(Util.toArray(arguments)));
    }
  },

  toArray: function(iterable) {
    if (!iterable) return [];
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  },

  extend: function(dist, source) {
    for (var property in source) {
      if(dist == source[property]) continue;
      if(source[property] !== undefined) dist[property] = source[property];
    }
    return dist;
  },

  each: function(iteratorable, iterator) {
    if(iteratorable.length === undefined)
      for(var i in iteratorable) iterator.call( iteratorable[i], i, iteratorable[i] );
    else
      for(var i = 0, l = iteratorable.length, val = iteratorable[0];
        i < l && iterator.call(val,i,val) !== false; val = iteratorable[++i] );
  },

  map: function(elems, callback) {
    var ret = [];
    for(var i=0,l=elems.length; i<l; i++) {
      var value = callback(elems[i], i);
      if(value !== null && value != undefined) {
        if(value.constructor != Array) value = [value];
        ret = ret.concat(value);
      }
    }
    return ret;
  },

  parseQueryString: function(str) {
    var memo = str.split('&');
    for(var i=0,obj={},l=memo.length; i<l; i++) {
      var pair = memo[i];
      if((pair = pair.split('='))[0]) {
        var name = decodeURIComponent(pair[0]);
        var value = pair[1] ? decodeURIComponent(pair[1]) :undefined;
        if(obj[name] !== undefined) {
          if(obj[name].constructor != Array) obj[name] = [obj[name]];
          if(value) obj[name].push(value);
        } else {
          var dummy = parseInt(new Number(value), 10);
          obj[name] = isNaN(dummy) ? value : dummy;
        }
      }
    }
    return obj;
  },

  periodicalExecuter: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;
    Util.extend(this, {
      registerCallback: function() {
        this.timer = setInterval(Util.bind(this.onTimerEvent, this), this.frequency * 1000);
      },

      execute: function() {
        this.callback(this);
      },

      stop: function() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
      },

      onTimerEvent: function() {
        if (!this.currentlyExecuting) {
          try {
            this.currentlyExecuting = true;
            this.execute();
          } finally {
            this.currentlyExecuting = false;
          }
        }
      }
    });

    this.registerCallback();
  }
};
jQueryLoader.prototype = {
  cacheName: 'jQuery.Libraries',
  namespace: 'jQueryLoader',

  initialize: function(jquery, plugins) {
    this.jquery = jquery;
    this.plugins = plugins || [];
    this.downloaded = 0;
    this.permanents = eval(GM_getValue(this.cacheName, '({})'));
  },

  load: function(callback) {
    if(typeof callback != 'function') return;
    this.callback = callback;
    this._load(this.jquery);
    Util.each(this.plugins, Util.bind(function(i,lib) { this._load(lib); }, this));
    this.eval();
  },

  _load: function(lib) {
    lib.version = lib.version ? lib.version : '1.0';
    if(!this.permanents[lib.name] || !this.permanents[lib.name].script ||
       this.permanents[lib.name].version &&
       this.compareVersion(this.permanents[lib.name].version, lib.version) < 0) {
      if(!this.permanents[lib.name]) this.permanents[lib.name] = {};
      Util.extend(this.permanents[lib.name], lib);
      var self = this;
      GM_xmlhttpRequest({
        method: 'GET',
        url: this.permanents[lib.name].url,
        onload: function(res) {
          self.permanents[lib.name].script = encodeURI(res.responseText);
          GM_setValue(self.cacheName, self.permanents.toSource());
          self.downloaded++;
        },
        onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
      });
    } else { this.downloaded++; }
  },

  eval: function() {
    if(this.plugins.length + 1 == this.downloaded) {
      this.insert(this.permanents['jQuery'].script);
      if(!unsafeWindow.__jQuery) unsafeWindow.__jQuery = {};
      this.insert("__jQuery['" + this.namespace + "'] = jQuery.noConflict(true);");
      var plugins = Util.map(this.plugins, Util.bind(function(plugin) {
        return this.permanents[plugin.name].script;
      }, this)).join("\n");
      this.insert([
        '(function(jQuery,$) {', plugins, "})(__jQuery['",
        this.namespace, "'],__jQuery['", this.namespace, "']);"
      ].join(''));
      this.wait();
    } else {
      setTimeout(Util.bind(function() { this.eval(); }, this), 10);
    }
  },

  wait: function() {
    if(unsafeWindow.__jQuery && unsafeWindow.__jQuery[this.namespace] &&
       unsafeWindow.__jQuery[this.namespace]().jquery == this.permanents['jQuery'].version) {
      this.callback(unsafeWindow.__jQuery[this.namespace]);
    } else {
      setTimeout(Util.bind(function() { this.wait(); }, this), 10);
    }
  },

  insert: function(script) {
    var lib = document.createElement('script');
    lib.setAttribute('type', 'text/javascript');
    lib.appendChild(document.createTextNode(decodeURI(script)));
    document.getElementsByTagName('head')[0].appendChild(lib);
  },

  compareVersion: function(current, latest) {
    var delta = 0;
    var curr = current.split('.');
    var ltst = latest.split('.');
    for(var i=0, len = curr.length >= ltst.length ? curr.length : ltst.length; i<len; i++) {
      var curr_num = parseInt(curr[i], 10);
      var ltst_num = parseInt(ltst[i], 10);
      if(isNaN(ltst_num) || curr_num > ltst_num) {
        delta = 1;
        break;
      } else if(isNaN(curr_num) || curr_num < ltst_num) {
        delta = -1;
        break;
      }
    }
    return delta;
  }
};

var loader = new jQueryLoader(
  { // jQuery Core: required
    name: 'jQuery',
    version: '1.3.2',
    url: 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js'
  }
);
loader.namespace = 'Amazon Lowest Price Checker jQuery Edition';

loader.load(function($j) {
  // do something with jQuery($j)
  //  (ex.) if(!$j('#WATCHFOOTER').is('*')) return;

/******************************************************************************************************************/
/******************************************************************************************************************/

  $j("th:contains('ASIN:') ~ td").each(function() {
    $j(this).html(
                    $j(this).html()
                  + ' <img class="dokushoIcon" style="border-style: none;">'
                  + '<a href="http://book.akahoshitakuya.com/b/' + $j(this).text() + '" target="dokusho">読書メーターで見る</a>'
                  + ' <img class="bklogIcon" style="border-style: none;">'
                  + '<a href="http://detail.booklog.jp/asin/' + $j(this).text() + '" target="bklog">Booklogで見る</a>'
                 );
  });

  var imgs = document.getElementsByTagName("img");
  for (i = 0; i < imgs.length; i++) {
    if (imgs[i].className == "dokushoIcon") {
      imgs[i].src = DOKUSHO_ICON;
    } else if (imgs[i].className == "bklogIcon") {
      imgs[i].src = BKLOG_ICON;
    } 
  }
});

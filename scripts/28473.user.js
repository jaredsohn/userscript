// ==UserScript==
// @name           AutoPageLoader
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http*
// ==/UserScript==
(function () {
  if (window.name == 'autopagerize_iframe') return;

  const Config = {
    siteinfo_urls: ['http://wedata.net/databases/AutoPagerize/items.json'],
    auto_start: true,
    remain_height: 500,
    local_siteinfo: [{
      name: 'GoogleImages',
      data: {
        pageElement: 'id("ImgContent")',
        url: '^http://images\\.google\\.co\\.jp/images\\?',
        nextLink: '//td[@class="b"]/a',
        exampleUrl: 'http://images.google.co.jp/images?q=hatena'
      }
    }],
    microformats: [{
      name: 'autopagerize',
      data: {
        url: '^https?://',
        nextLink: '(//a | //link)[translate(@rel, "ENTX", "entx")="next"]',
        insertBefore: '//*[contains(concat(" ", @class, " "), " autopagerize_insert_before ")]',
        pageElement: '//*[contains(@class, "autopagerize_page_element")]'
      }
    },
    {
      name: 'hAtom',
      data: {
        url: '^https?://',
        nextLink: '(//a|//link)[contains(concat(" ", normalize-space(translate(@rel, "ENTX", "entx")), " "), " next ")]',
        insertBefore: '//*[contains(concat(" ", @class, " "), " hfeed ")]/following-sibling::node()',
        pageElement: '//*[contains(concat(" ", @class, " "), " hfeed ")]'
      }
    },
    {
      name: 'xFolk',
      data: {
        url: '^https?://',
        pageElement: '//*[contains(concat(" ", @class, " "), " xfolkentry ")]',
        insertBefore: '//*[contains(concat" ", @class, " "), " xfolkentry ")]/following-sibling::node()',
        nextLink: '(//a|//link)[contains(concat(" ", normalize-space(translate(@rel, "ENTX", "entx")), " "), " next ")]'
      }
    }],
    color: {
      on: '#00cc00',
      off: '#cccccc',
      loading: '#0000cc',
      timeout: '#00cccc',
      finish: '#cccc00',
      error: '#cc0000'
     },
     expire: 20 * 60 * 60 * 1000
  }

  var Cache = new Class();
  Cache.reset = function () {
    GM_setValue('cache', '{}');
  }
  Cache.normalize = function () {
    var val = eval(GM_getValue('cache', 'new Object()'));
    for (var i in val) if (Config.siteinfo_urls.indexOf(i) == -1){
      delete val[i];
    }
    GM_setValue('cache', uneval(val));
  }
  Cache.prototype = {
    getCache: function() {
      var now = Date.now();
      if (this._url in this._val &&
          now - this._val[this._url].lastUpdate < Config.expire) {
        this._val[this._url].lastUpdate = now;
        GM_setValue('cache', uneval(this._val));
        this._callback(this._val[this._url].siteinfo);
      }else{
        var callback = bind(
          function (siteinfo) {
            if (siteinfo =='error') return;
            var now = Date.now();
            this._val[this._url] = {siteinfo: siteinfo, lastUpdate: now};
            GM_setValue('cache', uneval(this._val));
            this._callback(siteinfo);
          },this);
        this.request(callback);
      }
    },
    request: function (callback) {
      GM_xmlhttpRequest({
        method: 'get',
        url:this._url,
        onload: function (res) {
          try {
          var info = eval(res.responseText);
          } catch (e) {
          info = 'error';
          }
          callback(info);
        },
        onerror: function () {
          callback('error');
        }
      });
    },
    initalize: function (url, callback) {
    this._val = eval(GM_getValue('cache', 'new Object()'));
    this._url = url;
    this._callback = callback;
    this.getCache();
    }
  }
  var AutoPageLoader = new Class();
  AutoPageLoader.filters = [];
  AutoPageLoader.documentFilters = [];
  AutoPageLoader.prototype = {
    getInfo: function (siteinfo) {
      var info=null;
      for each (var { data: i } in siteinfo)
        if (RegExp(i.url).test(location.href) &&
            $X(i.pageElement, Boolean) &&
            $X(i.nextLink, Boolean)){
          info = i;
          break;
        }
      return info;
    },
    get state() {
      return this._state;
    },
    set state(s) {
      this._state = s;
      Icon.state = s;
      switch (s) {
        case 'finish':
        case 'error':
          {
            setTimeout(bind(function () {
                window.removeEventListener('scroll', this._scroll, false);
                window.removeEventListener('dblclick', this._dblclick, false);
              }, this), 1000);
          break;
          }
        case 'timeout':
          {
            setTimeout(bind(function () {
                this.state = 'on';
              }, this), 1000);
          }
      }
      return s;
    },
    onscroll: function () {
      if (this.state == 'on') {
        var pos = this._insertBefore.getBoundingClientRect().top;
        if (pos - window.innerHeight < Config.remain_height) this.loadNext();
      }
    },
    ondblclick: function () {
      if (this.state == 'on') {
        this.state = 'off';
      }else if (this.state == 'off'){
        this.state = 'on';
      }
    },
    scrollable: function () {
      if (window.scrollMaxY == 0)
        document.documentElement.style.minHeight = window.innerHeight + 1 + 'px';
    },
    loadNext: function (){
      this.state = 'loading';
      iframeRequest(this._nextUrl,
        bind(function (doc) {
          var pageElements = $X(this._info.pageElement, doc)
                             .map(function (elem)
                               document.importNode(elem, true));
          if (pageElements.length == 0) {
            this.state = 'error';
            return;
          }
          this.state = 'on';
          AutoPageLoader.documentFilters.forEach(function (fn) { fn(doc); });
          var navi = document.createElement('div');
          navi.innerHTML = 'page: <a class="autopagerize_link" href"' +
                           this._nextUrl + '">' + (++this._page) + '</a>';
          var df=document.createDocumentFragment();
          [navi].concat(pageElements).forEach(function (elem) {
              df.appendChild(elem);
            });
          this._insertBefore.parentNode.insertBefore(df, this._insertBefore);
          AutoPageLoader.filters.forEach(function (fn) { fn(pageElements); });
          this._insertBefore = nextElement(pageElements.pop());
          var nElem = $X(this._info.nextLink, doc).shift();
          if (nElem == null) {
            this.state = 'finish';
            return;
          }
          this._nextUrl = nElem.href;
        }, this),
        3000,
        bind(function () {
            this.state = 'timeout';
        }, this));
    },
    initalize: function (cache) {
      this._info = this.getInfo(cache);
      if (this._info == null) return null;
      Icon.add();
      this.state = Config.auto_start ? 'on': 'off';
      this._page = 1;
      this._insertBefore = this._info.insertBefore ?
                            $X(this._info.insertBefore).pop() :
                            nextElement($X(this._info.pageElement).pop());
      this._nextUrl = $X(this._info.nextLink).shift().href;
      window.addEventListener('scroll',
                              this._scroll = bind(this.onscroll, this),
                              false);
      window.addEventListener('dblclick',
                              this._dblclick = bind(this.ondblclick, this),
                              false);
      this.scrollable();
      return this;
    }
  }
  var Icon = {
    get state (s) {
      return this._state;
    },
    set state (s) {
      this._state = s;
      this._icon.style.backgroundColor = Config.color[s];
      switch (s) {
        case 'finish':
        case 'error':
          {
            setTimeout(bind(function () {
                if (this._icon.parentNode)
                  this._icon.parentNode.removeChild(this._icon);
              }, this), 1000);
            break;
          }
        case 'timeout':
          {
            setTimeout(bind(function () {
                this.state = 'on';
              }, this), 1000);
            break;
          }
      }
      return s;
    },
    add: function () {
      if (document.getElementById('autopagerize_icon')) return;
      var div = document.body.appendChild(document.createElement('div'));
      var s = div.style;
      this._icon = div;
      div.id = 'autopagerize_icon';
      s.width = '10px';
      s.height = '10px';
      s.position = 'fixed';
      s.zIndex = '9999';
      s.top = '5px';
      s.right = '5px';
    }
  }

  void (function init () {
    [Config.local_siteinfo, Config.microformats]
      .some(function (siteinfo) new AutoPageLoader(siteinfo)) &&
    Config.siteinfo_urls.some(function (url) new Cache(url, function (siteinfo) new AutoPageLoader(siteinfo)));
    Cache.normalize();
    window.AutoPagerize = {
      addFilter: function (fn) {
        AutoPageLoader.filters.push(fn);
      },
      addDocumentFilter: function (fn) {
        AutoPageLoader.documentFilters.push(fn);
      }
    }
    GM_registerMenuCommand('AutoPageLoader - clear cache', Cache.reset);
  })();

  function Class ()
    function ()
      this.initalize.apply(this, arguments);

  function iframeRequest(url, callback, timeout, timeoutCallback) {
    var iframe = document.body.appendChild(
                   document.createElement('iframe'));
    iframe.name = 'autopagerize_iframe';
    iframe.src = url;
    iframe.style.display = 'none';
    var loaded = false;
    var onDOMContentLoaded = function () {
      loaded = true;
      callback(iframe.contentDocument);
      iframe.parentNode.removeChild(iframe);
    }
    iframe.contentWindow.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
    if (typeof timeout == 'undefined') return;
    setTimeout(function () {
        if (loaded) return;
        timeoutCallback();
        iframe.contentWindow.removeEventListener('DOMContentLoaded', onDOMContentLoaded, false);
        iframe.parentNode.removeChild(iframe);
      }, timeout);
    
  }

  function bind(fn, thisObj)
    function ()
      fn.apply(thisObj, arguments);

  function nextElement(elem)
    $X('./following::*', elem).shift();

  function $X (exp, context, type /* want type */) {
    if (typeof context == "function") {
      type    = context;
      context = null;
    }
    if (!context) context = document;
    var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
      var ns = { "atom" : "http://purl.org/atom/ns#" };
      return document.createNSResolver((context.ownerDocument == null ? context
                                                                      : context.ownerDocument).documentElement)
                     .lookupNamespaceURI(prefix) || ns[prefix] || document.documentElement.namespaceURI;
    });
  
    switch (type) {
      case String:
        return exp.evaluate(
          context,
          XPathResult.STRING_TYPE,
          null
        ).stringValue;
      case Number:
        return exp.evaluate(
          context,
          XPathResult.NUMBER_TYPE,
          null
        ).numberValue;
      case Boolean:
        return exp.evaluate(
          context,
          XPathResult.BOOLEAN_TYPE,
          null
        ).booleanValue;
      case Array:
        var result = exp.evaluate(
          context,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len; i++) {
          ret.push(result.snapshotItem(i));
        }
        return ret;
      case undefined:
        var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
          case XPathResult.STRING_TYPE : return result.stringValue;
          case XPathResult.NUMBER_TYPE : return result.numberValue;
          case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
          case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            // not ensure the order.
            var ret = [];
            var i = null;
            while (i = result.iterateNext()) {
              ret.push(i);
            }
            return ret;
          }
        }
        return null;
      default:
        throw(TypeError("$X: specified type is not valid type."));
    }
  }
})();

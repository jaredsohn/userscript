// ==UserScript==
// @name        Google Reader Full Feed + autoload
// @namespace   tag:mattn.jp@gmail.com,2008-02-25:/coderepos.org
// @include     http://www.google.co.jp/reader/*
// @include     https://www.google.co.jp/reader/*
// @include     http://www.google.com/reader/*
// @include     https://www.google.com/reader/*
// @description loading full entry on Google Reader Tomykaira changed.
// @privilege   false
// @version     0.1.1
// ==/UserScript==
// based on LDR Full Feed <http://d.hatena.ne.jp/toshi123>
//
// author: mattn <mattn.jp@gmail.com>

(function(w) {
// == [CSS] =========================================================
const CSS = <><![CDATA[
  .gm_fullfeed_loading, .gm_fullfeed_loading a { color : green !important; }
  .gm_fullfeed_loading .item_body a { color : palegreen !important; }
  .gm_fullfeed_loading { background-color : Honeydew !important; }
]]></>.toString();

// == [Icon] ========================================================
const ICON = <><!-- http://api.feed-media.com/img/getcontentsmark.gif
--><![CDATA[data:image/gif;base64,
R0lGODdhEwATAPMAMf+MAP+lAP+lOv+0AP+0kP/EAP/Etv/TOv/hZv/x2//x////tv//2////wAA
AAAAACwAAAAAEwATAAAETBDISWsNOOuNJf+aB4LiyJUZ0awNsqGB0RSYkAwhoAnKYaIEBm4EXJgC
QGFA1VBmUDwfJjjs6DQy2tJp5TBX0uf1mCO/xmYk2mxptyMAOw==
]]></>.toString().replace(/\s+/g, "");
const ICON2 = <><!-- (c) id:Constellation --><![CDATA[data:image/gif;base64,
R0lGODdhEwATAPQAMUFp4YfO64fO7ofW9Yfe+LHO68XW68X3/MX3/9ne6+zn7uz/+Oz//Oz////v
8v///P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAA
EwATAAAFUCAgjmRZBmiqrqjIvqoLw/LM1unQQLyz4gECJIESHAwxgEqAUNhwAwZyBl0UnsqcNKCD
PKatbLGpBQeAQiJ3mwJydzxn0vZy0+1Y+s3EN4UAADs=
]]></>.toString().replace(/\s+/g, "");

// == [Config] ======================================================

const KEY = 'g';//<-これなんにつかってんだろ 実は"z"
const ADCHECKER = /^(?:AD|PR):/;
const LOADING_MOTION = true;
const REMOVE_SCRIPT = true;
const REMOVE_H2TAG = false;
const OPEN = false; //SITEINFOになかった場合にそのエントリを開くかどうか。
const WIDGET = true;
const SITEINFO_IMPORT_URLS = [
  'http://constellation.jottit.com/siteinfo',
];

// == [SITE_INFO] ===================================================

const SITE_INFO = [
{url: "^http://gigazine\.net/",
xpath: 'id("maincol")/div[@class="content"]/child::node()[not(@class="title") and not(@class="posted") and not(@class="center")]',
base: "http://gigazine.net"
},
];

// == [Application] =================================================
var interval;
var AUTO_FETCH = true;
var switchAutoFetch = function() {
  if(AUTO_FETCH == true){
    AUTO_FETCH=false;
    message('する→しない');
    clearInterval(interval);
  } else {
    AUTO_FETCH=true;
    message('しない→する');
    interval = window.setInterval(
       function() {
			var c = new getCurrentItem();
			if(!w.hasClass(c.item_container, 'gm_fullfeed_loaded')){
                init();
            }
        },
        500
    );
  }
}

var FullFeed = function(info, c) {
  this.itemInfo = c;
  this.info = info;
  this.requestURL = this.itemInfo.itemURL;
  var bodyXPath = 'id("current-entry")//ins/div';
  this.itemInfo.item_body = getFirstElementByXPath(bodyXPath);
  this.state = 'wait';

  if (this.info.enc) {
    this.mime = 'text/html; charset=' + this.info.enc;
  } else {
    this.mime = 'text/html; charset=' + document.characterSet;
  }


  this.request();
};

FullFeed.prototype.request = function() {
  if (!this.requestURL) {
    return
  }
  this.state = 'request';
  var self = this;
  var opt = {
    method: 'get',
    url: this.requestURL,
    overrideMimeType: this.mime,
    headers: {
      "User-Agent": navigator.userAgent + " Greasemonkey (Google Reader Full Feed)"
    },
    onerror: function() {
      self.requestError.apply(self, ['Request Error'])
    },
    onload: function(res) {
      self.requestLoad.apply(self, [res])
    }
  };
  message('Loading Full Feed...');
  w.toggleClass(this.itemInfo.item_container, 'gm_fullfeed_loading');
  if (opt.url.indexOf("http:") != 0) {
    opt.url = pathToURL(this.info.base, opt.url);
  }
  window.setTimeout(GM_xmlhttpRequest, 0, opt);
};

FullFeed.prototype.requestLoad = function(res) {
  this.state = 'loading';
  var text = res.responseText;

  text = text.replace(/(<[^>]+?[\s"'])on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi,
    "$1");
  if (REMOVE_SCRIPT) text = text.replace(/<script[^>]*>[\S\s]*?<\/script\s*>/gi, "");
  if (REMOVE_H2TAG)  text = text.replace(/<h2[^>]*>[\S\s]*?<\/h2\s*>/gi, "");
  var htmldoc = parseHTML(text);
  removeXSSRisks(htmldoc);
  if (this.info.base && !this.itemInfo.itemURL.match(this.info.base)) {
    relativeToAbsolutePath(htmldoc, this.info.base);
  } else {
    relativeToAbsolutePath(htmldoc, this.itemInfo.itemURL);
  }
  for (var i = 0, l = FullFeed.documentFilters.length; i < l;
    FullFeed.documentFilters[i++](htmldoc, this.itemInfo.itemURL, this.info));
  try {
    var entry = getElementsByXPath(this.info.xpath, htmldoc);
  } catch (e) {
    message(e);
    return;
  }

  if (entry) {
    this.removeEntry();
    entry = this.addEntry(entry);
    for (var i = 0, l = FullFeed.filters.length; i < l;
      FullFeed.filters[i++](entry));
    this.requestEnd();
  } else {
    this.requestError('This SITE_INFO is unmatched to this entry');
  }

  if (this.info.base) {
    w.addClass(this.itemInfo.item_container, this.info.base);
  } else {
    w.addClass(this.itemInfo.item_container, this.itemInfo.itemURL);
  }
};

FullFeed.prototype.requestEnd = function() {
  this.state = 'loaded';
  message('Loading Full Feed... Done');
  w.toggleClass(this.itemInfo.item_container, 'gm_fullfeed_loading');
  w.addClass(this.itemInfo.item_container, 'gm_fullfeed_loaded');
};

FullFeed.prototype.requestError = function(e) {
  this.state = 'error';
  message('Error : ' + e);
  w.toggleClass(this.itemInfo.item_container, 'gm_fullfeed_loading');
  w.addClass(this.itemInfo.item_container, 'gm_fullfeed_error');
};

FullFeed.prototype.removeEntry = function() {
  while (this.itemInfo.item_body.firstChild) {
    this.itemInfo.item_body.removeChild(this.itemInfo.item_body.firstChild);
  }
};

FullFeed.prototype.addEntry = function(entry) {
  var self = this;
  return entry.map(function(i) {
    var pe = document.importNode(i, true);
    self.itemInfo.item_body.appendChild(pe);
    return pe;
  });
};

FullFeed.parser = function(text) {
  var lines = text.split(/\r?\n|\r/);
  var reg = /^([^:]+):(.*)$/;
  var trimspace = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  var info = {};
  for (var i = lines.length; i > 0; ) {
    if (reg.test(lines[--i])) {
      info[RegExp.$1] = trimspace(RegExp.$2);
    }
  }
  var isValid = function(info) {
    var infoProp = ['url', 'xpath'];
    for (var i = infoProp.length; i > 0; ) {
      if (!info[infoProp[--i]]) {
        return false;
      }
    }
    try {
      new RegExp(info.url);
    } catch (e) {
      return false;
    }
    return true;
  };
  return isValid(info) ? info : null;
};

FullFeed.resetCache = function() {
  message('Resetting cache. Please wait...');
  SITEINFO_IMPORT_URLS.forEach(function(l) {
    var opt = {
      method: 'get',
      url: l,
      headers: {
        "User-Agent": navigator.userAgent + " Greasemonkey (Google Reader Full Feed)"
      },
      onload: function(res) {
        FullFeed.setCache(res, l);
      },
      onerror: function(res) {
        message('Cache Request Error');
      }
    };
    window.setTimeout(GM_xmlhttpRequest, 0, opt);
  });
};

FullFeed.setCache = function(res, url) {
  var info = [];
  var doc = parseHTML(res.responseText);
  var lists = getElementsByXPath(
      '//textarea[@class="ldrfullfeed_data"]', doc);
  lists.forEach(function(list) {
    var data = FullFeed.parser(list.value);
    if (data) {
      info.push(data);
    }
  });
  if (info.length > 0) {
    cacheInfo[url] = {
      url: url,
      info: info
    };
    GM_setValue('cache', cacheInfo.toSource());
    if (WIDGET) FullFeed.createPattern();
    message('Resetting cache. Please wait... Done');
  }
};


FullFeed.getCache = function(key, oDefault) {
  return eval(GM_getValue(key || 'cache', oDefault || "({})"));
};

FullFeed.createPattern = function() {
  if (!WIDGET) return;
  var exps = [];
  for (var i = 0, l = SITE_INFO.length; i < l; exps.push(SITE_INFO[i++].url));
  for (var url in cacheInfo) {
    var site = cacheInfo[url];
    for (var i = 0, l = site.info.length; i < l; exps.push(site.info[i++].url));
  }
  pattern = exps.join('|');
};

FullFeed.registerWidgets = function() {
  if (!WIDGET) return;
  var container = getFirstElementByXPath('id("current-entry")//a[contains(concat(" ",normalize-space(@class)," ")," entry-title-link ")]').parentNode;
  if (!container) return;

  FullFeed.createPattern();
  var description = "\u5168\u6587\u53d6\u5f97\u3067\u304d\u308b\u3088\uff01";

  var c = new getCurrentItem();
  var item = c.item;
  var feed = c.feed;
  if (item.link.match(pattern) || feed.channel.link.match(pattern)) {
    icon = document.createElement('span');
    icon.title = description;
    icon.innerHTML = '<img src="'+ICON+'">';
    w.addClass(icon, 'gm_fullfeed_checked');
    container.appendChild(document.createTextNode(' '));
    container.appendChild(icon);
  }
};

FullFeed.documentFilters = [
// addTargetAttr
(function(doc) {
  var anchors = getElementsByXPath('descendant-or-self::a', doc);
  if (anchors) {
    anchors.forEach(function(i) {
      i.target = '_blank';
    });
  }
}),
];

FullFeed.filters = [];

window.FullFeed = {};

window.FullFeed.addDocumentFilter = function(f) {
  FullFeed.documentFilters.push(f);
};

window.FullFeed.addFilter = function(f) {
  FullFeed.filters.push(f);
};

w.get_active_item = function(flag) {
  var item = {};
  var exp = 'id("current-entry")//a[contains(concat(" ",normalize-space(@class)," ")," entry-title-link ")]';
  try {
    item.link =  getFirstElementByXPath(exp).href;
    item.title = getFirstElementByXPath(exp).textContent;
  } catch (e) {}
  return item;
};

w.get_active_feed = function() {
  var feed = {};
  feed.channel = {};
  try {
    feed.channel.link = decodeURIComponent(getFirstElementByXPath('id("current-entry")//a[contains(concat(" ",normalize-space(@class)," ")," entry-source-title ")]').href.replace(/^.*\/(?=http)/, ''));
  } catch (e) {}
  return feed;
};

var hasClass = w.hasClass = function(element, classname) {
  var cl = element.className;
  var cls = cl.split(/\s+/);
  return cls.indexOf(classname) != -1;
};

var toggleClass = w.toggleClass = function(element, classname) {
  hasClass(element, classname) ? removeClass(element, classname) : addClass(element, classname);
};

var removeClass = w.removeClass = function(element, classname) {
  var cl = element.className;
  var cls = cl.split(/\s+/);
  element.className = cls.remove(classname).join(" ");
};

var addClass = w.addClass = function(element, classname) {
  var cl = element.className;
  if (!contain(cl, classname)) {
    element.className += " " + classname;
  }
};

var contain = w.contain = function(self, other) {
  if (isString(self) && isString(other)) {
    return self.indexOf(other) != -1;
  }
  if (isRegExp(other)) {
    return other.test(self);
  }
};

var isString = w.isString = function(obj) {
  return typeof obj == "string" || obj instanceof String;
};

var isRegExp = w.isRegExp = function(obj) {
  return obj instanceof RegExp;
};

Array.prototype.remove = function(to_remove) {
  return this.filter(function(val) { return val != to_remove; });
};

// itemの情報を格納するobjectのconstructor
var getCurrentItem = function() {
  this.item = w.get_active_item(true);
  this.feed = w.get_active_feed();
  this.itemURL = this.item.link;
  this.feedURL = this.feed.channel.link;
  this.id = this.item.id;
  this.item_container = getFirstElementByXPath('id("current-entry")//ins/div');
  this.title = this.item.title;
  this.find = false;
};

var launchFullFeed = function(list, c) {
  if (!list) return;
  for (var i = 0, l = list.length; i < l; i++) {
    var reg = new RegExp(list[i].url);
    if (reg.test(c.itemURL) || reg.test(c.feedURL)) {
      c.find = true;
      var ff = new FullFeed(list[i], c);
      break;
    }
  }
};

var init = function() {
  var c = new getCurrentItem();
  if (!c.title) return;
  if (ADCHECKER.test(c.title)) {
    return message('This entry is advertisement');
  }
  if (w.hasClass(c.item_container, 'gm_fullfeed_loaded')) {
    return message('This entry has been already loaded.');
  }

  launchFullFeed(SITE_INFO, c);

  if (!c.find) {
    for (var i = 0, l = SITEINFO_IMPORT_URLS.length; i < l && !c.find;
      launchFullFeed(cacheInfo[SITEINFO_IMPORT_URLS[i++]].info, c));
  }

  if (!c.find) {
    message('This entry is not listed on SITE_INFO');
    if (OPEN) window.open(c.itemURL) || message('Cannot popup');
  }
};

var cacheInfo = FullFeed.getCache();
var pattern;

GM_registerMenuCommand('Google Reader Full Feed - reset cache', FullFeed.resetCache);
GM_registerMenuCommand('フィード自動読み切り替え - feed autoread switch',switchAutoFetch);

if (LOADING_MOTION) addStyle(CSS, 'gm_fullfeed');

document.addEventListener('keyup', function(e) {
  if (e.keyCode == w.KeyEvent.DOM_VK_Z) {
    if (e.shiftKey)
      FullFeed.resetCache();
    else if(e.ctrlKey)
      switchAutoFetch();
    else
      init();
  }
}, false);

var timer = setTimeout(function() {
  if (timer) clearTimeout(timer);
  try {
    var container = getFirstElementByXPath('id("current-entry")//a[contains(concat(" ",normalize-space(@class)," ")," entry-title-link ")]');
    var icon = getFirstElementByXPath('id("current-entry")//span[contains(concat(" ",normalize-space(@class)," ")," gm_fullfeed_checked ")]');
    if (container && !icon) {
      FullFeed.registerWidgets();
    }
  } catch (e) {}
  timer = setTimeout(arguments.callee, 200);
});

// == [Utility] =====================================================
function removeXSSRisks(htmldoc) {
  var attr = "allowScriptAccess";

  Array.forEach(htmldoc.getElementsByTagName("embed"), function(embed) {
    embed.hasAttribute(attr) && embed.setAttribute(attr, "never");
  });
  Array.forEach(htmldoc.getElementsByTagName("param"), function(param) {
    param.getAttribute("name") == attr && param.setAttribute("value", "never");
  });
}

function relativeToAbsolutePath(htmldoc, base) {
  var top = base.match("^https?://[^/]+")[0];
  var current = base.replace(/\/[^\/]+$/, '/');

  Array.forEach(htmldoc.getElementsByTagName("a"), function(a) {
    if (a.getAttribute("href"))
      a.href = _rel2abs(a.getAttribute("href"), top, current);
  });
  Array.forEach(htmldoc.getElementsByTagName("img"), function(img) {
    if (img.getAttribute("src"))
      img.src = _rel2abs(img.getAttribute("src"), top, current);
  });
}

function _rel2abs(url, top, current) {
  if (url.match("^https?://")) {
    return url;
  } else if (url.indexOf("/") == 0) {
    return top + url;
  } else {
    return current + url;
  }
}

// copied from FLASH KEY (c) id:brazil
// http://userscripts.org/scripts/show/11996
// slightly modified.
var FlashMessage = new function() {
  addStyle(<><![CDATA[
    #FLASH_MESSAGE {
      position : fixed;
      font-size : 200%;
      z-index : 10000;

      padding : 20px 50px 20px 50px;
      left : 1em;
      top : 1em;

      background-color : #444;
      color : #FFF;
      -moz-border-radius: 0.3em;
      min-width : 1em;
      text-align : center;
    }
  ]]></>.toString()
        .replace(/^\ {4}/gm, ""));
  var opacity = 0.9;
  var flash = document.createElement('div');
  flash.id = 'FLASH_MESSAGE';
  hide(flash);
  document.documentElement.appendChild(flash);
  var canceler;
  this.showFlashMessageWindow = function(string, duration) {
    duration = duration || 400;
    canceler && canceler();
    flash.innerHTML = string;
    flash.style.MozOpacity = opacity;
    show(flash);

    canceler = callLater(function() {
      canceler = tween(function(value) {
        flash.style.MozOpacity = opacity * (1 - value);
      }, 100, 5);
    }, duration);
  };

  // ----[Utility]-------------------------------------------------
  function callLater(callback, interval) {
    var timeoutId = setTimeout(callback, interval);
    return function() {
      clearTimeout(timeoutId);
    };
  }
  function tween(callback, span, count) {
    count = count || 20;
    var interval = span / count;
    var value = 0;
    var calls = 0;
    var intervalId = setInterval(function() {
      callback(calls / count);

      if (count == calls) {
        canceler();
        return;
      }
      calls++;
    }, interval);
    var canceler = function() {
      clearInterval(intervalId);
      hide(flash);
    };
    return canceler;
  }
  function hide(target) {
    target.style.display = 'none';
  }
  function show(target, style) {
    target.style.display = style || '';
  }
};

function message(mes) {
  //w.message(""); w.message(mes);
  //console.log(mes);
  FlashMessage.showFlashMessageWindow("");
  FlashMessage.showFlashMessageWindow(mes, 1000);
}

// copied from AutoPagerize (c) id:swdyh
function getElementsByXPath(xpath, node) {
  var node = node || document;
  var nodesSnapshot = (node.ownerDocument || node).
    evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var data = []
  for (var i = 0, l = nodesSnapshot.snapshotLength; i < l;
    data.push(nodesSnapshot.snapshotItem(i++)));
  return data.length > 0 ? data : null;
}

function getFirstElementByXPath(xpath, node) {
  var node = node || document;
  var result = (node.ownerDocument || node).
    evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return result.singleNodeValue ? result.singleNodeValue : null;
}

if (AUTO_FETCH) {
	message('Auto_Fetch:ON');
    interval = window.setInterval(
       function() {
			var c = new getCurrentItem();
			if(!w.hasClass(c.item_container, 'gm_fullfeed_loaded')){
                init();
            }
        },
        500
    );
}

// copied from Pagerization (c) id:ofk
function parseHTML(str) {
  str = str.replace(/^[\s\S]*?<html[^>]*>|<\/html\s*>[\s\S]*$/ig, '');
  var res = document.implementation.createDocument(null, 'html', null);
  var range = document.createRange();
  range.setStartAfter(document.body);
  res.documentElement.appendChild(
    res.importNode(range.createContextualFragment(str), true)
  );
  return res;
}

function pathToURL(url, path) {
  var re = path.indexOf("/") == 0
         ? /^([a-zA-Z]+:\/\/[^\/]+)\/.*$/
         : /^(.*\/).*$/;
  return url.replace(re, "$1" + path);
}

// copied from LDRize (c) id:snj14
function addStyle(css, id) { // GM_addStyle is slow
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'data:text/css,' + escape(css);
  document.documentElement.appendChild(link);
}

})(this.unsafeWindow || this);

// ==UserScript==
// @name        Hatena::RSS Read More Supporter
// @namespace   http://d.hatena.ne.jp/Yuichirou/
// @description You can "read more" any blogs in Hatena::RSS!
// @include     http://r.hatena.ne.jp/*/
// @include     http://r.hatena.ne.jp/*/*/*
// @exclude     http://r.hatena.ne.jp/append/*
// @exclude     http://r.hatena.ne.jp/feed/*
// @exclude     http://r.hatena.ne.jp/*/?mode=*table
// @privilege   false
// @version     1.2.1
// ==/UserScript==

if (!document.getElementById("hatena-rss-normal")) return;

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;

// == [CSS] =========================================================
GM_addStyle([
'.gm_readmore_loading {',
'  background-color : #F0FFF0 !important;',
'  color : #008000 !important;',
'}',
'.gm_readmore_loading a {',
'  color : #90EE90 !important;',
'}',
].join(''));

// == [Config] =======================================================

var KEY = 'g';
var GET_SITEINFO_KEY = 'G';
var GET_ALL = true;
var GET_ALL_KEY = 't';
var ADCHECKER = /^AD:|^PR:/;
var REMOVE_SCRIPT = true;
var REMOVE_H2TAG = false;
var CACHE_EXPIRE = 24 * 60 * 60 * 1000;
var READ_MORE_TEXT = "\u5B8C\u74A7\u306B\u8AAD\u3080";
var SITEINFO_IMPORT_URLS = [
    'http://constellation.jottit.com/siteinfo',
];

// == [SITE_INFO] ====================================================

var SITE_INFO = [
  /* sample
  {
    url:   '^http://(feeds\.)?japan\.cnet\.com/',
    xpath: '//div[contains(@class,"leaf_body")]',
    enc:   'Shift_JIS',
    base:  'http://japan.cnet.com',
  },
  */
];

// == [Application] ==================================================
var ReadMore = function (info, entry) {
  this.info = info;
  this.entry = entry;
  this.eid = entry.id.match(/^entry-(\d+)$/)[1];
  this.requestURL = entry.getElementsByTagName("a")[0].href;
  this.isLoaded = false;

  this.createButton();
}
ReadMore.prototype = {
  createButton: function () {
    this.Dbutton = document.getElementById("readmore" + this.eid);

    if (!this.Dbutton) {
      this.Dbutton = {}; // dummy

      var contentbody = $X('.//div[@class="content-body"]', this.entry)[0];
      if (!contentbody) {
        var contentfooter = $X('.//div[@class="content-footer"]', this.entry)[0];
        if (!contentfooter) {
          var itemBody = document.createElement("div");
          itemBody.className = "item-body";
          itemBody.appendChild(document.createElement("div")).className = "summary";

          var content = itemBody.appendChild(document.createElement("div"));
          content.className = "content";

          var contentfooter = content.appendChild(document.createElement("div"));
          contentfooter.className = "content-footer";

          this.entry.insertBefore(itemBody, this.entry.getElementsByTagName("form")[0]);
        } else {
          var content = contentfooter.parentNode;
        }

        var contentbody = document.createElement("div");
        contentbody.id = "contentbody" + this.eid;
        contentbody.className = "content-body";
        contentbody.style.display = "none";

        content.insertBefore(contentbody, contentfooter);
      } else {
        var content = contentbody.parentNode;
        this.isAlwaysReadMore = true;
      }

      var contentbutton = document.createElement("div");
      contentbutton.className = "content-button";

      content.insertBefore(contentbutton, contentbody);
    } else {
      this.Dbutton.addEventListener("click", function () {
        self.Nbutton.innerHTML = READ_MORE_TEXT;
      }, true);

      var contentbutton = this.Dbutton.parentNode;
    }

    this.Nbutton = contentbutton.appendChild(document.createElement("button"));
    this.Nbutton.title = this.info.url;
    this.Nbutton.innerHTML = READ_MORE_TEXT;

    this.contentbody = w.document.getElementById("contentbody" + this.eid);

    var self = this;
    this.Nbutton.addEventListener("click", function () {
      self.toggleContent.call(self);
    }, false);
  },

  toggleContent: function () {
    if (this.Nbutton.innerHTML == READ_MORE_TEXT) {
      if (this.Nbutton.disabled || this.Dbutton.disabled) return;

      this.Dbutton.innerHTML = '\u3082\u3063\u3068\u8AAD\u3080';
      if (this.contentbody.innerHTML != "") {
        this.contentbody.content = this.contentbody.innerHTML;
      }
      if (!this.isLoaded) {
        this.Dbutton.disabled = true;
        this.request();
      } else {
        this.contentbody.style.display = "block";
        this.replaceEntry();
        this.Nbutton.innerHTML = '\u623B\u3059';
      }
    } else {
      if (this.isAlwaysReadMore) {
        this.contentbody.innerHTML = this.contentbody.content;
      } else {
        this.contentbody.style.display = "none";
        this.contentbody.innerHTML = '';
      }
      this.Nbutton.innerHTML = READ_MORE_TEXT;
    }
  },

  request: function () {
    if (this.contentbody.style.display != "block") {
      this.contentbody.style.display = "block";
      this.contentbody.innerHTML = '<div style="text-align:center;font-size:90%">' +
                                   '\u8AAD\u307F\u8FBC\u307F\u4E2D</div>';
    }
    this.contentbody.className = "content-body gm_readmore_loading";
    this.Nbutton.disabled = true;

    var self = this;
    var opt = {
      method: "GET",
      url: pathToURL(this.info.base, this.requestURL),
      headers: {
        "User-Agent": navigator.userAgent + " Greasemonkey (Hatena::RSS Read More Supporter)"
      },
      onload: function (res) { self.requestLoad.call(self, res); },
      onerror: function (res) { self.requestError.call(self, "HTTP request error"); }
    };
    if (this.info.enc) {
      opt["overrideMimeType"] = "text/html; charset=" + this.info.enc;
    }

    setTimeout(function(){ GM_xmlhttpRequest(opt); }, 0);
  },

  requestLoad: function (res) {
    this.Nbutton.disabled = false;

    try {
      var htmldoc = parseHTML(res.responseText);
    } catch(e) {
      this.requestError("HTML parse error");
      return;
    }

    removeXSSRisk(htmldoc);
    if (REMOVE_SCRIPT) {
      $X('//script', htmldoc).forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    }
    if (REMOVE_H2TAG) {
      $X('//h2', htmldoc).forEach(function (node) {
        node.parentNode.removeChild(node);
      });
    }
    if (this.info.base && this.requestURL.indexOf(this.info.base) == -1){
       relativeToAbsolutePath(htmldoc, this.info.base);
    } else {
       relativeToAbsolutePath(htmldoc, this.requestURL);
    }

    var self = this;
    ReadMore.documentFilters.forEach(function (filter) {
      filter(htmldoc, self.requestURL, self.info);
    });

    try {
      this.entry = $X(this.info.xpath, htmldoc, Array);
    } catch(e) {
      this.requestError("XPath error");
      return;
    }

    if (this.entry.length > 0) {
      this.replaceEntry();
      this.requestEnd();
    } else {
      this.requestError("SITE_INFO error");
      return;
    }
  },

  requestEnd: function () {
    this.isLoaded = true;
    this.contentbody.className = "content-body";
    this.Nbutton.innerHTML = '\u623B\u3059';
    this.Dbutton.disabled = false;
  },

  requestError: function (e) {
    if (this.contentbody.innerHTML != "") {
      this.contentbody.content = this.contentbody.innerHTML;
    }
    this.contentbody.innerHTML = '<div style="text-align:center;font-size:90%">' +
                                 e + '</div>';
    this.Dbutton.disabled = false;
  },

  replaceEntry: function () {
    var contentbody = this.contentbody;
    contentbody.innerHTML = "";
    var entry = this.entry.map(function (i) {
        var pe = document.importNode(i, true);
        contentbody.appendChild(pe);
        return pe;
    });
    ReadMore.filters.forEach(function (filter) {
      filter(entry);
    });
  }
};

// -- cache --------------------------------------
ReadMore.parser = function (text) {
  function trimspace (str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  function isValid (info) {
    var infoProp = ['url', 'xpath'];
    return infoProp.every(function (prop) {
      return (prop in info);
    });
  }

  var info = {};
  var lines = text.split(/\r\n|[\r\n]/);
  var reg = /(^[^:]*?):(.*)$/;
  lines.forEach(function (line) {
    var re = line.match(reg);
    if (re) info[re[1]] = trimspace(re[2]);
  });
  return isValid(info) ? info : null;
}
ReadMore.resetCache = function () {
  SITEINFO_IMPORT_URLS.forEach(function(url) {
    var opt = {
      method: "GET",
      headers: {
        "User-Agent": navigator.userAgent + " Greasemonkey (Hatena::RSS Read More Supporter)"
      },
      url: url,
      onload: function (res) { ReadMore.setCache(res, url); }
    };
    setTimeout(function(){ GM_xmlhttpRequest(opt); }, 0);
  });
}
ReadMore.setCache = function (res, url) {
  var info = [];
  var doc = parseHTML(res.responseText);
  var lists = $X('//textarea[@class="ldrfullfeed_data"]', doc, Array);
  lists.forEach(function (list) {
    var data = ReadMore.parser(list.value);
    if (data) info.push(data);
  });
  if (info.length > 0) {
    cacheInfo[url] = {
      url: url,
      info: info,
      expire: Date.now() + CACHE_EXPIRE
    };
    GM_setValue('cache', cacheInfo.toSource());
  }
}
ReadMore.getCache = function () {
  return eval(GM_getValue('cache')) || {};
}

// -- filter -------------------------------------
ReadMore.documentFilters = [];
ReadMore.filters = [];

if (typeof window.ReadMore == 'undefined') {
  window.ReadMore = {
    addDocumentFilter: function (f) { ReadMore.documentFilters.push(f); },
    addFilter:         function (f) { ReadMore.filters.push(f);         }
  };
}
if (typeof window.FullFeed == 'undefined') window.FullFeed = window.ReadMore;

// -- launch -------------------------------------
function launchReadMore(list, entry) {
  if (list) {
    var itemURL = entry.getElementsByTagName("a")[0].href;
    var feedURL = $X('.//a[@class="r_entry"]', entry)[0].href.match(/\/feed\/(.+)/)[1];

    for (var i = 0; i < list.length; i++) {
      if (itemURL.search(list[i].url) >= 0 || feedURL.search(list[i].url) >= 0) {
        return new ReadMore(list[i], entry);
      }
    }
  }
  return null;
}

// -- execute ------------------------------------
var cacheInfo = ReadMore.getCache();
GM_registerMenuCommand('Hatena::RSS Read More Supporter - reset cache', ReadMore.resetCache);
w.Navigation.addKeybind(GET_SITEINFO_KEY, ReadMore.resetCache);

var rms = {};
$X('id("main-body")/div').forEach(function (entry) {
  setTimeout(function () {
    var title = entry.getElementsByTagName("a")[0].href;
    if (ADCHECKER.test(title)) return;

    var rm = launchReadMore(SITE_INFO, entry);
    if (!rm) {
      var ci;
      for (var i = 0; i < SITEINFO_IMPORT_URLS.length; i++) {
        if (ci = cacheInfo[SITEINFO_IMPORT_URLS[i]]) {
          rm = launchReadMore(ci.info, entry);
          break;
        }
      }
    }

    if (rm) rms[entry.id] = rm;
  }, 10);
});

setTimeout(function () {
  SITEINFO_IMPORT_URLS.forEach(function(url) {
    if (!(cacheInfo[url] && cacheInfo[url].expire >= Date.now())) {
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
          "User-Agent": navigator.userAgent + " Greasemonkey (Hatena::RSS Read More Supporter)"
        },
        onload: function (res) { ReadMore.setCache(res, url); }
      });
    }
  });
}, 0);

(function () {
  var addKeybind = w.Navigation.addKeybind;
  if (!addKeybind) setTimeout(arguments.callee, 100);

  addKeybind(KEY, function () {
    var item = w.Entry[w.Entry.index];
    if (!item || item.isSpecial) return;

    var rm = rms[item];
    if (rm) {
      rm.toggleContent();
    } else {
      w.Entry.readMore(item);
    }
  });
  if (GET_ALL) {
    addKeybind(GET_ALL_KEY, function () {
      Array.forEach(w.Entry, function (item) {
        if (item.isSpecial) return;

        var rm = rms[item];
        if (rm) {
          rm.toggleContent();
        } else {
          w.Entry.readMore(item);
        }
      });
    });
  }
  addKeybind('m', function () {
    var item = w.Entry[w.Entry.index];
    if (!item || item.isSpecial) return;

    w.Entry.readMore(item);
    var rm = rms[item];
    if (rm) rm.Nbutton.innerHTML = READ_MORE_TEXT;
  });
})();

// == [Utility] =====================================================

function error(e) {
  if (typeof console == 'object') {
    console.error(e);
  } else {
    GM_log(e);
  }
}

// based on "Pagerization" by id:ofk (http://userscripts.org/scripts/show/7623)
function parseHTML(str) {
  var res = document.implementation.createDocument(null, 'html', null)
  var range = document.createRange();
  range.setStartAfter(document.body);
  res.documentElement.appendChild(
    res.importNode(range.createContextualFragment(
      str.replace(/^([\n\r]|.)*?<html.*?>|<\/html>([\n\r]|.)*$/ig, '')
    ), true)
  );
  return res;
}

function pathToURL(url, path) {
  if (/^https?:\/\//.test(path)) {
    return path;
  } else if (path.charAt(0) == "/") {
    return url.match(/^[a-z]+:\/\/[^\/]*/)[0] + path;
  } else {
    return url.match(/^.*\//)[0] + path;
  }
}

// based on "LDR Full Feed" by id:Constellation
// (http://userscripts.org/scripts/show/22702)
function relativeToAbsolutePath(htmldoc, base) {
  $X('//a[@href]', htmldoc).forEach(function (elm) {
    elm.href = pathToURL(base, elm.getAttribute("href"));
  });
  $X('(//img|//embed|//iframe)[@src]', htmldoc).forEach(function (elm) {
    elm.src  = pathToURL(base, elm.getAttribute("src"));
  });
  $X('//object[@data]', htmldoc).forEach(function (elm) {
    elm.data = pathToURL(base, elm.getAttribute("data"));
  });
}

function removeXSSRisk(htmldoc) {
  $X('//embed[@allowScriptAccess]', htmldoc).forEach(function (elm) {
    elm.setAttribute("allowScriptAccess", "never");
  });
  $X('//param[@name="allowScriptAccess"]', htmldoc).forEach(function (elm) {
    elm.setAttribute("value", "never");
  });
  $X('//@*[starts-with(local-name(), "on")]', htmldoc).forEach(function (attr) {
    attr.ownerElement.removeAttributeNode(attr);
  });
}

// $X by id:cho45 (http://lowreal.net/blog/2007/11/17/1)
// $X(exp);
// $X(exp, context);
// $X(exp, type);
// $X(exp, context, type);
function $X (exp, context, type /* want type */) {
    if (typeof context == "function") {
        type    = context;
        context = null;
    }
    if (!context) context = document;
    var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        var o = document.createNSResolver(context).lookupNamespaceURI(prefix);
        if (o) return o;
        return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
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

setTimeout(function () {
    //// UserScript Update Notification fu ////////////////////////
    // ** More Information **
    //   Author's blog(Japanese): We Ain't Seen Nothin' Yet.
    //     http://blog.fulltext-search.biz/

    function UpdateChecker() {};
    UpdateChecker.prototype = {
        script_name: 'Hatena::RSS Read More Supporter',
        version_url: 'http://userscripts.org/scripts/review/13744?format=txt',
        script_url: 'http://userscripts.org/scripts/source/13744.user.js',
        current_version: '1.2.1',
        more_info_url: 'http://d.hatena.ne.jp/Yuichirou/',

        remote_version: null,                        // no rewrite

        // Render update information in HTML
        render_update_info: function() {
            var newversion = document.createElement('div');
            newversion.setAttribute('id', 'gm_update_alert');
            var update_message = document.createElement('p');
            update_message.innerHTML = [
                '\u73FE\u5728\u304A\u4F7F\u3044\u306E',
                'Greasemonkey\u30B9\u30AF\u30EA\u30D7\u30C8 \u0027',
                this.script_name,
                '(var. ', this.current_version, ')',
                '\u0027 \u306F\u65B0\u3057\u3044\u30D0\u30FC\u30B8\u30E7\u30F3 ',
                this.remote_version,
                ' \u304C\u516C\u958B\u3055\u308C\u3066\u3044\u307E\u3059\uFF0E',
                '\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3057\u307E\u3059\u304B\uFF1F'
            ].join('');

            var update_link = document.createElement('a');
            update_link.setAttribute('id', 'gm_update_alert_link');
            update_link.setAttribute('href', this.script_url);
            update_link.addEventListener('click', function() {
                var update_alert = document.getElementById('gm_update_alert');
                update_alert.parentNode.removeChild(update_alert);
            }, false);
            update_link.innerHTML =
                '[o]\u4ECA\u3059\u3050\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3059\u308B';

            if(this.more_info_url) {
                var more_link = document.createElement('a');
                more_link.setAttribute('href', this.more_info_url);
                more_link.innerHTML = '\uFF08\u8A73\u7D30\u60C5\u5831\uFF09';
                update_message.appendChild(more_link);
            }

            var close_link = document.createElement('a');
            close_link.setAttribute('href', 'javascript:void(0);');
            close_link.addEventListener('click', function() {
                GM_setValue('last_check_day', new Date().days_since_start());
                var update_alert = document.getElementById('gm_update_alert');
                update_alert.parentNode.removeChild(update_alert);
            }, false);
            close_link.innerHTML = [
                '[x]\u4ECA\u306F\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3057\u306A\u3044',
                '\uFF08\u65E5\u4ED8\u304C\u5909\u308F\u308B\u307E\u3067\u6709\u52B9\uFF09'
            ].join('');

            newversion.appendChild(update_message);
            newversion.appendChild(update_link);
            newversion.appendChild(close_link);
            document.body.appendChild(newversion);
        },

        add_update_info_style: function() {
            GM_addStyle(<><![CDATA[
                /* style(like CSS) for update information */
                #gm_update_alert {
                    padding: 5px 0pt;
                    background-color: #FFF280;
                    color: #CC0099;
                    width: 100%;
                    position: absolute;
                    z-index: 99;
                    top: 0px;
                    left: 0px;
                    text-align: center;
                    font-size: 11px;
                    font-family: Tahoma;
                }

                #gm_update_alert p {
                    margin: 0pt;
                }

                #gm_update_alert a:link {
                    color: #333333;
                }

                #gm_update_alert > a:link {
                    margin: 0.5em 1em 0pt 1em;
                }

                #gm_update_alert p + a:link {
                    font-weight: bold;
                }
            ]]></>); ///
        },

        // Check script update remote
        check_update: function() {
            if(!this.has_need_for_check()) return;
            var user_script = this;
            GM_xmlhttpRequest({
                method: 'GET',
                url: this.version_url,
                onload: function(res) {
                    user_script.remote_version = user_script.check_version(res.responseText);
                    if(user_script.remote_version && user_script.remote_version > user_script.current_version) {
                        user_script.add_update_info_style();
                        user_script.render_update_info();
                    } else {
                        GM_setValue('last_check_day', new Date().days_since_start());
                    }
                },
                onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
            });
        },

        // Check the necessity for update: [Boolean]
        // return [true] if necessary
        has_need_for_check: function() {
            var last_check_day = GM_getValue('last_check_day');
            var current_day = new Date().days_since_start();
            if(typeof last_check_day == 'undefined' || current_day > last_check_day) {
                return true;
            } else {
                return false;
            }
        },

        // Check version in remote script file: [String]
        check_version: function(string) {
            if(/\/\/\s?@version\s+([\d.]+)/.test(string)) {
                return RegExp.$1;
            } else {
                return null;
            }
        }

    };

    Date.prototype.days_since_start = function() {
        var DAYS_IN_MONTH = [31,59,90,120,151,181,212,243,273,304,334,365];
        return(this.getYear() * 365 + DAYS_IN_MONTH[this.getMonth()] + this.getDate());
    };

    (new UpdateChecker()).check_update();
}, 0);

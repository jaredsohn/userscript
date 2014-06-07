// ==UserScript==
// @id             damasarenize
// @name           Damasarenize
// @version        0.1.3
// @namespace      http://iwamot.com/
// @author         @iwamot
// @description    虚構新聞へのリンクを分かりやすくします。
// @homepage       http://userscripts.org/users/iwamot
// @include        http://*
// @include        https://*
// @exclude        http://kyoko-np.net/*
// @exclude        http://www.kyoko-np.net/*
// @license        MIT License
// ==/UserScript==

(function() {
  var REPLACE_HREF = true;

  var ANCHOR_PREFIX = '虚構新聞 → ';
  var SHORTEN_DOMAINS = [
    't.co',
    'bit.ly',
    'fb.me',
    'goo.gl',
    'ow.ly',
    'j.mp',
    'htn.to',
    'tinyurl.com',
    'dlvr.it'
  ];
  var KYOKO_DOMAINS = ['kyoko-np.net', 'www.kyoko-np.net'];

  function domainOf(url) {
    var result = /https?:\/\/([^\/]+)/.exec(url);
    return (result) ? result[1] : null;
  }

  function isKyokoURL(url) {
    return (KYOKO_DOMAINS.indexOf(domainOf(url)) >= 0);
  }

  function isShortenedURL(url) {
    return (SHORTEN_DOMAINS.indexOf(domainOf(url)) >= 0);
  }

  function resolveURL(url, callback) {
    var CACHE_KEY_PREFIX = 'dmsr.';
    var CACHE_VALUE_UNRESOLVABLE = 'NG';
    var CACHE_PURGE_COUNT = 100;

    function toCacheKey(url) {
      return CACHE_KEY_PREFIX + url;
    }

    function setCache(url, value) {
      function purgeCache(num) {
        for (var i = 0; i < num; i++) {
          var key = sessionStorage.key(i);
          if (key && key.indexOf(CACHE_KEY_PREFIX) === 0) {
            sessionStorage.removeItem(key);
          }
        }
      }

      if (!sessionStorage) return;

      var key = toCacheKey(url);
      try {
        sessionStorage[key] = value;
      } catch (e) {
        if (e.code === DOMException.QUOTA_EXCEEDED_ERR) {
          purgeCache(CACHE_PURGE_COUNT);
          sessionStorage[key] = value;
        }
      }
    }

    function setFailedCache(url) {
      setCache(url, CACHE_VALUE_UNRESOLVABLE);
    }

    function getCache(url) {
      return (sessionStorage) ? sessionStorage[toCacheKey(url)] : null;
    }

    function resolveURLByHTTPRequest(url, callback) {
      function createScraper(regExp) {
        function decodeHTML(s) {
          return s.replace(/&nbsp;/ig, ' ').
                   replace(/&quot;/ig, '"').
                   replace(/&gt;/ig,   '>').
                   replace(/&lt;/ig,   '<').
                   replace(/&amp;/ig,  '&');
        }
  
        return function(httpResponse) {
          var result = regExp.exec(httpResponse.responseText);
          return (result) ? decodeHTML(result[1]) : null;
        }
      }

      function createOnloadHandler(url, callback, scraper) {
        function resolveSucceeded(url, resolvedURL) {
          return (resolvedURL && resolvedURL !== url);
        }

        return function(httpResponse) {
          var resolvedURL = scraper(httpResponse);
          if (resolveSucceeded(url, resolvedURL)) {
//          GM_log('解決成功（スクレイピング）： ' + url + ' → ' + resolvedURL);
            setCache(url, resolvedURL)
            resolveURL(resolvedURL, callback);
          } else {
//          GM_log('解決失敗（スクレイピング）： ' + url);
            setFailedCache(url);
            callback(url);
          }
        }
      }

      function createRequestOption(url, callback) {
        var opt = {
          onerror: function(httpResponse) {
//          GM_log('HTTPリクエストエラー： ' + url);
            setFailedCache(url);
            callback(url);
          }
        };
        if (window.chrome) {
          opt.method = 'get';
          opt.url = 'http://web-sniffer.net/?type=HEAD&gzip=yes&url=' + encodeURIComponent(url);
          opt.onload = createOnloadHandler(url, callback, createScraper(
            /<a title="examine location target" href="[^"]+">(https?:\/\/[^<]+)<\/a>/
          ));
        } else if (domainOf(url) === 't.co') {
          opt.method = 'get';
          opt.url = url;
          opt.onload = createOnloadHandler(url, callback, createScraper(
            /"0;URL=(https?:\/\/[^"]+)"/
          ));
        } else {
          opt.method = 'head';
          opt.url = url;
          opt.onload = createOnloadHandler(url, callback, function(httpResponse) {
            return httpResponse.finalUrl;
          });
        }
        return opt;
      }

      GM_xmlhttpRequest(createRequestOption(url, callback));
    }

    function resolveURLByCache(url, callback) {
      var cache = getCache(url);
      if (!cache) return false;

      if (cache === CACHE_VALUE_UNRESOLVABLE) {
//      GM_log('解決失敗（キャッシュ）： ' + url);
        callback(url);
      } else {
//      GM_log('解決成功（キャッシュ）： ' + url + ' → ' + cache);
        resolveURL(cache, callback);
      }
      return true;
    }

    if (!isShortenedURL(url)) {
//    GM_log('解決不要： ' + url);
      callback(url);
    } else {
      resolveURLByCache(url, callback) || resolveURLByHTTPRequest(url, callback);
    }
  }

  function main() {
    var ATTRIBUTE_NAME_STATE = 'damasarestate';
    var ATTRIBUTE_VALUE_PROCCESING = 'processing';
    var ATTRIBUTE_VALUE_DONE = 'done';

    function searchAnchors() {
      function createXPath() {
        return '//a[(' + KYOKO_DOMAINS.concat(SHORTEN_DOMAINS).map(function(domain) {
          return 'starts-with(@href, "http://' + domain + '/")';
        }).join(' or ') + ') and not(@' + ATTRIBUTE_NAME_STATE + ')]';
      }

      function getElementsByXPath(xpath) {
        var result = document.evaluate(xpath + ' | ' + xpath.replace(/\/\//g, '//xhtml:'), document.body, function(prefix) {
          if (prefix === 'xhtml') return 'http://www.w3.org/1999/xhtml';
        }, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var elements = [];
        for (var i = 0, len = result.snapshotLength; i < len; i++) {
          elements.push(result.snapshotItem(i));
        }
        return elements;
      }

      return getElementsByXPath(createXPath());
    }

    function damasarenize(anchor) {
      function setState(anchor, state) {
        return anchor.setAttribute(ATTRIBUTE_NAME_STATE, state);
      }

      function getState(anchor) {
        return anchor.getAttribute(ATTRIBUTE_NAME_STATE);
      }

      function toBeProcessed(anchor) {
        return (anchor.text.trim() !== '' && getState(anchor) === null);
      }

      function urlResolvedCallback(resolvedURL) {
        if (isKyokoURL(resolvedURL)) {
          anchor.innerHTML = ANCHOR_PREFIX + anchor.innerHTML;
        }
        if (anchor.href !== resolvedURL && REPLACE_HREF) {
          anchor.href = resolvedURL;
        }
        setState(anchor, ATTRIBUTE_VALUE_DONE);
      }

      if (!toBeProcessed(anchor)) return;
      setState(anchor, ATTRIBUTE_VALUE_PROCCESING);
      resolveURL(anchor.href, urlResolvedCallback);
    }

    searchAnchors().forEach(damasarenize);
  }

  // http://javascript.g.hatena.ne.jp/edvakf/20100204/1265312155
  function nodeInsertedHandler() {
    document.removeEventListener('DOMNodeInserted', nodeInsertedHandler, false);
    setTimeout(function() {
      main();
      document.addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
    }, 50);
  }

  main();
  document.addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
})();

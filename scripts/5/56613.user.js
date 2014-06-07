// ==UserScript==
// @name           GoogleBilingual
// @version        1.0.5
// @license        MIT license
// @namespace      http://d.hatena.ne.jp/snaka72/
// @require        https://raw.github.com/gist/3242/9dc0cdee5e975d275c7ab71f581d272eb316674f/dollarX.js
// @require        https://raw.github.com/gist/155402/f48c73c53d8858ded9ad1edaaa922b29bb0ecf2f/HTMLStringToDOM.js
// @include        http://www.google.com/*
// @include        http://www.google.co.jp/*
// ==/UserScript==
(function() {

  // Main //////////////////////////////////////////////////////////////{{{
  var other = new SearchEngine( getCurrentLang() == 'en' ? 'ja' : 'en');
  $X('id("res")/div[ol or div]', document).forEach(function(rightPart) {
    other.insertSearchResults(rightPart, window.location);
  });

  // register page handler
  function registerNextPageHandler() {
    var nextUrl
    window.AutoPagerize.addDocumentFilter(function(doc, url) {
      nextUrl = new URI(url);
    });
    window.AutoPagerize.addFilter(function(bodies) {
      bodies.forEach(function(body) {
        other.insertSearchResults(body, nextUrl);
      });
    });
  }

  // initialize style
  GM_addStyle(" #cnt { max-width : none !important }");
  GM_addStyle(" .s { max-width : none !important } ");

  // register next page handler
  if (window.AutoPagerize) {
    registerNextPageHandler()
  } else {
    window.addEventListener('GM_AutoPagerizeLoaded', registerNextPageHandler, false);
  }
  // }}}
  // Class /////////////////////////////////////////////////////////////{{{
  function SearchEngine(lang) {

    this.insertSearchResults = function(rightPart, uri) {
      alert(uri);
      //alert(uri);
      // resize search result
      rightPart.style.position = 'relative';
      $X('./ol', rightPart)[0].style.width = '48%';
      //alert(getURI(uri));

      // get counter part
      GM_xmlhttpRequest({
        method: 'GET',
        url: getURI(uri),
        onload: function(res) {
          var dom = HTMLStringToDOM(res.responseText);
          var leftPart = $X('id("res")/div[ol or div]', dom)[0];
          with(leftPart.style) {
            position = 'absolute';
            width = '48%';
            top = '-16px';
            right = '0';
          }

          rightPart.appendChild(leftPart);
          var height = Math.max(leftPart.clientHeight, rightPart.clientHeight);
          rightPart.style.height = height + 'px';
        }
      });
    };

    function getURI(uri) {
      var query = uri.search;
      query = fixLangParam(query, /([?&])hl=\w\w/, '$1hl=');
      query = fixLangParam(query, /([?&])lr=lang_\w\w/, '$1lr=lang_');
      return uri.protocol + '//' + uri.host + uri.pathname + query;
    }

    function fixLangParam(src, pattern, param) {
      if (pattern.test(src)) {
         return src.replace(pattern, param + lang);
      }
      return src + param.replace('$1', '&') + lang;
    }
  }
  // }}}
  // Misc functions ////////////////////////////////////////////////////{{{

  function getCurrentLang() {
    var queryString = window.location.search;
    if (match = queryString.match(/[?&]hl=(\w\w)/)) {
      return match[1];
    }
    if (match = queryString.match(/[?&]lr=lang_(\w\w)/)) {
      return match[1];
    }
    return 'en'
  }

  // URI constructor >>>
  // from (http://d.hatena.ne.jp/javascripter/20090309/1236590529)
  // by   javascripter
  function URI(uri) {
    uri = String(uri);
    var parser = /^([^:/?#]+:)?\/\/(([^/?#:]*):?(\d*))?([^?#]*)(\?[^#]*)?(#.*)?$/;
    var m = uri.match(parser);
    if (!m) throw new URIError("malformed URI given");
    this.href = m[0];
    this.protocol = m[1] || "";
    this.host = m[2] || "";
    this.hostname = m[3] || "";
    this.port = m[4] || "";
    this.pathname = m[5] || "";
    this.search = m[6] === "?" ? "" : m[6] || "";
    this.hash = m[7] || "";
  }

  URI.prototype.toString = function () {
    return this.href;
  };
  // <<< URI constructor

  function debug(msg, obj) {
    dump(msg + ': ' + obj + '\n');
  }

  // }}}
})();
// vim: sw=2 ts=2 et fdm=marker

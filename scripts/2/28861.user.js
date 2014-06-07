// ==UserScript==
// @name           unzipLinker
// @namespace      http://d.hatena.ne.jp/javascripter/
// @include        http://twitter.com/*
// ==/UserScript==
(function() {
  const REPLACE_CONTENT = true;
  const URL_LIST = [
  /^http:\/\/tinyurl\.com\//,
  /^http:\/\/(?:.*?\.)?zz\.tc\/.+/
  ];

  var requested = {};
  document.addEventListener('mouseover',
  function(e) {
    var elem = e.target;
    if (elem.hasAttribute('href')) {
      if (elem.href in requested) {
        setUrl(elem, requested[elem.href])
      } else {
        if (!URL_LIST.some(function(re) re.test(elem.href))) return;
        requested[elem.href] = null;
        GM_xmlhttpRequest({
          method: 'get',
          url: elem.href,
          onload: function({
            finalUrl: url
          }) {
            setUrl(elem, url);
            requested[elem.href] = url;
          },
          onerror: function() {
            delete requested[elem.href];
          }
        });
      }
    }
  },
  false);
  function setUrl(elem, url) {
    elem.href = url;

    if (REPLACE_CONTENT) {
      elem.textContent = url;
    } else {
      elem.title = url;
    }
  }

})();

